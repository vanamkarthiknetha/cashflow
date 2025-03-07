"use server";

import { AppwriteException, ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { cookies } from "next/headers";
import { encryptId, extractCustomerIdFromUrl, parseStringify } from "../utils";
import {
  CountryCode,
  ProcessorTokenCreateRequest,
  ProcessorTokenCreateRequestProcessorEnum,
  Products,
} from "plaid";
import { plaidClient } from "../plaid";
import { revalidatePath } from "next/cache";
import { addFundingSource, createDwollaCustomer } from "./dwolla.actions";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
} = process.env;

// auth actions

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(email, password);
    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    const user = await getUserInfo({userId:session.userId})
    const response ={
      success:true,
      user:parseStringify(user),
      message:"Loggedin successfully"
    }
    return response;
  } catch (error) {
    if (error instanceof AppwriteException) {
      console.error("Appwrite Login Error:", error.message);
      return { success: false, message: error.message };
    }
    console.error("Error:", error);
    return { success: false, message: "Internal server error." };
  }
};
export const signUp = async ({password,...userData}: SignUpParams) => {
  const { email, firstName, lastName } = userData;
  try {
    const { account, database,user  } = await createAdminClient();

    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      firstName + lastName!
    );
    if (!newUserAccount) throw new Error("Error creating newUserAccount !");
    const dwollaResponse = await createDwollaCustomer({
      ...userData,
      type: "personal",
    });
    if (!dwollaResponse.success){
      await user.delete(newUserAccount.$id); // Delete user from Appwrite
      return {
        success:false,
        message: dwollaResponse.error.body._embedded.errors[0].message
      }
    }
    const dwollaCustomerUrl =  dwollaResponse.dwollaCustomerUrl
    const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

    const newUser = await database.createDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      ID.unique(),
      {
        ...userData,
        userId: newUserAccount.$id,
        dwollaCustomerId,
        dwollaCustomerUrl,
      }
    );

    const session = await account.createEmailPasswordSession(email, password);
    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    const response = {
      success:true,
      user:parseStringify(newUser),
      message:"SignedUp successfully"
    }
    return response;
  } catch (error) {
    if (error instanceof AppwriteException) {
      console.error("AppwriteException :", error);
      return {
        success: false,
        message: error.message
      };
    }
    if (error.message == "Error creating dwolla customer !") {
      console.log("Object:",error._embedded)
      return {
        success: false,
        message: error
      };
    }
    console.error("Internal server error :", error);
    return {
      success:true,
      message:"Internal server error"
    }
  }
};
export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient();
    (await cookies()).delete("appwrite-session");
    return await account.deleteSession("current");
  } catch (error) {
    console.error("Error", error);
  }
};
export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const result =await account.get();
    const user = await getUserInfo({userId:result.$id})
    return parseStringify(user)
  } catch (error) {
    console.log(error);
  }
}

// plaid actions
export const createLinkToken = async (user: User) => {
  try {
    const tokenParams = {
      user: {
        client_user_id: user.$id,
      },
      client_name: `${user.firstName} ${user.lastName}`,
      products: ["auth",'transactions'] as Products[],
      language: "en",
      country_codes: ["US"] as CountryCode[],
    };
    const response = await plaidClient.linkTokenCreate(tokenParams);
    return parseStringify({ LinkToken: response.data.link_token });
  } catch (error) {
    console.log(error);
  }
};
export const exchangePublicToken = async ({
  publicToken,
  user,
}: exchangePublicTokenProps) => {
  try {
    // Exchanging public token for access token ,item id
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });
    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    // get account info from plaid using access token
    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });
    const accountData = accountsResponse.data.accounts[0];

    //create processor token for dwolla
    const request: ProcessorTokenCreateRequest = {
      access_token: accessToken,
      account_id: accountData.account_id,
      processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
    };
    const processorTokenResponse = await plaidClient.processorTokenCreate(
      request
    );
    const processorToken = processorTokenResponse.data.processor_token;

    // create a funding source url for account using dwolla customer id,processor token,bank name
    const fundingSourceUrl = await addFundingSource({
      dwollaCustomerId: user.dwollaCustomerId,
      processorToken,
      bankName: accountData.name,
    });
    // check if fundingSourceUrl exist
    if (!fundingSourceUrl) throw new Error("fundingSourceUrl not created !");
    // create bank account using user id, item id, account id,access token, fundingSourceUrl, sharable id
    await createBankAccount({
      userId: user.$id,
      bankId: itemId,
      accountId: accountData.account_id,
      accessToken,
      fundingSourceUrl,
      sharableId: encryptId(accountData.account_id),
    });
    // revalidate the path to reflect changed
    revalidatePath("/");

    return parseStringify({
      publicTokenExchange: "complete",
    });
  } catch (error) {
    console.log("$ During exchangePublicToken $ ", error);
  }
};


// updating in db
const createBankAccount = async ({
  userId,
  bankId,
  accountId,
  accessToken,
  fundingSourceUrl,
  sharableId,
}: createBankAccountProps) => {
  try {
    const { database } = await createAdminClient();
    const bankAccount = await database.createDocument(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      ID.unique(),
      {
        userId,
        bankId,
        accountId,
        accessToken,
        fundingSourceUrl,
        sharableId,
      }
    );
    return parseStringify(bankAccount);
  } catch (error) {
    console.log("$ During createBankAccount $", error);
  }
};

// retreiving from db
export const getUserInfo = async ({userId}:getUserInfoProps)=>{
  try {
    const { database } = await createAdminClient();
    const user = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal('userId',[userId])]
    );
    return parseStringify(user.documents[0]);
  } catch (error) {
    console.log('$ During getUserInfo $',error)
  }
}
export const getBanks = async ({userId}:getBanksProps) => {
  try {
    const { database } = await createAdminClient();
    const banks = await database.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      [Query.equal('userId',[userId])]
    );
    return parseStringify(banks.documents);
  } catch (error) {
    console.log("$ During getBanks $", error);
  }
};

export const getBank = async ({documentId}:getBankProps) => {
  try {
    const { database } = await createAdminClient();
    const bank = await database.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      [Query.equal('$id',[documentId])]
    );

    return parseStringify(bank.documents[0]);
  } catch (error) {
    console.log("$ During getBanks $", error);
  }
};

export const getBankByAccountId = async ({ accountId }: getBankByAccountIdProps) => {
  try {
    const { database } = await createAdminClient();

    const bank = await database.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      [Query.equal('accountId', [accountId])]
    )

    if(bank.total !== 1) return null;

    return parseStringify(bank.documents[0]);
  } catch (error) {
    console.log(error)
  }
}
// app/(dashboard)/transactions/TransactionHistoryWrapper.tsx
import TransactionHistory from "../TransactionHistory";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const TransactionHistoryWrapper = async ({
  searchParams,
}: SearchParamProps) => {
  const {id,page} =await searchParams
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  if (!loggedIn) redirect("/sign-in");
  const accounts = await getAccounts({ 
    userId: loggedIn.$id 
  })

  if(!accounts.success) {
    redirect('/connect-bank')
  };
  
  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId })

  const rowsPerPage = 10;
  const totalPages = Math.ceil(account?.transactions.length / rowsPerPage);
  
  const indexOfLastTransaction = currentPage * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;
  
  const currentTransactions = account?.transactions.slice(
    indexOfFirstTransaction, indexOfLastTransaction
  )
  return (
    <TransactionHistory
      account={account}
      currentTransactions={currentTransactions}
      totalPages={totalPages}
      currentPage={currentPage}
    />
  );
};

export default TransactionHistoryWrapper;

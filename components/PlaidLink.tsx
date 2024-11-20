import React, { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import { useRouter } from "next/navigation";
import { createLinkToken, exchangePublicToken } from "@/lib/actions/user.actions";
import { Loader2 } from "lucide-react";
import Image from "next/image";

const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [token, setToken] = useState("");
  useEffect(() => {
    const getLinkToken = async () => {
      const data = await createLinkToken(user);
      setToken(data?.LinkToken);
    };
    getLinkToken();
  }, [user]);

  const onSuccess: PlaidLinkOnSuccess = useCallback(async (public_token: string) => {
    setIsLoading(true)
    await exchangePublicToken({ publicToken: public_token, user });
    setIsLoading(false)
    router.push("/");
  }, [router, user]);
  const config: PlaidLinkOptions = { token, onSuccess };
  const { open, ready } = usePlaidLink(config);

  return (
    <>
      {variant === "primary" ? (
        <Button onClick={() => open()} disabled={!ready} className="plaidlink-primary">
          {isLoading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" /> &nbsp;
                        Loading...
                      </>
          ): 'Connect Bank'
          }
        </Button>
      ) : variant === "ghost" ? (
        <Button onClick={() => open()}  className="plaidlink-ghost">
          <Image 
            src="/icons/connect-bank.svg"
            alt="connect bank"
            width={24}
            height={24}
          />
        {isLoading ? (
                    <div className="flex flex-row  items-center">
                    <Loader2 size={20} className="animate-spin  text-black-2" /> &nbsp;
                    <p className="text-black-2 text-[16px] font-semibold">processing...</p>
                  </div>
        ): <p className="text-[16px] font-semibold text-black-2 xl:block">Connect Bank</p>
        }</Button>
      ) : (
        <Button onClick={() => open()}  className="plaidlink-default ">
          <Image 
            src="/icons/connect-bank.svg"
            alt="connect bank"
            width={24}
            height={24}
          />
        {isLoading ? (
                    <div className="flex flex-row  items-center">
                      <Loader2 size={20} className="animate-spin  text-black-2" /> &nbsp;
                      <p className="text-black-2 text-[16px] font-semibold">processing...</p>
                    </div>
        ): <p className="text-[16px] font-semibold text-black-2 ">Connect Bank</p>
        }</Button>
      )}
    </>
  );
};

export default PlaidLink;

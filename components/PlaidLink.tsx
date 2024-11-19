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
        <Button>Connect Bank</Button>
      ) : (
        <Button>Connect Bank</Button>
      )}
    </>
  );
};

export default PlaidLink;

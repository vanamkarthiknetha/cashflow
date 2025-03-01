"use client";
import React, { useEffect, useState } from "react";
import PlaidLink from "@/components/PlaidLink";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import Loading from "./Loading";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

const AddBank = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      const user = await getLoggedInUser();
      if (!user) redirect("/sign-in");
      
      setUser(user);
    };
    fetch();
  }, []);
  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="CashFlow logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            CashFlow
          </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            Link Account
            <p className="text-16 font-normal text-gray-600">
              Link your account to get started
            </p>
          </h1>
        </div>
      </header>
      {user ? (
      <div className="flex flex-col gap-4">
        <PlaidLink user={user} variant="primary" />
      </div>
      ): <Loading/>}
    </section>
  );
};

export default AddBank;

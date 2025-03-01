"use client"
import HeaderBox from '@/components/HeaderBox';
import PaymentTransferForm from '@/components/PaymentTransferForm';
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React, { Suspense, useEffect, useState } from 'react';
import Loading from '@/components/Loading'; 
import { redirect } from "next/navigation";

const PaymentTransferContent =  () => {
  const [accounts, setAccounts] = useState(null);

  useEffect(() => {
    const fetch = async ()=>{
      const loggedIn = await getLoggedInUser();
  if (!loggedIn) redirect("/sign-in");
      const accounts = await getAccounts({ userId: loggedIn.$id });
      if (!accounts?.success){
          redirect("/connect-bank"); // Redirect to the "Connect Bank" page if no accounts exist
      }else{
        setAccounts(accounts.data)
      }
    }
    fetch()
  }, [])

  if (!accounts) return <Loading type="payment-transfer" />;
  return (
    <section className="size-full pt-5">
      <Suspense fallback={<Loading type='payment-transfer'/>}>
        <PaymentTransferForm accounts={accounts} />
      </Suspense>
    </section>
  );
};

const PaymentTransfer = () => {
  return (
    <section className="payment-transfer">
      <HeaderBox
        title="Payment Transfer"
        subtext="Please provide any specific details or notes related to the payment transfer"
      />
        <PaymentTransferContent />
    </section>
  );
};

export default PaymentTransfer;

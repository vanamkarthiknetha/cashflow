import { Suspense } from "react";
import Loading from "@/components/Loading";
import TransactionHistoryWrapper from "@/components/wrappers/TransactionHistoryWrapper";

export default function Page({ searchParams }:SearchParamProps) {
  return (
    <Suspense fallback={<Loading type="transaction-history"/>}>
      <TransactionHistoryWrapper searchParams={searchParams} />
    </Suspense>
  );
}

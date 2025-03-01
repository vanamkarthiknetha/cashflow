import { Loader2 } from "lucide-react";
import BankCard from "./skeletons/BankCard";
import Home from "./skeletons/Home";
import TransactionHistory from "./skeletons/TransactionHistory";
import PaymentTransfer from "./skeletons/PaymentTransfer";
import TransactionsTable from "./skeletons/TransactionsTable";

export default function Loading({ type = "none" }) {
  return (
    <>
      {type === "none" && (
        <div className="flex p-4 items-center gap-2">
          <Loader2 size={20} className="animate-spin" /><span className="text-lg font-semibold">Loading...</span>
        </div>
      )}
      {type === "home" && <Home />}
      {type === "my-banks" && <BankCard />}
      {type === "transaction-history" && <TransactionHistory />}
      {type === "payment-transfer" && <PaymentTransfer />}
      {type === "transactions-table" && <TransactionsTable />}
    </>
  );
}

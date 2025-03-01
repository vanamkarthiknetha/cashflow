import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import TransactionsTable from './TransactionsTable';

const TransactionHistory = () => {
  return (
    <div className="transactions">
      {/* Header Skeleton */}
      <div className="transactions-header">
        <Skeleton className="w-full h-[80px] rounded-lg" />
      </div>

      <div className="">
        {/* Account Details Skeleton */}
        <div className=" py-4 rounded-lg min-h-[150px]">
          <Skeleton className="w-40 h-6 mb-2" />
          <Skeleton className="w-60 h-5 mb-2" />
          <Skeleton className="w-48 h-5 mb-2" />
        </div>

        {/* Transactions Table Skeleton */}
        <div className=" py-4 rounded-lg  min-h-[300px]">
          <TransactionsTable/>
        </div>

        {/* Pagination Skeleton */}
        <div className="my-4 w-full flex justify-center">
          <Skeleton className="w-40 h-10 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;

import React from 'react'
import { Skeleton } from '../ui/skeleton';

const TransactionsTable = () => {
  return (
    <div className="w-full  rounded-lg p-4">
    <Skeleton className="h-6 w-1/4 mb-4" />
    <table className="w-full">
      <thead>
        <tr>
          {["Date", "Description", "Amount", "Status"].map((header, idx) => (
            <th key={idx} className="p-3 text-left text-gray-500">
              <Skeleton className="h-4 w-1/2" />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 10 }).map((_, index) => (
          <tr key={index} className="">
            <td className="p-3"><Skeleton className="h-4 w-3/4" /></td>
            <td className="p-3"><Skeleton className="h-4 w-5/6" /></td>
            <td className="p-3"><Skeleton className="h-4 w-1/3" /></td>
            <td className="p-3"><Skeleton className="h-4 w-1/4" /></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
};


export default TransactionsTable

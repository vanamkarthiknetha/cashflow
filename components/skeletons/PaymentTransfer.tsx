import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const PaymentTransfer = () => {
  return (
    <section className="mt-10">
      {/* Header Skeleton */}
      <div className="mb-6">
        <Skeleton className="w-full h-[80px] rounded-lg" />
      </div>

      {/* Form Skeleton */}
      <div className=" py-6 rounded-lg">
        <Skeleton className="w-3/4 h-6 mb-4" />
        <Skeleton className="w-full h-10 mb-4" />
        <Skeleton className="w-3/4 h-6 mb-4" />
        <Skeleton className="w-full h-10 mb-4" />
        <Skeleton className="w-3/4 h-6 mb-4" />
        <Skeleton className="w-full h-10 mb-4" />
        
        {/* Submit Button Skeleton */}
        <Skeleton className="w-32 h-12 mx-auto rounded-lg" />
      </div>
    </section>
  );
};

export default PaymentTransfer;

import HeaderBox from '@/components/HeaderBox'
import React from 'react'
import { Suspense } from 'react';
import BanksList from '@/components/BanksList';
import Loading from '@/components/Loading';
const MyBanks = async () => {

  return (
    <section className='flex'>
      <div className="my-banks">
        <HeaderBox 
          title="My Bank Accounts"
          subtext="Effortlessly manage your banking activites."
        />

        <div className="space-y-4">
          <h2 className="header-2">
            Your cards
          </h2>
          <Suspense fallback={<Loading type='my-banks'/>}>
            <BanksList />
          </Suspense>
        </div>
      </div>
    </section>
  )
}

export default MyBanks
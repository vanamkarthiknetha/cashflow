import HeaderBox from '@/components/HeaderBox'
import RightSideBar from '@/components/RightSideBar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'

const page = async () => {
  const loggedIn=await getLoggedInUser();
  if(!loggedIn) redirect('/sign-in')
  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
            type="greeting"
            title="Welcome"
            subtext="Access and manage your account and transactions efficiently"
            user={loggedIn?.name || "Guest"}
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1230.70}
          />
        </header>
        {/* RECENT TXNS */}
      </div>
        <RightSideBar user={loggedIn} transactions={[]} banks ={[{},{}]}/>
    </section>
  )
}

export default page

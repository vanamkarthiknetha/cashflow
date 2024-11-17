import HeaderBox from '@/components/HeaderBox'
import RightSideBar from '@/components/RightSideBar'
import TotalBalanceBox from '@/components/TotalBalanceBox'

const page = () => {
  const loggedIn={firstName:"Karthik",lastName:"Vanam",email:"vankarnet@gmail.com"}
  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
            type="greeting"
            title="Welcome"
            subtext="Access and manage your account and transactions efficiently"
            user={loggedIn?.firstName || "Guest"}
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

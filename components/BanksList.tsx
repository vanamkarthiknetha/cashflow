import BankCard from '@/components/BankCard';
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';

const BanksList = async () => {
  const loggedIn = await getLoggedInUser();
    if (!loggedIn) redirect("/sign-in");

  const accounts = await getAccounts({ userId: loggedIn.$id });

  return (
    <div className="flex flex-wrap gap-6">
            {accounts && accounts.data.map((a: Account) => (
              <BankCard 
                key={a.id}
                account={a}
                userName={loggedIn?.firstName}
              />
            ))}
          </div>
  );
};

export default BanksList;

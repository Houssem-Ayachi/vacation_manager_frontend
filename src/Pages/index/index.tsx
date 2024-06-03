import Leave from './Components/leave request/Leave';
import Balance from './Components/Balance/Balance';
import Calendar from './Components/Calendar/Calendar';

function Index() {
  return (
    <div className='w-screen'>
      <div className='flex'>
        <Leave />
        <Balance />
      </div>
      <Calendar />
    </div>
  )
}

export default Index;

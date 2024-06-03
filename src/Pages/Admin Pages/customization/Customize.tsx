import LeaveStatusesList from './Components/Leave Statuses/LeaveStatusesList';
import ContactTypesList from './Components/Contact Types/ContactTypesList';
import LeaveTypesList from './Components/Leave Type/LeaveTypesList';

function Customize() {
  return (
    <div className='w-full grow'>
      <div className='w-full flex justify-center text-xl'>
        <h1>Customize</h1>
      </div>
      <div className='flex justify-between mt-5'>
        <LeaveStatusesList />
        <ContactTypesList />
        <LeaveTypesList />
      </div>
    </div>
  )
}

export default Customize;

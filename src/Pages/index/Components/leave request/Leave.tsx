import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector';

import LeaveRequest from '../../../../utils/Requests/Leave/Leave.Requests';
import { CreateLeaveRequestOBJ } from '../../../../utils/Requests/Leave/Leave.Requests.Objects';
import LeaveTypesRequests from '../../../../utils/Requests/Leave Types/Leave_Types.Requests';
import { createLeaveTypeOBJ } from '../../../../utils/Requests/Leave Types/Leave_Types.Requests.Objects';

import { EmployeeOBJ } from '../../../../utils/Requests/Employees/Employees.Requests.Objects';

import DateProcedures from '../../../../utils/Date/DateStuff';

const defaultLeaveRequestOBJ: CreateLeaveRequestOBJ = {
    start_date: new Date(),
    end_date: new Date(),
    employee_comment: "",
    leave_type_id: ""
}

const defaultLeaveTypesListOBJ: createLeaveTypeOBJ[] = [];

function Leave(){

  const leaveReq = new LeaveRequest();
  const leaveTypeReq = new LeaveTypesRequests();
  const currentSessionUserData: EmployeeOBJ  = useSelector(state => (state as any).CurrentSessionUserData);

  const [leaveRequestData, setLeaveRequestData] = useState(defaultLeaveRequestOBJ);
  const [leaveTypes, setLeaveTypes] = useState(defaultLeaveTypesListOBJ);
  const [remainingLeaveDaysIfApproved, setRemainingLeaveDaysIfApproved] = useState(0);
  const [isInLeave, setIsInLeave] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadLeaveTypes = async () => {
    const response = await leaveTypeReq.get();
    if(response.error){
      return setError(response.message);
    }
    setLeaveTypes(response);
  }

  const createLeaveRequest = async () => {
    if(leaveRequestData.employee_comment === ""){
      return setError("employee comment has to be filled");
    }else if(leaveRequestData.leave_type_id === ""){
      return setError("choose a leave type id");
    }
    const response = await leaveReq.createLeaveRequest(leaveRequestData);
    if(response.error){
      return setError(response.message);
    }
    alert("submitted, wait for approval");
  }

  const init = async () => {
    const response = await leaveReq.isInLeave(currentSessionUserData.id);
    setIsInLeave(response.isInLeave);
    await loadLeaveTypes();
    setLoading(false);
  }

  const calculateRequestedLeaveDays = () => {
    const days = DateProcedures.getNumberOfDays(leaveRequestData.start_date, leaveRequestData.end_date);
    if(days < 0) return;
    let timeDiff = currentSessionUserData.paid_leaves - days;
    if(timeDiff > 0){
      setRemainingLeaveDaysIfApproved(timeDiff);
    }else{
      setRemainingLeaveDaysIfApproved(0);
    }
  }
  
  useEffect(() => {
    init();
  }, [currentSessionUserData]);

  useEffect(() => {
    if(leaveRequestData.start_date !== defaultLeaveRequestOBJ.start_date && leaveRequestData.end_date !== defaultLeaveRequestOBJ.end_date){}
      calculateRequestedLeaveDays();
  }, [leaveRequestData.end_date, leaveRequestData.start_date]);

  const cssClasses = {
    inputDivs: "mb-5 w-full",
    input: "border-2 rounded p-2 w-full"
  }

  return (
    <div className='w-1/4'>
      <div className='text-lg border-2 p-4 mt-5 drop-shadow-lg rounded bg-white'>
        <h4 className='mb-2 font-bold'>Book Time Off:</h4>
        <p>{error}</p>
        {
          loading ? 
          <h3>Loading</h3>
          :
            isInLeave ?
              <h3>You cannot make a new leave request until you finish your current leave</h3>
            :
            <>
            <div className={`${cssClasses.inputDivs}`}>
              <input min={new Date().toISOString().split('T')[0]} placeholder='Start date:' onFocus={e => e.target.type="date"} onBlur={e => e.target.type="text"} className={`${cssClasses.input}`} type="text" onChange={e => setLeaveRequestData({...leaveRequestData, start_date:new Date(e.target.value)})}/>
            </div>
            <div className={`${cssClasses.inputDivs}`}>
              <input min={new Date().toISOString().split('T')[0]} placeholder='End Date:' onFocus={e => e.target.type="date"} onBlur={e => e.target.type="text"} className={`${cssClasses.input}`} type="text" onChange={e => setLeaveRequestData({...leaveRequestData, end_date:new Date(e.target.value)})}/>
            </div>
            <div className={`${cssClasses.inputDivs}`}>
              <textarea rows={1} placeholder='comment:' className={`${cssClasses.input}`} onChange={e => setLeaveRequestData({...leaveRequestData, employee_comment:e.target.value})}></textarea>
            </div>
            <div className={`${cssClasses.inputDivs}`}>
              <select className={`${cssClasses.input}`} name="" id="" onChange={e => setLeaveRequestData({...leaveRequestData, leave_type_id:e.target.value})}>
                <option value="" disabled selected>Leave Type:</option>
                {
                  leaveTypes.map((leaveType, i) => 
                    <option value={leaveType.type} key={i}>{leaveType.type}</option>
                  )
                }
              </select>
            </div>
            <div className='divide-solid divide-y mb-2'>
              <div className='flex justify-between mb-1'>
                <p className='font-bold text-sm'>Allowance:</p>
                <p className='font-bold text-sm'>If approved:</p>
              </div>
              <div className='flex justify-between'>
                <p className='text-sm'>{currentSessionUserData.paid_leaves} Days</p>
                <p className='text-sm'>{remainingLeaveDaysIfApproved} Days</p>
              </div>
            </div>
            <div className=''>
              <button className='border-2 rounded  bg-cyan-500 w-full text-white' onClick={createLeaveRequest}><i className="fa-regular fa-paper-plane mr-1"></i>Book time off</button>
            </div>
          </>
        }
      </div>
    </div>
  )

}
export default Leave;

import { useState, useEffect } from 'react'

import LeaveStatusesRequest from '../../../../../utils/Requests/Leave Statuses/Leave_Statuses.Requests';
import { CreateLeaveStatusType } from '../../../../../utils/Requests/Leave Statuses/Leave_Statuses.Requests.Object';

import CreateLeaveStatuses from './CreateLeaveStatuses';
import LeaveStatus from './LeaveStatus';

const defaultLeaveStatusesListOBJ: CreateLeaveStatusType[] = [];

function LeaveStatusesList() {

  const leaveStatusesReq = new LeaveStatusesRequest();

  const [loading, setLoading] = useState(true);
  const [leaveStatuses, setLeaveStatuses] = useState(defaultLeaveStatusesListOBJ);
  const [error, setError] = useState("");

  const getLeaveStatuses = async () => {
    const response = await leaveStatusesReq.getStatuses();
    setLoading(false);
    if(response.error){
      return setError(response.message);
    }
    setLeaveStatuses(response);
  }

  const addNewLeaveStatusToList = (leaveStatus: CreateLeaveStatusType) => {
    setLeaveStatuses([...leaveStatuses, leaveStatus]);
  }

  const deleteLeaveStatus = async (label: string) => {
    const response = await leaveStatusesReq.deleteStatus(label);
    setLeaveStatuses(leaveStatuses.filter(leaveStatus => leaveStatus.label !== response.label));
  }

  useEffect(() => {
    getLeaveStatuses();
  }, []);

  return (
    <div className='w-1/3 ml-7'>
      <div className='text-lg border-2 p-4 mt-5 drop-shadow-lg rounded bg-white'>
        <p>{error}</p>
        {loading ? 
          <p> loading Contact Types</p>
          :
          <>
            <CreateLeaveStatuses addNewLeaveStatusToList={addNewLeaveStatusToList} />
            <div className='mt-2'>
              <h4>Available Leaves:</h4>
              <ul className='ml-7'>
                {leaveStatuses.map(status => 
                  <li key={status.label} className='list-disc mb-2'>
                    <LeaveStatus label={status.label} />
                    <button className='ml-2 border-2 inline rounded px-1 bg-red-500 text-white' onClick={() => deleteLeaveStatus(status.label)}><i className="fa-regular fa-square-minus"></i></button>
                  </li>
                )}
              </ul>
            </div>
          </>
      }
      </div>
      </div>
  )
}

export default LeaveStatusesList;

import {useState, useEffect} from 'react'

import LeaveTypesRequests from '../../../../../utils/Requests/Leave Types/Leave_Types.Requests';
import { createLeaveTypeOBJ } from '../../../../../utils/Requests/Leave Types/Leave_Types.Requests.Objects';
import CreateLeaveTypes from './CreateLeaveTypes';
import LeaveType from './LeaveType';

const defaultLeaveTypesListObj: createLeaveTypeOBJ[] = [];

function LeaveTypesList() {

  const leaveTypesReq = new LeaveTypesRequests();

  const [loading, setLoading] = useState(true);
  const [leaveTypes, setLeaveTypes] = useState(defaultLeaveTypesListObj);
  const [error, setError] = useState("");

  const getLeaveTypes = async () => {
    const response = await leaveTypesReq.get();
    setLoading(false);
    if(response.error){
      setError(response.message);
    }
    setLeaveTypes(response);
  }

  const addNewLeaveTypeToList = (leaveType: createLeaveTypeOBJ) => {
    setLeaveTypes([...leaveTypes, leaveType]);
  }

  const deleteLeaveType = async (type: string) => {
    const response = await leaveTypesReq.delete(type);
    setLeaveTypes(leaveTypes.filter(leaveType => leaveType.type !== response.type));
  }

  useEffect(() => {
    getLeaveTypes();
  }, []);

  return (
    <div className='w-1/3 ml-7'>
      <div className='text-lg border-2 p-4 mt-5 drop-shadow-lg rounded bg-white'>
        <p>{error}</p>
        {loading ? 
          <p> loading Contact Types</p>
          :
          <>
            <CreateLeaveTypes addNewLeaveTypeToList={addNewLeaveTypeToList}/>
            <div className='mt-2'>
              <h4>Available Leave Types:</h4>
              <ul className='ml-7'>
                {leaveTypes.map(leaveType => 
                  <li key={leaveType.type} className='list-disc'>
                    <LeaveType  type={leaveType.type} />
                    <button className='ml-2 border-2 inline rounded px-1 bg-red-500 text-white' onClick={() => deleteLeaveType(leaveType.type)}><i className="fa-regular fa-square-minus"></i></button>
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

export default LeaveTypesList;

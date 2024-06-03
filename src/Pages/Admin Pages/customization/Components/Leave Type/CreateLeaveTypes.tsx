import { useState } from 'react'

import LeaveTypesRequests from '../../../../../utils/Requests/Leave Types/Leave_Types.Requests'
import { createLeaveTypeOBJ } from '../../../../../utils/Requests/Leave Types/Leave_Types.Requests.Objects'

const defaultCreateLeaveTypeOBJ: createLeaveTypeOBJ = {
    type: ""
}

type Props = {
  addNewLeaveTypeToList: (leaveType: createLeaveTypeOBJ) => void
}

function CreateLeaveTypes({addNewLeaveTypeToList}: Props) {

    const leaveTypesReq = new LeaveTypesRequests();

    const [leaveType, setLeaveType] = useState(defaultCreateLeaveTypeOBJ);
    const [error, setError] = useState("");

    const createLeaveType = async () => {
        if(leaveType.type === ""){
            return setError("Type field has to be filled");
        }
        const response = await leaveTypesReq.create(leaveType);
        if(response.error){
            return setError(response.message);
        }
        addNewLeaveTypeToList(response);
        alert("created");
    }

  return (
    <div>
      <h3 className='mb-2 font-bold'>Create new Leave Type:</h3>
      <div>
        <input className='border-2 rounded p-1 mr-1 mt-1 w-full' type="text" placeholder='type' value={leaveType.type} onChange={e => setLeaveType({type: e.target.value})}/>
        <button className='border-2 rounded  bg-cyan-500 w-full text-white' onClick={createLeaveType}><i className="fa-regular fa-square-plus mr-1"></i>add</button>
      </div>
      <p className='bg-red-600 text-slate-100'>{error}</p>
    </div>
  )
}

export default CreateLeaveTypes;

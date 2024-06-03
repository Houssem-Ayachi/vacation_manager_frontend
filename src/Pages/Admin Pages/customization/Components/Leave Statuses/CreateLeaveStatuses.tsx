import {useState} from 'react';

import  LeaveStatusesRequest  from '../../../../../utils/Requests/Leave Statuses/Leave_Statuses.Requests';
import { CreateLeaveStatusType } from '../../../../../utils/Requests/Leave Statuses/Leave_Statuses.Requests.Object';

const defaultCreateLeaveStatusOBJ: CreateLeaveStatusType = {
    label: ""
}

type Props = {
    addNewLeaveStatusToList: (leaveStatus: CreateLeaveStatusType) => void
}

function CreateLeaveStatuses({addNewLeaveStatusToList}: Props) {
    const leaveStatusReq = new LeaveStatusesRequest();

    const [leaveStatus, setLeaveStatus] = useState(defaultCreateLeaveStatusOBJ);
    const [error, setError] = useState("");

    const createLeaveStatus = async () => {
        if(leaveStatus.label === ""){
            return setError("Label field has to be filled");
        }
        const response = await leaveStatusReq.createStatus(leaveStatus);
        if(response.error){
            setError(response.message);
        }
        addNewLeaveStatusToList(response);
        alert("created");
        setLeaveStatus({label: ""});
    }

  return (
    <div>
        <h3 className='mb-2 font-bold'>Create Leave Status:</h3>
        <div>
            <input className='border-2 rounded p-1 mr-1 mt-1 w-full' type="text" placeholder='label' onChange={e => setLeaveStatus({label: e.target.value})}/>
            <button className='border-2 rounded  bg-cyan-500 w-full text-white' onClick={createLeaveStatus}><i className="fa-regular fa-square-plus mr-1"></i>add</button>
        </div>
        <p className='bg-red-600 text-slate-100'>{error}</p>
    </div>
  )
}

export default CreateLeaveStatuses;

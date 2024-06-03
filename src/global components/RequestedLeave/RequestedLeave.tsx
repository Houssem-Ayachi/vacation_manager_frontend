import { useState } from "react";

import { LeaveRequestData } from '../../utils/Requests/Leave/Leave.Requests.Objects';

import DateProcedures from '../../utils/Date/DateStuff';
import { CreateLeaveStatusType } from '../../utils/Requests/Leave Statuses/Leave_Statuses.Requests.Object';

type Props = {
    leaveReqData: LeaveRequestData,
    leaveStatuses?: CreateLeaveStatusType[],
    setLeaveRequestsReplyOBJ?: React.Dispatch<React.SetStateAction<{
        admin_comment: string;
    }>>,
    replyToLeaveRequestFromModal?: (requestID: number, requestEmployeeID: number, leaveStatusID: string) => Promise<void>,
    isInRequestedLeavesPage?: boolean
}

function RequestedLeave({leaveReqData, leaveStatuses, setLeaveRequestsReplyOBJ, replyToLeaveRequestFromModal, isInRequestedLeavesPage=true}: Props) {

    const [leaveStatus, setLeaveStatus] = useState("pending")

    console.log(leaveReqData);

    const startDate = new Date(leaveReqData.start_date);
    const endDate = new Date(leaveReqData.end_date);

    if(isInRequestedLeavesPage){
        return (
            <div>
                <p>Employee: {leaveReqData.employee.name} {leaveReqData.employee.last_name}</p>
                <p>From: {startDate.toDateString()}</p>
                <p>To: {endDate.toDateString()}</p>
                <p>Days: {DateProcedures.getNumberOfDays(startDate, endDate)}</p>
                <p>Leave Type: {leaveReqData.leave_type_id}</p>
                <p>Comment: {leaveReqData.employee_comment}</p>
                <div>
                    <div className='flex'>
                        <p>admin comment: </p>
                        <textarea onChange={(e) => setLeaveRequestsReplyOBJ!({admin_comment: e.target.value})} className='border-2' name="" id=""></textarea>
                    </div>
                    <div className="flex">
                        <p>Leave Status: </p>
                        <select onChange={e => setLeaveStatus(e.target.value)} name="" id="">
                            <option value=""></option>
                            {leaveStatuses!.map((leaveStatus, i) => <option value={leaveStatus.label} key={i}>{leaveStatus.label}</option>)}
                        </select>
                    </div>
                    <button className='border-2 rounded  bg-cyan-500 w-full text-white' onClick={() => replyToLeaveRequestFromModal!(leaveReqData.id, leaveReqData.employee_id, leaveStatus)}>Send Reply</button>
                </div>
            </div>
        )
    }else{
        return (
            <div>
                <p>Employee: {leaveReqData.employee.name} {leaveReqData.employee.last_name}</p>
                <p>From: {startDate.toDateString()}</p>
                <p>To: {endDate.toDateString()}</p>
                <p>Days: {DateProcedures.getNumberOfDays(startDate, endDate)}</p>
                <p>Leave Type: {leaveReqData.leave_type_id}</p>
                <p>Comment: {leaveReqData.employee_comment}</p>
                <div>
                    <div className='flex'>
                        <p>admin comment: </p>
                        <p>{leaveReqData.admin_comment}</p>
                    </div>
                    <div className="flex">
                        <p>Leave Status: </p>
                        <p>{leaveReqData.leave_status_id}</p>
                    </div>
                </div>
            </div>
        )
    }

}

export default RequestedLeave;

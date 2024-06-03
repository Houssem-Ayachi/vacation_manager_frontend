import {useState, useEffect} from 'react';
import {Link} from "react-router-dom";

import LeaveRequest from '../../../utils/Requests/Leave/Leave.Requests';
import { LeaveRequestData, defaultLeaveRequestDataOBJ } from '../../../utils/Requests/Leave/Leave.Requests.Objects';
import LeaveStatusesRequest from '../../../utils/Requests/Leave Statuses/Leave_Statuses.Requests';
import { CreateLeaveStatusType } from '../../../utils/Requests/Leave Statuses/Leave_Statuses.Requests.Object';

import RequestedLeave from '../../../global components/RequestedLeave/RequestedLeave';

const defaultLeaveRequestsListOBJ: LeaveRequestData[] = [];
const defaultLeaveReqDataForModal: LeaveRequestData = defaultLeaveRequestDataOBJ;
const defaultLeaveRequestReplyOBJ = {
    admin_comment: "",
}
const defaultLeaveStatusList: CreateLeaveStatusType[] = [];

function RequestedLeaves() {

    const leaveReq = new LeaveRequest();
    const leaveStatusReq = new LeaveStatusesRequest();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [leaveRequestsList, setLeaveRequestsList] = useState(defaultLeaveRequestsListOBJ);
    const [leaveRequestReplyOBJ, setLeaveRequestsReplyOBJ] = useState(defaultLeaveRequestReplyOBJ);
    const [leaveStatuses, setLeaveStatuses] = useState(defaultLeaveStatusList);
    
    const [showModal, setShowModal] = useState(false);
    const [leaveReqDataForModal, setLeaveReqDataForModal] = useState(defaultLeaveReqDataForModal);

    const loadPendingRequests = async () => {
        let response = await leaveReq.getPendingRequests();
        if(response.error){
            return setError(response.message);
        }
        setLeaveRequestsList(response);
        response = await leaveStatusReq.getStatuses();
        setLeaveStatuses(response);
        setLoading(false);
    }

    const replyToLeaveRequest = async (requestID: number, requestEmployeeID: number, leaveStatusID: string) => {
        setError("");
        if(leaveStatusID === "pending"){
            return setError("choose a leave status other than pending pls");
        }
        const replyOBJ = {
            id: requestID,
            employee_id: requestEmployeeID,
            ...leaveRequestReplyOBJ,
            leave_status_id: leaveStatusID
        };
        const response: LeaveRequestData = await leaveReq.replyToEmployeeLeaveRequest(replyOBJ);
        setLeaveRequestsList(leaveRequestsList.filter(req => req.id !== response.id));
    }

    const replyToLeaveRequestFromModal = async (requestID: number, requestEmployeeID: number, leaveStatusID: string) => {
        await replyToLeaveRequest(requestID, requestEmployeeID, leaveStatusID);
        toggleModal();
    }

    useEffect(() => {
        loadPendingRequests();
    }, []);

    const openModal = (leaveReq: LeaveRequestData) => {
        setLeaveReqDataForModal(leaveReq);
        toggleModal()
    }

    const toggleModal = () => {
        setShowModal(!showModal);
    }

    return (
        <div className='w-full'>
            <div className='w-full mt-10 text-lg'>
                <p>{error}</p>
                {
                    loading ?
                        <h3>Loading</h3>
                    :
                    <div>
                        <div className=''>
                            <h3>Requested leaves</h3>
                        </div>
                        <div className='divide-solid divide-y mb-2 bg-white mt-10 p-2'>
                            <div className='grid grid-cols-5'>
                                <p className=''>Employee:</p>
                                <p className=''>From:</p>
                                <p className=''>To</p>
                                <p>Details</p>
                                <p>Reply</p>
                            </div>
                            {
                                leaveRequestsList.map((leaveReq, i) => 
                                    <div className='grid grid-cols-5' key={i}>
                                        <p className='text-cyan-500'><Link to={`/profile/${leaveReq.employee.id}`}>{leaveReq.employee.name} {leaveReq.employee.last_name}</Link></p>
                                        <p>{new Date(leaveReq.start_date).toDateString()}</p>
                                        <p>{new Date(leaveReq.end_date).toDateString()}</p>
                                        <div>
                                            <button onClick={() => openModal(leaveReq)}>More details</button>
                                        </div>
                                        <div className='flex'>
                                            <button onClick={() => replyToLeaveRequest(leaveReq.id, leaveReq.employee.id, "accepted")} className='mr-2'><i className="fa-regular fa-thumbs-up" style={{color: "#2ffe20"}}></i></button>
                                            <button onClick={() => replyToLeaveRequest(leaveReq.id, leaveReq.employee.id, "rejected")}><i className="fa-regular fa-thumbs-down" style={{color: "#ff0000"}}></i></button>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                }
            </div>
            {
                showModal &&
                <div className='w-screen h-screen fixed top-0 left-0 right-0 bottom-0'>
                    {/* MODAL */}
                    <div onClick={toggleModal} className='w-screen h-screen fixed bg-slate-800 top-0 left-0 right-0 bottom-0 opacity-50'></div> {/* overlay */}
                    <div className='w-full flex justify-center items-stretch'>
                        <div className='absolute bg-white border-2 p-4 w-1/4 mt-12'>
                            <RequestedLeave replyToLeaveRequestFromModal={replyToLeaveRequestFromModal} setLeaveRequestsReplyOBJ={setLeaveRequestsReplyOBJ} leaveStatuses={leaveStatuses} leaveReqData={leaveReqDataForModal} />
                            <button onClick={toggleModal}>close</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default RequestedLeaves;

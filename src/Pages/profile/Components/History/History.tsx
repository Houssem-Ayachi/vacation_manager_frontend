import {useState, useEffect} from 'react';

import RequestedLeave from '../../../../global components/RequestedLeave/RequestedLeave';

import LeaveRequest from '../../../../utils/Requests/Leave/Leave.Requests';
import { LeaveRequestData, defaultLeaveRequestDataOBJ } from '../../../../utils/Requests/Leave/Leave.Requests.Objects';

import DateProcedures from '../../../../utils/Date/DateStuff';

type Props = {
    emplopyeeID: number
}

const defaultLeavesListOBJ: LeaveRequestData[] = [];
const defaultLeaveReqDataForModal: LeaveRequestData = defaultLeaveRequestDataOBJ;

function History({emplopyeeID}: Props) {
    const leaveReq = new LeaveRequest();

    const [leaves, setLeaves] = useState(defaultLeavesListOBJ);
    const [leaveReqDataForModal, setLeaveReqDataForModal] = useState(defaultLeaveReqDataForModal);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showModal, setShowModal] = useState(false)

    const toggleModal = () => {
        setShowModal(!showModal);
    }

    const openModal = (leaveReqData: LeaveRequestData) => {
        setLeaveReqDataForModal(leaveReqData);
        toggleModal();
    }

    const init = async () => {
        const response = await leaveReq.getEmployeeLeaveHistory(emplopyeeID);
        if(response.error){
            return setError(response.message);
        }
        setLeaves(response.history);
        setLoading(false);
    }

    useEffect(() => {
        init();
    }, [emplopyeeID]);

    return (
        <div className='mt-10 left-0'>
            <h3>{error}</h3>
            {loading ? 
            <h4>Loading</h4>
            :
                <div>
                    <h3 className='mb-2 text-lg'>Leave History:</h3>
                    <div className='bg-white divide-y p-1'>
                        <div className='grid grid-cols-5 ml-14 font-bold'>
                            <p>Start</p>
                            <p>End</p>
                            <p>Number of days</p>
                            <p>type</p>
                            <p>details</p>
                        </div>
                        {leaves.map((leave, i) => 
                        <div key={i} className='grid grid-cols-5 my-3 ml-14'>
                            <p>{leave.start_date.toString().split("T")[0]}</p>
                            <p>{leave.end_date.toString().split("T")[0]}</p>
                            <p>{DateProcedures.getNumberOfDays(new Date(leave.start_date), new Date(leave.end_date))}</p>
                            <p>{leave.leave_type_id}</p>
                            <p><button onClick={() => openModal(leave)}>Expand</button></p>
                        </div>)}
                    </div>
                </div>
            }
            {
                showModal &&
                <div className='w-screen h-screen fixed top-0 left-0 right-0 bottom-0'>
                    {/* MODAL */}
                    <div onClick={toggleModal} className='w-screen h-screen fixed bg-slate-800 top-0 left-0 right-0 bottom-0 opacity-50'></div> {/* overlay */}
                    <div className='w-full flex justify-center items-stretch'>
                        <div className='absolute bg-white border-2 p-4 w-1/4 mt-12'>
                            <RequestedLeave leaveReqData={leaveReqDataForModal} isInRequestedLeavesPage={false}/>
                            <button onClick={toggleModal}>close</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default History;

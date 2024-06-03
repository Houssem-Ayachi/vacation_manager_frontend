import {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';

import LeaveRequest from '../../../../utils/Requests/Leave/Leave.Requests';
import { EmployeeOBJ } from '../../../../utils/Requests/Employees/Employees.Requests.Objects';

function Balance() {

    const leaveReq = new LeaveRequest();

    const currentSessionUserData: EmployeeOBJ  = useSelector(state => (state as any).CurrentSessionUserData);

    const [balanceList, setBalanceList] = useState(new Map<string, number>());

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadBalance = async () => {
        let response = await leaveReq.getBalance(currentSessionUserData.id);
        if(response.error){
            return setError(response.message);
        }
        setBalanceList(response);
        setLoading(false);
    }

    const createBalanceList = () => {
        let list = [];
        for(let i of Object.keys(balanceList)){
            list.push({type: i, number: (balanceList as any)[i]});
        }
        return list;
    }

    useEffect(() => {
        loadBalance();
    }, [currentSessionUserData]);

    return (
        <div className='w-1/4 ml-7'>
            <div className='text-lg border-2 p-4 mt-5 drop-shadow-lg rounded bg-white'>
                <h4 className='mb-2 font-bold'>History:</h4>
                <p>{error}</p>
                {
                    loading ? 
                    <h3>Loading</h3>
                    :
                    <div className='divide-solid divide-y'>
                        <div className='flex justify-between mb-1'>
                            <p className='font-bold text-sm'>Leave type:</p>
                            <p className='font-bold text-sm'>Number of times taken:</p>
                        </div>
                        {
                            createBalanceList().map((balance, i) => 
                            <div className='flex justify-between' key={i}>
                                <p>{balance.type}</p>
                                <p>{balance.number}</p>
                            </div>
                            )
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default Balance;

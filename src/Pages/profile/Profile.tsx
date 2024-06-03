import {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

import EmployeesRequests from '../../utils/Requests/Employees/Employees.Requests';
import { EmployeeOBJ, UpdateEmployeeOBJ } from '../../utils/Requests/Employees/Employees.Requests.Objects';

import Contact from './Components/Contacts.tsx/Contact';
import History from './Components/History/History';

const defaultEmployeeOBJ: EmployeeOBJ = {
    admin_level: -1,
    birth_date: new Date(),
    cnss: 0,
    created_at: new Date(),
    email: "",
    exit_date: new Date(),
    id: -1,
    is_verified: false,
    joined_date: new Date(),
    last_name: "",
    name: "",
    paid_leaves: 0,
    password: "",
    phone_number: "",
    updated_at: new Date(),
}

function Profile(){
    const empReq = new EmployeesRequests();

    const {employeeID} = useParams();
    const [employeeData, setEmployeeData] = useState(defaultEmployeeOBJ);
    const [isProfileOwner, setIsProfileOwner] = useState(false);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const currentEmployee: EmployeeOBJ = useSelector(state => (state as any).CurrentSessionUserData);

    const getEmployeeById = async (id: number) => {
        const employee = await empReq.getEmployeeByID(id);
        if(!employee){
            return setError("No Employee found");
        }
        setEmployeeData(employee);
        setLoading(false);
    }

    const getCurrentSessionEmployeeData = async () => {
        if(currentEmployee.id === -1){
            const employee: EmployeeOBJ = await empReq.getCurrentSessionEmployeeData();
            if(!employee){
                return setError("No Employee found");
            }
            setEmployeeData(employee);
        }else{
            setEmployeeData(currentEmployee);
        }
        setLoading(false);
    }


    const updateEmployeeData = async () => {
        const updateOBJ: UpdateEmployeeOBJ = {
            id: employeeData.id,
            name: employeeData.name,
            last_name: employeeData.last_name,
            email: employeeData.email,
            phone_number: employeeData.phone_number
        }
        const response = await empReq.updateEmployee(updateOBJ);
        console.log(response);
    }

    useEffect(() => {
        if(currentEmployee.id === parseInt(employeeID!)){
            setIsProfileOwner(true);
        }
        if(employeeID === "self"){
            getCurrentSessionEmployeeData();
            setIsProfileOwner(true);
        }else if(isNaN(parseInt(employeeID!))){// url parameter employeeID is not a number
            setError("invalid Page");
        }else{//fetch employee with given id
            getEmployeeById(parseInt(employeeID!));
            if(employeeData.id === parseInt(employeeID!)){
                setIsProfileOwner(true);
            }
        }
    }, [currentEmployee]);

    const cssClasses = {
        data: "mb-5 ml-5",
        input: "w-full p-1"
    }

  return (
    <div className='w-screen'>
        <div className='text-xl mt-5'>
            {loading ? 
            <h1>Loading</h1>
            :
            <div className='flex justify-between'>
                <div className='w-2'>
                    <div className='flex flex-col text-2xl font-bold'>
                        <h3 className={`${cssClasses.data} + ml-4`}>{employeeData.name}</h3>
                        <h3 className={`${cssClasses.data} + ml-4`}>{employeeData.last_name}</h3>
                    </div>
                </div>
                <div className='w-1/3 text-lg border-2 p-4 mt-5 drop-shadow-lg rounded bg-white'>
                    <h1 className='font-bold text-2xl mb-5'>Account Settings:</h1>
                    <div>
                        <div className='mb-1'>
                            <div>email:</div>
                            {currentEmployee.id === employeeData.id ? 
                                <input onChange={e => setEmployeeData({...employeeData, email: e.target.value})} className={cssClasses.input} type="text" placeholder={employeeData.email}/>
                                :
                                <p>{employeeData.email}</p>
                            }                        
                        </div>
                        <div className='mb-1'>
                            <div>phone number:</div>
                            {currentEmployee.id === employeeData.id ?
                                <input onChange={e => setEmployeeData({...employeeData, phone_number: e.target.value})} className={cssClasses.input} type="text" placeholder={employeeData.phone_number}/>
                                :
                                <p>{employeeData.phone_number}</p>
                            }
                        </div>
                        {
                            currentEmployee.id === employeeData.id ?
                            <button onClick={updateEmployeeData} className='border-2 rounded  bg-cyan-500 w-full text-white my-1'><i className="fa-solid fa-pen mr-1"></i>Update</button>
                            :
                            ""
                        }
                    </div>
                    <div className='flex mr-3'>
                        <span className='w-1/3'>birth date:</span>
                        <p className={`${cssClasses.data} text-right w-2/3`}>{employeeData.birth_date.toString()}</p>
                    </div>
                    <div className='flex mr-3'> 
                        <span className='w-1/3'>joined at:</span>
                        <p className={`${cssClasses.data} text-right w-2/3`}>{employeeData.joined_date.toString()}</p>
                    </div>
                    <div className='flex mr-3'>
                        <span className='w-1/3'>paid leaves:</span>
                        <p className={`${cssClasses.data} text-right w-2/3`}>{employeeData.paid_leaves}</p>
                    </div>
                </div>
                <div className='mb-5 w-1/3'>
                    <Contact employeeID={employeeData.id} isProfileOwner={isProfileOwner} />
                </div>
                <p>{error}</p>
            </div>
            }
        </div>
        <History emplopyeeID={employeeData.id} />
    </div>
  )
}

export default Profile;

import { useState } from 'react';
import { useNavigate } from "react-router-dom"

import { CreateEmployeeOBJ } from '../../utils/Requests/Employees/Employees.Requests.Objects';
import AuthRequests from '../../utils/Requests/Auth/Auth.Requests';

const defaultEmployeeObj: CreateEmployeeOBJ = {
    name: "",
    last_name: "",
    email: "",
    password: "",
    phone_number: "",
    cnss: 0,
    birth_date: new Date(),
    joined_date: new Date(),
    exit_date: new Date()
}

type Props = {
    headMessage: string
}

export default function SignUp({headMessage}: Props) {

    const navigate = useNavigate();

    const authReq = new AuthRequests();

    const [employeeOBJ, setemployeeOBJ] = useState(defaultEmployeeObj);
    const [error, setError] = useState("");

    const createEmployee =async () => {
        //quick form check if there is any field still not filled
        let k: keyof typeof employeeOBJ;
        for(k in employeeOBJ){
            if(employeeOBJ[k] === defaultEmployeeObj[k]){
                setError(`field: ${k.replace("_", " ")} has to be filled`);
                return;
            }
        }
        //NOTE: not sure if i need to validate anything else (maybe check email validity with a regex hehe)
        const response = await authReq.createSuperAdmin(employeeOBJ);
        console.log(response);
        if(response.error){
            setError(response.message);
            return;
        }
        navigate("/login");
    }

    const cssClasses = {
        inputDiv: "mb-7",
        input: "p-2 border-2 rounded"
    }

    return (
        <div className='w-full'>
            <div className='w-full flex justify-center'>
                <div>
                    <h3 className='text-2xl'>
                        {headMessage}
                    </h3>
                    <p className='text-lg mt-3 mb-3'>Please fill the form below ⬇️</p>
                </div>
            </div>
            <div className='w-full flex justify-center drop-shadow-lg'>
                <div className='h-screen'>
                    <div className='border-2 p-6'>
                        <div className={cssClasses.inputDiv}>
                            <input className={cssClasses.input} type="text" placeholder='name' value={employeeOBJ.name} onChange={e => setemployeeOBJ({...employeeOBJ, name: e.target.value})}/>
                        </div>
                        <div className={cssClasses.inputDiv}>                
                            <input className={cssClasses.input} type="text" placeholder='last name' value={employeeOBJ.last_name} onChange={e => setemployeeOBJ({...employeeOBJ, last_name: e.target.value})}/>
                        </div>
                        <div className={cssClasses.inputDiv}>
                            <input className={cssClasses.input} type="email" placeholder='email' value={employeeOBJ.email} onChange={e => setemployeeOBJ({...employeeOBJ, email: e.target.value})}/>           
                        </div>
                        <div className={cssClasses.inputDiv}>
                            <input className={cssClasses.input} type="password" placeholder='password' value={employeeOBJ.password} onChange={e => setemployeeOBJ({...employeeOBJ, password: e.target.value})}/>
                        </div>
                        <div className={cssClasses.inputDiv}>
                            <input className={cssClasses.input} type="number" placeholder='phone number' value={employeeOBJ.phone_number} onChange={e => setemployeeOBJ({...employeeOBJ, phone_number: e.target.value.toString()})}/>                    
                        </div>
                        <div className={cssClasses.inputDiv}>
                            <input className={cssClasses.input} type="number" placeholder='cnss' value={employeeOBJ.cnss} onChange={e => setemployeeOBJ({...employeeOBJ, cnss: parseInt(e.target.value)})}/>
                        </div>
                        <div className={cssClasses.inputDiv + " flex items-center"}>  
                            <input placeholder='Birth date:' onFocus={e => e.target.type="date"} onBlur={e => e.target.type="text"} className={cssClasses.input} type="text" onChange={e => setemployeeOBJ({...employeeOBJ, birth_date: new Date(e.target.value)})}/>
                        </div>
                        <div className={cssClasses.inputDiv + " flex items-center"}>
                            <input placeholder='Joined date:' onFocus={e => e.target.type="date"} onBlur={e => e.target.type="text"} className={cssClasses.input} type="text" onChange={e => setemployeeOBJ({...employeeOBJ, joined_date: new Date(e.target.value)})}/>
                        </div>
                        <div className={cssClasses.inputDiv + " flex items-center"}>
                            <input placeholder='Exit date:' onFocus={e => e.target.type="date"} onBlur={e => e.target.type="text"} className={cssClasses.input} type="text" onChange={e => setemployeeOBJ({...employeeOBJ, exit_date: new Date(e.target.value)})}/>
                        </div>
                        <div className={cssClasses.inputDiv + "w-full flex justify-center"}>
                            <button className='border-2 rounded p-2 bg-slate-400' onClick={createEmployee}>Create</button>
                        </div>
                        <div className='flex justify-center'>
                            {error === "" ? "" : <p className='bg-red-600 text-slate-100 rounded-lg p-1'>{error}</p>}                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

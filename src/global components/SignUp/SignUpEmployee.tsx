import { useState } from 'react';

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

function SignUpEmployee() {

    const authReq = new AuthRequests();

    const [employeeOBJ, setemployeeOBJ] = useState(defaultEmployeeObj);
    const [error, setError] = useState("");

    const randomPassword = () => {
        const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const passwordLength = 12;
        let password = "";
        for (var i = 0; i <= passwordLength; i++) {
            let randomNumber = Math.floor(Math.random() * chars.length);
            password += chars.substring(randomNumber, randomNumber + 1);
        }
        return password;
    }

    const createEmployee =async () => {
        //quick form check if there is any field still not filled
        let k: keyof typeof employeeOBJ;
        for(k in employeeOBJ){
            if(employeeOBJ[k] === defaultEmployeeObj[k] && k !== "password"){
                setError(`field: ${k.replace("_", " ")} has to be filled`);
                return;
            }
        }
        employeeOBJ.password = randomPassword();
        //NOTE: not sure if i need to validate anything else (maybe check email validity with a regex hehe)
        const response = await authReq.createEmployeeAccount(employeeOBJ);
        console.log(response);
        if(response.error){
            setError(response.message);
            return;
        }
    }

    const cssClasses = {
        inputDiv: "mb-7 w-full",
        input: "p-1 border-2 rounded w-full"
    }

    return (
        <div className='w-full'>
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
                <input className={cssClasses.input} type="number" placeholder='phone number' value={employeeOBJ.phone_number} onChange={e => setemployeeOBJ({...employeeOBJ, phone_number: e.target.value.toString()})}/>                    
            </div>
            <div className={cssClasses.inputDiv}>
                <input className={cssClasses.input} type="number" placeholder='cnss' value={employeeOBJ.cnss} onChange={e => setemployeeOBJ({...employeeOBJ, cnss: parseInt(e.target.value)})}/>
            </div>
            <div className={cssClasses.inputDiv + " flex items-center"}>
                <input onFocus={e=>e.target.type="date"} onBlur={e=>e.target.type="text"} placeholder='Birth date:' className={cssClasses.input} type="text" onChange={e => setemployeeOBJ({...employeeOBJ, birth_date: new Date(e.target.value)})}/>
            </div>
            <div className={cssClasses.inputDiv + " flex items-center"}>
                <input onFocus={e=>e.target.type="date"} onBlur={e=>e.target.type="text"} placeholder='Joined date:' className={cssClasses.input} type="text" onChange={e => setemployeeOBJ({...employeeOBJ, joined_date: new Date(e.target.value)})}/>
            </div>
            <div className={cssClasses.inputDiv + " flex items-center"}>
                <input onFocus={e=>e.target.type="date"} onBlur={e=>e.target.type="text"} placeholder='Exit date:' className={cssClasses.input} type="text" onChange={e => setemployeeOBJ({...employeeOBJ, exit_date: new Date(e.target.value)})}/>
            </div>
            <div className={cssClasses.inputDiv + "w-full flex justify-center"}>
                <button className='border-2 rounded p-2 bg-slate-400' onClick={createEmployee}>Create</button>
            </div>
            <div className='flex justify-center'>
                {error === "" ? "" : <p className='bg-red-600 text-slate-100 rounded-lg p-1'>{error}</p>}                            
            </div>
        </div>
    )
}

export default SignUpEmployee;

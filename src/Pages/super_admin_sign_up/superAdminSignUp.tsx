import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"

import EmployeesRequests from '../../utils/Requests/Employees/Employees.Requests';
import SignUp from '../../global components/SignUp/SignUp';


export default function SuperAdminSignUpPage() {
    const navigate = useNavigate();
    const empReq = new EmployeesRequests();

    const headMessage = "As this is the first time the app has been openend, A super admin account needs to be created."

    //to check if a user accessed this page while the app is already initialized e.g a super admin has already been added
    const appAlreadyInitialized = async () => {
        const count = await empReq.getEmployeesCount();
        if(count != 0){
            navigate("/");
        }
    }

    useEffect(() => {
        appAlreadyInitialized();
    }, []);

    return (
        <SignUp headMessage={headMessage}/>
    )

}

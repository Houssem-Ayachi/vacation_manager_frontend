import {useState} from 'react';
import {useNavigate} from "react-router-dom";
import { useDispatch } from 'react-redux';

import { setAdminLevel, setToken } from "../../utils/Storage/ReduxStore/SessionSlice";

import AuthRequests from '../../utils/Requests/Auth/Auth.Requests';
import EmployeesRequests from '../../utils/Requests/Employees/Employees.Requests';
import { LoginOBJ } from '../../utils/Requests/Auth/Auth.Requests.Objects';

const defaultLoginObj: LoginOBJ = {
  email: "",
  password: ""
}

function Login() {
  const authReq = new AuthRequests();
  const empReq = new EmployeesRequests();

  const navigate = useNavigate();
  const [loginObj, setLoginObj] = useState(defaultLoginObj);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const login = async () => {
    //checking if any form field is empty
    let k: keyof typeof loginObj;
    for(k in loginObj){
        if(loginObj[k] === defaultLoginObj[k]){
          setError(`field: ${k} has to be filled`);
          return;
        }
    }
    const response = await authReq.signin(loginObj);
    if(response.error){
      setError(response.message);
      return;
    }
    dispatch(setToken(response.accessToken));
    const empData = await empReq.getCurrentSessionEmployeeData();
    dispatch(setAdminLevel(empData.admin_level));
    navigate("/");
  }

  const cssClasses = {
    inputDiv: "mb-5 mt-4",
    input: "border-2 rounded p-1 mr-1 mt-1"
  }

  return (
    <div className='w-full h-screen'>
      <div className='flex justify-center'>
        <div>
          <h1 className='text-center w-full text-2xl mb-2'>Login</h1>
          <p className='text-lg mt-6'>Please fill the form below ⬇️</p>
        </div>
      </div>
      <div className='flex justify-center mt-20'>
        <div className='text-lg border-2 p-3 drop-shadow-lg'>
          <div className={`${cssClasses.inputDiv}`}>
            <input className={`${cssClasses.input}`} type="email" placeholder='email' value={loginObj.email} onChange={e => setLoginObj({...loginObj, email: e.target.value})}/>
          </div>
          <div className={`${cssClasses.inputDiv}`}>
            <input className={`${cssClasses.input}`} type="password" placeholder='password' value={loginObj. password} onChange={e => setLoginObj({...loginObj, password: e.target.value})}/>
          </div>
          <div className="flex justify-center">
            <button className='border-2 rounded p-1 bg-slate-400' onClick={login}>Submit</button>
          </div>
          <div>
            <p>{error}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

import "./index.css";

import { useEffect } from "react";
import { GuardConfigProvider, GuardedRoute, GuardedRoutes, GuardMiddlewareFunction} from "react-router-guarded-routes";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";

//utils
import EmployeesRequests from "./utils/Requests/Employees/Employees.Requests";
import { EmployeeOBJ } from "./utils/Requests/Employees/Employees.Requests.Objects";
import TokenHandler from "./utils/Storage/TokenHandler";
import { setData } from "./utils/Storage/ReduxStore/SessionSlice";
import { setEmployeeOBJ } from "./utils/Storage/ReduxStore/CurrentSessionUserSlice";

//pages
import SuperAdminSignUpPage from "./Pages/super_admin_sign_up/superAdminSignUp";
import Index from "./Pages/index";
import Login from "./Pages/login/Login";
import Customize from "./Pages/Admin Pages/customization/Customize";
import Profile from "./Pages/profile/Profile";

//components
import Navbar from "./global components/Navbar/Navbar";
import Employees from "./Pages/Employees/Employees";
import RequestedLeaves from "./Pages/Admin Pages/requested leaves/RequestedLeaves";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let empReq: EmployeesRequests = new EmployeesRequests();
  const tokenHandler = new TokenHandler();
  const token = tokenHandler.getToken();//fetch token from local storage
  const sessionData = useSelector(state => (state as any).sessionData);

  const init = async () => {
    if(!(await isAppInit())){
      navigate("/super_admin_sign_up");//app is opened for the first time -> create super admin account
    }
    if(token !== null){
      let response:EmployeeOBJ = await empReq.getCurrentSessionEmployeeData();//fetch current logged in user's data
      if(!response){
        return;
      }
      dispatch(setData({token, adminLevel: response.admin_level}));
      dispatch(setEmployeeOBJ(response));
    }
  }
 
  const isLoggedInGuard: GuardMiddlewareFunction = (to, from , next) => {
    if(token === null || token === ""){//means user is not logged in (absence of jwt)
      return navigate("/login");
    }
    next();
  }

  const isNotLoggedInGuard: GuardMiddlewareFunction = (to, from , next) => {
    if(token !== null){
      return navigate("/");
    }
    next();
  }

  const isAdminGuard: GuardMiddlewareFunction = async (to, from , next) => {
    const response = await empReq.getCurrentSessionEmployeeData();
    if(response.admin_level > 0){
      next();
      return;
    }
    navigate("/");
  }

  const isAppInit = async () => {
    //check if the app is opened for the first time
    const count = await empReq.getEmployeesCount();
    return count > 0;
  }

  useEffect(() => {
    init();
  }, [sessionData]);

  return (
    <div className="flex h-full h-screen ml-0 bg-slate-100">
    <Navbar />
    <GuardConfigProvider>
        <GuardedRoutes>
          <GuardedRoute guards={[isNotLoggedInGuard]} path="/login" element={<Login />}/>
          <GuardedRoute guards={[isLoggedInGuard]} path="/" element={<Index />}/>
          <GuardedRoute guards={[isLoggedInGuard, isAdminGuard]} path="/requested_leaves" element={<RequestedLeaves />}/>
          <GuardedRoute guards={[isLoggedInGuard]} path="/employees" element={<Employees />}/>
          <GuardedRoute path="/super_admin_sign_up" element={<SuperAdminSignUpPage />}/>
          <GuardedRoute guards={[isLoggedInGuard, isAdminGuard]} path="/customization" element={<Customize />} />          
          <GuardedRoute guards={[isLoggedInGuard]} path="/Profile/:employeeID" element={<Profile />}/>
        </GuardedRoutes>
      </GuardConfigProvider>
    </div>
  );
}

export default App;

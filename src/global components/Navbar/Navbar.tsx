import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { session_state_type, setData } from '../../utils/Storage/ReduxStore/SessionSlice';
import { deleteEmployeeOBJ } from '../../utils/Storage/ReduxStore/CurrentSessionUserSlice';
import TokenHandler from '../../utils/Storage/TokenHandler';

export default function Navbar() {
  const tokenHandler = new TokenHandler();

  const sessionData: session_state_type = useSelector(state => (state as any).sessionData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(setData({token: "", adminLevel: -1}));
    dispatch(deleteEmployeeOBJ());
    tokenHandler.deleteToken();
    navigate("/login");
  }

  useEffect(() => {}, [sessionData]);

  const cssClasses = {
    li: "p-2 hover:bg-slate-400 bg-white text-black p-1"
  }

  return (
    <div className=' px-1 flex-none h-full bg-slate-100 text-slate-300 border-2'>
      <h2 className='text-2xl mt-2 mb-2 text-black'><Link to="/">Leave Management</Link></h2>
      <ul className='h-full grid'>
        <div className='divide-solid divide-y'>
          {sessionData.token === "" || sessionData.token === null ?
            <>{/* not signed in links */}
              <li className={cssClasses.li}>
                <Link to="/login">Login</Link>
              </li>
            </>  
          :
            <>{/* signed in links */}
              <li className={cssClasses.li}><Link to="/profile/self"><i className="fa-solid fa-user mr-1"></i><span>Profile</span></Link></li>
            </>
          }
          {/* links to pages for admin or super admin */}
          {
            sessionData.adminLevel >= 1 ?
            <>
              <li className={cssClasses.li}><Link to="/customization"><i className="fa-solid fa-gears mr-1"></i><span>Customize</span></Link></li>
              <li className={cssClasses.li}><Link to="/employees"><i className="fa-solid fa-user-group mr-1"></i><span>Employees</span></Link></li>
              {sessionData.adminLevel === 2 && <>
                <li className={cssClasses.li}>Reports</li>
                <li className={cssClasses.li}><Link to="/requested_leaves"><i className="fa-solid fa-newspaper mr-1"></i><span>Requested Leaves</span></Link></li>
              </>}
            </>
            :
            ""
          }
        </div>
        <div className='flex items-end mb-12'>
          <button onClick={logout} className={cssClasses.li + " rounded text-slate-900 w-full text-left"}><i className="fa-solid fa-right-from-bracket mr-2"></i>Logout</button>
        </div>
      </ul>
    </div>
  )
}

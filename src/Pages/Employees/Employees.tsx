import {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';

import EmployeesRequests from '../../utils/Requests/Employees/Employees.Requests';
import { PublicEmployeeOBJ } from '../../utils/Requests/Employees/Employees.Requests.Objects';
import { Link } from 'react-router-dom';
import SignUpEmployee from '../../global components/SignUp/SignUpEmployee';

const defaultEmployeesListOBJ: PublicEmployeeOBJ[] = [];

function Employees() {

    const empReq = new EmployeesRequests();
    const adminLevel = useSelector(state => (state as any).sessionData.adminLevel);

    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [employees, setEmployees] = useState(defaultEmployeesListOBJ);

    const toggleModal = () => {
        setShowModal(!showModal);
    }

    const loadEmployees = async () => {
        const response = await empReq.getAllEmployees();
        if(response.error){
            return setError(response.message);
        }
        setEmployees(response);
        setLoading(false);
    }

    const makeAdmin = async (id: number) => {
        const response: PublicEmployeeOBJ = await empReq.makeEmployeeAdmin(id);
        setEmployees([...employees.filter(employee => employee.id !== id), response]);
    }

    const makeSimpleEmployee = async (id: number) => {
        const response: PublicEmployeeOBJ = await empReq.updateToSimpleEmployee(id);
        setEmployees([...employees.filter(employee => employee.id !== id), response]);
    }

    useEffect(() => {
        loadEmployees();
    }, [adminLevel]);

    return (
    <div className='w-full'>
        <div className='w-full mt-10 text-lg'>
            <p>{error}</p>
            {loading ? 
                <h3>Loading</h3>
                :
                <div>
                    <div className='flex justify-end'>
                        <button onClick={toggleModal} className='mr-2 border-2 rounded  bg-cyan-500 px-1 text-white'><i className="fa-solid fa-user-plus mr-2"></i>Add Employee</button>
                    </div>
                    <div>
                        <div className='w-full'>
                            <input className='w-1/3 border-2 rounded p-1 mr-1 mt-1' type="text" placeholder='search employee'/>
                        </div>
                        <div className='divide-solid divide-y mb-2 bg-white mt-10 p-2'>
                            <div className='grid grid-cols-4'>
                                <p className=''>Employee:</p>
                                <p className=''>joined at:</p>
                                <p className=''>Paid Leaves:</p>
                                <p className=''>priveleges</p>
                            </div>
                            {
                                employees.map((employee, i) => 
                                <div className='grid grid-cols-4 mt-1 mr-2' key={i}>
                                    <p className='text-cyan-500'><Link to={`/Profile/${employee.id}`}>{employee.name} {employee.last_name}</Link></p>
                                    <p className=''>{employee.joined_date.toLocaleString().split("T")[0]}</p>
                                    <p className=''>{employee.paid_leaves}</p>
                                    {
                                        adminLevel === 2 ? 
                                        employee.admin_level === 0 ?
                                        <div>
                                            <button  className='border-2 rounded mt-1  bg-cyan-500 px-1 text-white' onClick={() => makeAdmin(employee.id)}><i className="fa-solid fa-arrow-up mr-2"></i>promote</button>
                                        </div>
                                        :
                                        employee.admin_level === 1 ?
                                        <div>
                                            <button className='border-2 rounded  mt-1 bg-cyan-500 px-1 text-white' onClick={() => makeSimpleEmployee(employee.id)}><i className="fa-solid fa-arrow-down mr-2"></i>demote</button>
                                        </div>
                                        : <p>super admin</p>
                                        :
                                        <p>no action possible</p>
                                    }
                                </div>
                                )
                            }
                        </div>
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
                        <SignUpEmployee />
                        <button onClick={toggleModal}>close</button>
                    </div>
                </div>
            </div>
        }
    </div>
    )
}

export default Employees;

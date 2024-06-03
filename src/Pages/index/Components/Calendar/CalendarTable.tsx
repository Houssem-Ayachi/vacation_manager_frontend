import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { CalendarSearchParams } from './CalendarTypes';

import LeaveRequest from '../../../../utils/Requests/Leave/Leave.Requests';
import { LeaveRequestData } from '../../../../utils/Requests/Leave/Leave.Requests.Objects';

type Props = {
  searchDate: CalendarSearchParams
}

type Day = {
  dayName: string, 
  dayNumber: number
}

const defaultLeavesListOBJ: LeaveRequestData[] = [];

function CalendarTable({searchDate}: Props) {

  const leaveReq = new LeaveRequest();

  const [leaves, setLeaves] = useState(defaultLeavesListOBJ);
  const [loading, setLoading] = useState(true);
  const [numberOfDaysInMonth, setNumberOfDaysInMonth] = useState(0);
  const date = new Date(searchDate.year, searchDate.month, searchDate.day);

  const init = async () => {
    const response = await leaveReq.getMonthLeaves(date.toISOString());
    setLeaves(response);
    setNumberOfDaysInMonth((new Date(date.getFullYear(), date.getMonth(), 0)).getDate()); //the long new date thingy here gives u the number of days in a month
    setLoading(false);
  }

  const getDayName = (date: Date) => {
    return date.toLocaleDateString("en-EN", {weekday: "short"});
  }

  const isWeekend = (date: Date) => {
    let dayName = getDayName(date);
      return dayName === "Sat" || dayName === "Sun";
  }

  const getDaysList = () => {
    let newDate = date;
    const daysList: Day[] = []
    for(let i = 1; i <= numberOfDaysInMonth; i++){
      if(isWeekend(newDate)) {
        newDate = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() + 1);
        continue;
      }
      daysList.push({dayName: getDayName(newDate), dayNumber: i});
      newDate = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() + 1);
    }
    return daysList;
  }

  const isLeaveDayForEmployee = (leave: LeaveRequestData, day: Day) => {
    const dateToCheck = new Date(searchDate.year, searchDate.month, day.dayNumber);
    if(isWeekend(dateToCheck)){
      return false;
    }
    const check = dateToCheck.getTime();
    const startDate = new Date(leave.start_date);
    const endDate = new Date(leave.end_date);
    const from = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()).getTime();
    const to = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()).getTime();
    const res = check >= from && check <= to;
    return res;
  }

  useEffect(() => {
    init();
  }, [searchDate]);

  return (
    <div className=''>
      {loading ? <h4>Loading</h4>
      :  
      <div className='bg-white border-2 w-full'>
        <div className="flex justify-center">
          <div className='w-32'></div>
          {getDaysList().map((day, i) =>
            <div key={i} className='w-11'>
              <p className='mr-2'>{day.dayName}</p>
              <p>{day.dayNumber}</p>
            </div>
          )}
        </div>
          {leaves.map((leave, i) => 
            <div className='flex justify-center' key={i}>
              <div className='w-32'><Link to={`/profile/${leave.employee_id}`} className='text-cyan-500'>{leave.employee.name} {leave.employee.last_name}</Link></div>
              {getDaysList().map((day, i) =>
                <div key={i} className={`w-11 border-2 ${isLeaveDayForEmployee(leave, day) ? "bg-cyan-400" : "bg-slate-300"}`}></div>
              )}
            </div>
          )}
      </div>
      }
    </div>
  )
}

export default CalendarTable;

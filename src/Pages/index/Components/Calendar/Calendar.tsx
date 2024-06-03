import {useState, useEffect} from 'react';

import { CalendarSearchParams } from './CalendarTypes';
import CalendarTable from './CalendarTable';

const defaultCalendarSearchParams: CalendarSearchParams = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: 1
}

function Calendar() {

    const [calendarSearchParams, setCalendarSearchParams] = useState(defaultCalendarSearchParams);

    const getCurrentDateToSearch = () => {
        const date = new Date(calendarSearchParams.year, calendarSearchParams.month, calendarSearchParams.day + 1);
        return date.toISOString().split("T")[0];
    }

    const updateCalendarSearchParams = (date: string) => {
        const inputedDate = new Date(date);
        setCalendarSearchParams({
            year: inputedDate.getFullYear(),
            month: inputedDate.getMonth(),
            day: defaultCalendarSearchParams.day
        });
    }

    const incrementCalenderMonth = () => {
        setCalendarSearchParams(prevDate => {
            return {
                ...prevDate,
                month: prevDate.month+1
        }});
    }

    const decrementCalenderMonth = () => {
        setCalendarSearchParams(prevDate => {
            return {
                ...prevDate,
                month: prevDate.month-1
        }});
    }

    useEffect(() => {}, [calendarSearchParams]);

    return (
        <div className='mt-10'>
            <div className='mb-2 w-full flex justify-center'>
                <button onClick={decrementCalenderMonth} className='mx-2 text-xl'><i className="fa-solid fa-arrow-left"></i></button>
                <input className='w-1/3 text-center text-lg' type="date" value={getCurrentDateToSearch().toString()} onChange={e => updateCalendarSearchParams(e.target.value)}/>
                <button onClick={incrementCalenderMonth} className='mx-2 text-xl'><i className="fa-solid fa-arrow-right"></i></button>
            </div>
            <div>
                <CalendarTable searchDate={calendarSearchParams} />
            </div>
        </div>
    )
}

export default Calendar

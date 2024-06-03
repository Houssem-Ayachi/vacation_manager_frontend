export default class DateProcedures {

    public static getNumberOfDays(start_date: Date, end_date: Date){
        const startDate = new Date(start_date.getFullYear(), start_date.getMonth(), start_date.getDate());
        const endDate = new Date(end_date.getFullYear(), end_date.getMonth(), end_date.getDate());
        let days = endDate.getTime() - startDate.getTime();
        days = (days / (1000 * 3600 * 24)) + 1;
        return days;
    }

}
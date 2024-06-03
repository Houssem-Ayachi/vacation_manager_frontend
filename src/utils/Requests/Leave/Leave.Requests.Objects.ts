export type LeaveRequestData = {
    admin_comment: string,
    admin_id: string
    created_at: Date
    employee: {
        id: number, 
        name: string, 
        last_name: string
    }
    employee_comment: string
    employee_id: number
    end_date: Date
    id: number
    leave_status_id: string
    leave_type_id: string
    response_date: Date
    start_date: Date
    updated_at: Date
}

export const defaultLeaveRequestDataOBJ = {
    admin_comment: "",
    admin_id: "",
    created_at: new Date(),
    employee: {
        id: -1,
        name: "",
        last_name: "",
    },
    employee_comment: "",
    employee_id: -1,
    end_date: new Date(),
    id: -1,
    leave_status_id: "",
    leave_type_id: "",
    response_date: new Date(),
    start_date: new Date(),
    updated_at: new Date(),
}

export type CreateLeaveRequestOBJ = {
    start_date: Date
    end_date: Date
    employee_comment: string
    leave_type_id: string
}

export type UpdateLeaveRequestOBJ = {
    id: number
    start_date: string
    end_date: string
    employee_comment: string
    leave_type_id: string
    employee_id: number
}

export type LeaveRequestReplyOBJ = {
    id: number
    employee_id: number
    admin_comment: string
    leave_status_id: string
}
export type CreateEmployeeOBJ = {
    name: string;
    last_name: string;
    email: string;
    password: string;
    phone_number: string;
    cnss: number
    birth_date: Date
    joined_date: Date
    exit_date: Date
}

export type EmployeeOBJ = {
    admin_level:number,
    birth_date: Date,
    cnss: number,
    created_at: Date,
    email: string,
    exit_date: Date,
    id: number,
    is_verified: boolean,
    joined_date: Date,
    last_name: string,
    name: string,
    paid_leaves: number,
    password: string,
    phone_number: string,
    updated_at: Date,
}

export type UpdateEmployeeOBJ = {
    id: number,
    name: string,
    last_name: string,
    email: string,
    phone_number: string,
}

export type PublicEmployeeOBJ = {
    admin_level:number,
    birth_date: Date,
    cnss: number,
    created_at: Date,
    email: string,
    exit_date: Date,
    id: number,
    is_verified: boolean,
    joined_date: Date,
    last_name: string,
    name: string,
    paid_leaves: number,
    phone_number: string,
    updated_at: Date,
}

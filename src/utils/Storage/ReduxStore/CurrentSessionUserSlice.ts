import { createSlice } from "@reduxjs/toolkit";

const defaultEmployeeOBJ = {
    admin_level:-1,
    birth_date: "",
    cnss: -1,
    created_at: "",
    email: "",
    exit_date: "",
    id: -1,
    is_verified: false,
    joined_date: "",
    last_name: "",
    name: "",
    paid_leaves: -1,
    password: "",
    phone_number: "",
    updated_at: "",
}

export const currentSessionUserSlice = createSlice({
    name: "current_session_user_slice",
    initialState: defaultEmployeeOBJ,
    reducers: {
        setEmployeeOBJ: (state, {payload}) => {
            return state = {...payload, birth_date: payload.birth_date.toString(), joined_date: payload.joined_date.toString(), exit_date: payload.exit_date.toString()};
        },
        deleteEmployeeOBJ: (state) => {
            state = defaultEmployeeOBJ;
            return state;
        }
    }
});

export const {setEmployeeOBJ, deleteEmployeeOBJ} = currentSessionUserSlice.actions;

export default currentSessionUserSlice.reducer;
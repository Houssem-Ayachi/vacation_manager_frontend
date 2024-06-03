import Request from "../Requests"

import { ResetPassowrdOBJ, LoginOBJ } from "./Auth.Requests.Objects";
import { CreateEmployeeOBJ } from "../Employees/Employees.Requests.Objects";

export default class AuthRequests {

    private readonly _request: Request;

    private readonly _PREFIX = "auth";

    private readonly _URIS = {
        signin: `/${this._PREFIX}/signin`,
        createEmployeeAccount: `/${this._PREFIX}/create_employee_account`,
        createSuperAdmin: `/${this._PREFIX}/create_super_admin`,
        sendResetPasswordRequest: `/${this._PREFIX}/:send_reset_password_request`,
        resetPassword: `/${this._PREFIX}/reset_password`
    }

    constructor(){
        this._request = new Request();
    }

    async signin(data: LoginOBJ){
        try{
            const response = await this._request.post(this._URIS.signin, data);
            return response;
        }catch(error: any){
            return error.response.data;
        }
    }

    async createEmployeeAccount(data: CreateEmployeeOBJ){
        try{
            const response = await this._request.post(this._URIS.createEmployeeAccount, data);
            return response;
        }catch(error: any){
            return error.response.data;
        }
    }

    async createSuperAdmin(data: CreateEmployeeOBJ){
        try{
            const response = await this._request.post(this._URIS.createSuperAdmin, data);
            return response;
        }catch(error: any){
            return error.response.data;
        }
    }

    async sendResetPasswordRequest(){
        try{
            const response = await this._request.post(this._URIS.sendResetPasswordRequest, {});
            return response;
        }catch(error: any){
            return error.response.data;
        }
    }

    async resetPassword(data: ResetPassowrdOBJ){
        try{
            const response = await this._request.post(this._URIS.resetPassword, data);
            return response;
        }catch(error: any){
            return error.response.data;
        }
    }

}
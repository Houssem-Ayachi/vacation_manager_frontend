import Request from "../Requests"
import { CreateEmployeeOBJ, UpdateEmployeeOBJ } from "./Employees.Requests.Objects";

export default class EmployeesRequests {

    private readonly _request: Request;

    private readonly _PREFIX = "employee";

    private readonly _URIS = {
        getAllEmployees: `/${this._PREFIX}/`,
        getEmployeeByID: `/${this._PREFIX}/?id=*`,
        updateEmployee: `/${this._PREFIX}/:id`,
        createEmployee: `/${this._PREFIX}/`,
        deleteEmplyee: `/${this._PREFIX}/:id`,
        makeEmployeeAdmin: `/${this._PREFIX}/make_admin/:id`,
        getEmployeesCount: `/${this._PREFIX}/count`,
        getCurrentSessionEmployeeData: `/${this._PREFIX}/current_session_employee_data`,
        updateToSimpleEmployee: `/${this._PREFIX}/update_to_simple_employee/:id`
    }

    constructor(){
        this._request = new Request();
    }
    
    async getAllEmployees(){
        const response = await this._request.get(this._URIS.getAllEmployees);
        return response;
    }

    async getEmployeeByID(id: number){
        const response = await this._request.get(this._URIS.getEmployeeByID.replace("*", id.toString()));
        return response;
    }

    async updateEmployee(data: UpdateEmployeeOBJ){
        const response = await this._request.put(this._URIS.updateEmployee.replace(":id", data.id.toString()), data);
        return response;
    }

    async createEmployee(data: CreateEmployeeOBJ){
        const response = await this._request.post(this._URIS.createEmployee, data);
        return response;
    }

    async deleteEmplyoee(){
        const response = await this._request.delete(this._URIS.deleteEmplyee);
        return response;
    }

    async makeEmployeeAdmin(id: number){
        const response = await this._request.put(this._URIS.makeEmployeeAdmin.replace(":id", id.toString()), {});
        return response;
    }

    async getEmployeesCount(){
        const response = await this._request.get(this._URIS.getEmployeesCount);
        return response;
    }

    async getCurrentSessionEmployeeData(){
        const response = await this._request.get(this._URIS.getCurrentSessionEmployeeData);
        return response;
    }

    async updateToSimpleEmployee(id: number){
        return await this._request.put(this._URIS.updateToSimpleEmployee.replace(":id", id.toString()), {});
    }
}
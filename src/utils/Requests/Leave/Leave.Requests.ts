import Request from "../Requests";
import { CreateLeaveRequestOBJ, LeaveRequestReplyOBJ, UpdateLeaveRequestOBJ } from "./Leave.Requests.Objects";

export default class LeaveRequest extends Request {

    private readonly _PREFIX = "leave";

    private readonly _URIS = {
        getPendingRequests: `/${this._PREFIX}/requests`,
        getEmployeesLeaveHistory: `/${this._PREFIX}/`,
        createLeaveRequest: `/${this._PREFIX}/`,
        updateLeaveRequest: `/${this._PREFIX}/`,
        deleteLeaveRequest: `/${this._PREFIX}/:id`,
        getEmployeeLeaveHistory: `/${this._PREFIX}/:employee_id`,
        replyToEmployeeLeaveRequest:`/${this._PREFIX}/reply`,
        getBalance: `/${this._PREFIX}/balance/:employee_id`,
        isInLeave: `/${this._PREFIX}/is_in_leave/:employee_id`,
        getMonthLeaves: `/${this._PREFIX}/month_leaves`,
    }

    async getPendingRequests(){
        return await this.get(this._URIS.getPendingRequests);
    }

    async getEmployeesLeaveHistory(){
        return await this.get(this._URIS.getEmployeesLeaveHistory);
    }

    async createLeaveRequest(data: CreateLeaveRequestOBJ){
        return await this.post(this._URIS.createLeaveRequest, data);
    }

    async updateLeaveRequest(data: UpdateLeaveRequestOBJ){
        return await this.put(this._URIS.updateLeaveRequest, data);
    }

    async deleteLeaveRequest(id: number){
        return await this.delete(this._URIS.deleteLeaveRequest.replace(":id", id.toString()));
    }

    async getEmployeeLeaveHistory(employeeID: number){
        return await this.get(this._URIS.getEmployeeLeaveHistory.replace(":employee_id", employeeID.toString()));
    }

    async replyToEmployeeLeaveRequest(data: LeaveRequestReplyOBJ){
        return await this.post(this._URIS.replyToEmployeeLeaveRequest, data);
    }

    async getBalance(employeeID: number){
        return await this.get(this._URIS.getBalance.replace(":employee_id", employeeID.toString()));
    }

    async isInLeave(employeeID: number){
        return await this.get(this._URIS.isInLeave.replace(":employee_id", employeeID.toString()));
    }

    async getMonthLeaves(searchDate: string){
        return await this.post(this._URIS.getMonthLeaves, {searchDate});
    }
}
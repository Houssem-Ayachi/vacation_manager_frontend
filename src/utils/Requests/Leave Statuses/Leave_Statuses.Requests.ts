import Request from "../Requests";
import { CreateLeaveStatusType } from "./Leave_Statuses.Requests.Object";

export default class LeaveStatusesRequest {

    private readonly req: Request;

    private readonly _PREFIX = "leave-statuses";

    private readonly _URIS = {
        getStatuses: `/${this._PREFIX}/`,
        createStatus: `/${this._PREFIX}/`,
        updateStatus: `/${this._PREFIX}/`,
        deleteStatus: `/${this._PREFIX}/:id`
    }

    constructor(){
        this.req = new Request();
    }

    async getStatuses(){
        return await this.req.get(this._URIS.getStatuses);
    }

    async createStatus(data: CreateLeaveStatusType){
        return await this.req.post(this._URIS.createStatus, data);
    }

    async updateStatus(data: CreateLeaveStatusType){
        return await this.req.put(this._URIS.updateStatus, data);
    }

    async deleteStatus(label: string){
        return await this.req.delete(this._URIS.deleteStatus.replace(":id", label));
    }


}
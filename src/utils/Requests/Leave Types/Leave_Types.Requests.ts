import Request from "../Requests";

import { createLeaveTypeOBJ } from "./Leave_Types.Requests.Objects";

export default class LeaveTypesRequests {

    private readonly _PREFIX = "leave-types";

    private readonly _URIS = {
        get: `/${this._PREFIX}/`,
        create: `/${this._PREFIX}/`,
        update: `/${this._PREFIX}/`,
        delete: `/${this._PREFIX}/:id`
    }

    private readonly request: Request;

    constructor(){
        this.request = new Request();
    }

    async get(){
        return await this.request.get(this._URIS.get);
    }

    async create(data: createLeaveTypeOBJ){
        return await this.request.post(this._URIS.create, data);
    }

    async update(data: createLeaveTypeOBJ){
        return await this.request.put(this._URIS.update, data);
    }

    async delete(type: string){
        return await this.request.delete(this._URIS.delete.replace(":id", type));
    }

}
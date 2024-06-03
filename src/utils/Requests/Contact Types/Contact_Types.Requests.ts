import Request from "../Requests";
import { CreateContactTypeType, UpdateContactTypeType } from "./Contact_Types.Requests.Object";

export default class ContactTypesRequests {

    private readonly req: Request;

    private readonly _PREFIX = "contacts-types";

    private readonly _URIS = {
        getContactsTypes: `/${this._PREFIX}`,
        createContactType: `/${this._PREFIX}`,
        updateContactType: `/${this._PREFIX}`,
        deleteContactType: `/${this._PREFIX}/:id`
    }

    constructor(){
        this.req = new Request();
    }

    async getContactsTypes(){
        return await this.req.get(this._URIS.getContactsTypes);
    }

    async createContactType(data: CreateContactTypeType){
        return await this.req.post(this._URIS.createContactType, data);
    }

    async updateContactType(data: UpdateContactTypeType){
        return await this.req.put(this._URIS.updateContactType, data);
    }

    async deleteContactType(type: string){
        return await this.req.delete(this._URIS.deleteContactType.replace(":id", type));
    }


}
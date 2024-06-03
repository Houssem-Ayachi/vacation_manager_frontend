import Request from "../Requests";
import { CreateContactOBJ, UpdateContactOBJ } from "./Contacts.Requests.Object";

export default class ContactRequest extends Request {

    private readonly _PREFIX = "contacts";

    private readonly _URIS = {
        getEmployeeContacts: `/${this._PREFIX}/:id`,
        createContact: `/${this._PREFIX}/`,
        updateContact: `/${this._PREFIX}/`,
        deleteContact: `/${this._PREFIX}/:id`
    }

    constructor(){super();}

    async getEmployeeContacts(id: number){
        const response = await this.get(this._URIS.getEmployeeContacts.replace(":id", id.toString()));
        return response;
    }

    async createContact(data: CreateContactOBJ){
        const response = await this.post(this._URIS.createContact, data);
        return response;
    }

    async updateContact(data: UpdateContactOBJ){
        const response = await this.put(this._URIS.updateContact, data);
        return response;
    }

    async deleteContact(id: number){
        const response = await this.delete(this._URIS.deleteContact.replace(":id", id.toString()));
        return response;
    }
}
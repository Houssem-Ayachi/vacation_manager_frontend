import axios from "axios";

import TokenHandler from "../Storage/TokenHandler";

class Request {

    private readonly _SERVER_URL = "http://localhost:3001/api";
    private readonly _tokenHandler = new TokenHandler();

    //TODO: handle response error
    async post(uri: string, data: any){
        try{
            const response = await axios.post(this._SERVER_URL+uri, data, {
                withCredentials: true,
                headers: {
                    "Authorization": `Bearer ${this._tokenHandler.getToken()}`
                }
            });
            //this response property is usually present when the data holds an error
            if(response.data.response){
                return response.data.response
            }
            return response.data;
        }catch(error: any){
            console.log(error);
            return error.response.data;
        }
    }

    async get(uri: string){
        try{
            const response = await axios.get(this._SERVER_URL+uri, {
                withCredentials: true,
                headers: {
                    "Authorization": `Bearer ${this._tokenHandler.getToken()}`
                }
            });
            //this response property is usually present when the data holds an error
            if(response.data.response){
                return response.data.response
            }
            return response.data;
        }catch(error: any){
            return error.response.data;
        }
    }

    async delete(uri: string){
        try{
            const response = await axios.delete(this._SERVER_URL+uri, {
                withCredentials: true,
                headers: {
                    "Authorization": `Bearer ${this._tokenHandler.getToken()}`
                }
            });
            //this response property is usually present when the data holds an error
            if(response.data.response){
                return response.data.response
            }
            return response.data;
        }catch(error: any){
            return error.response.data;
        }
    }

    async put(uri: string, data: any){
        try{
            const response = await axios.put(this._SERVER_URL+uri, data, {
                withCredentials: true,
                headers: {
                    "Authorization": `Bearer ${this._tokenHandler.getToken()}`
                }
            });
            //this response property is usually present when the data holds an error
            if(response.data.response){
                return response.data.response
            }
        return response.data;
        }catch(error: any){
            return error.response.data;
        }
    }
}

export default Request;

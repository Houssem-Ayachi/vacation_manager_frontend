export default class TokenHandler {

    private readonly _tokenName = "token";

    registerToken(token: string){
        localStorage.setItem(this._tokenName, token);
    }

    getToken(){
        return localStorage.getItem(this._tokenName);
    }

    deleteToken(){
        localStorage.removeItem(this._tokenName);
    }

}
import { Injectable } from "@angular/core";

@Injectable()
export class SharingService {
    Token: string;
    constructor() {
        this.Token = '';
    }

    getToken() {
        return this.Token;
    }

    setToken(token) {
        this.Token = token;
    }
}
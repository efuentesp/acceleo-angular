import { Injectable } from '@angular/core';
import { environment }                             from "../../environments/environment";
import { Http, Headers, Response } from '@angular/http';
import { User } from "../user/user.component.model";
import { reject } from 'q';
import { Authority } from './authorities.component.model';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
    public token: string;
    private env: any = environment;
    private user: any = User;
    public authorities: string[] = []; 
    public username: string;

    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        this.authorities = currentUser && currentUser.authorities;
        this.username = currentUser && currentUser.username;
        
    }

    login(user) {

        return this.http.post(this.env.api + "/api/authenticate", user).pipe(map(response => 
                {

               
                let token = response.json() && response.json().token;
                let authorities = response.json() && response.json().authorities;
                let username = response.json() && response.json().username;
                

                if (token) {
                    
                    this.token = token;
                    this.authorities = authorities;
                    this.username = username;
                   
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token, authorities: authorities}));
                    return true;
                }
                return false;
            } 
        ));
         
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }

    errorHandler(error: any): void {
        console.log(error)
      } 
}
import { Injectable } from '@angular/core';

import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { reject } from 'q';
import { environment } from '../environments/environment';
import { User } from './user/user.component.model';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { Authority } from './admin/authority/authority.component.model';
import { Privilege } from './admin/authority/privilege.component.model';

@Injectable()
export class AuthenticationService {
    public token: string;
    private env: any = environment;
    private user: any = User;
    public authorities: Authority[] = []; 
    private username: string;
    private firstname: string;
    private lastname: string;
    public privileges: Privilege[] = [];
    loading = false;
    redirectUrl: string;

    constructor(private http: Http) {
       
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        
    }

    login(user) {

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.env.api + "/auth", user, options).pipe(map(response => 
                {

                let token = response.json() && response.json().token;
                let authorities = response.json() && response.json().authorities;
                let userName = response.json() && response.json().username;
                

                if (token) {
                    
                    this.token = token;
                    this.loading = true;
                    localStorage.setItem('currentUser', JSON.stringify({token: token}));
                    return true;
                }

                this.loading = false;
                return false;
            } 
        ));
    }

   getMenu(token){
    
     let headers = new Headers;
     headers.append('Content-Type','application/json');
     headers.append('Authorization','Bearer ' + token+'');
     let options = new RequestOptions({ headers: headers });
    
     return this.http.get(this.env.api + "/user", options).pipe(map(response => {
      
       console.log('Response User Service', response);

       // Get user info
       this.authorities = response.json() && response.json().authorities;
       this.username = response.json() && response.json().username;
       this.firstname = response.json() && response.json().firstname;
       this.lastname = response.json() && response.json().lastname;
       this.privileges = response.json() && response.json().privileges;

       // Set to currentUser values
       localStorage.setItem('currentUser', JSON.stringify({ username: this.username, token: token, authorities: this.authorities, firstname: this.firstname, lastname:this.lastname, privileges:this.privileges}));

       console.log('Response User Service values:', " Token: "+token+" Username: "+this.username+" Authorities: "+this.authorities);
       return true;

     }));
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
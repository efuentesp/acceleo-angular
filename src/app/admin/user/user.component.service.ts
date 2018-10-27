import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { User }                           from '../user/user.component.model';

@Injectable()
export class UserService {

    private isUserFormValid: boolean = false;
    private env: any = environment;
    private user = new User();
    private flag :boolean = false;
    private flagDelete :boolean = false;

    public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getAllUser(){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.userAdmin.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/usersList",opts).pipe(map(res => res.json()));
    }

    saveUser(user, privileges, flag){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.userAdmin.token+'');
        let opts = new RequestOptions({ headers: headers });

		if (!user.idUser){
            return this.http.post(this.env.api + "/users/"+ user.username + "/" + privileges, user , opts).pipe(map(res => res, error => error));
        }else{
            return this.http.put(this.env.api + "/users/"+ user.idUser + "/"+ user.username + "/" + privileges+"/" + flag, user , opts).pipe(map(res => res));
        }
    }

    deleteUser(user){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.userAdmin.token+'');
        let opts = new RequestOptions({ headers: headers });

        console.log("Elimina usuario", user.idUser);
        return this.http.delete(this.env.api + "/users/"+user.idUser, opts).pipe(map(res => res));
    }

    getUserById(idUser){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.userAdmin.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/users/"+idUser, opts).pipe(map(res => res));
    }

    resetUser(): User {
        this.clear();
        return this.user;
    }

    getUser(): User {

        var user: User = {

            idUser: this.user.idUser,
            username: this.user.username,
            password: this.user.password,
            token: this.user.token,
            firstname: this.user.firstname,
            lastname: this.user.lastname,
            authorities: this.user.authorities,
            email: this.user.email,
            enabled: this.user.enabled, 
            selected: this.user.selected,
            authorityname: this.user.authorityname
        };
        return user;
    }

    setUser(user: User) {

        this.user.idUser = user.idUser;
        this.user.username = user.username;
        this.user.password = user.password;
        this.user.token= user.token,
        this.user.firstname= user.firstname,
        this.user.lastname= user.lastname,
        this.user.authorities = user.authorities,
        this.user.email = user.email,
        this.user.enabled = user.enabled,
        this.user.selected = user.selected,
        this.user.authorityname = user.authorityname

    }

    isFormValid() {
        return this.isUserFormValid;
    }

    validateUser() {

    }

    clear() {
        this.user.idUser = null;
        this.user.username = '';
        this.user.password = '';
        this.user.token= '';
        this.user.firstname= '';
        this.user.lastname= '';
        this.user.authorities =null;
        this.user.email = '';
        this.user.enabled = false;
        this.user.selected = null;
        this.user.authorityname = '';
    }

    setEdit(flag){
        this.flag = flag;
    }

    getEdit(){
        return this.flag;
    }

    setDelete(flagDelete){
        this.flagDelete = flagDelete;
    }

    getDelete(){
        return this.flagDelete;
    }

}

import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Authority }                           from '../authority/authority.component.model';
import { User } from '../user/user.component.model';

@Injectable()
export class AuthorityService {

    private isAuthorityFormValid: boolean = false;
    private env: any = environment;
    private authority = new Authority();
    private flag :boolean = false;
    private flagDelete :boolean = false;

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {}

    getAllAuthority(){
        let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/authority", opts).pipe(map(res => res.json()));
    }

    getAllAuthorityCatalog(){
        let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/authority/catalog", opts).pipe(map(res => res.json()));
    }

    saveAuthority(authority){
         let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });

		if (!authority.idAuthority){
            return this.http.post(this.env.api + "/authority", authority, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/authority/"+authority.idAuthority, authority, opts).pipe(map(res => res));
        }
    }

    deleteAuthority(authority){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/authority/"+authority.idAuthority, opts).pipe(map(res => res, error => error));
    }

    getAuthorityById(idRol){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/authority/"+idRol).pipe(map(res => res));
    }

    resetAuthority(): Authority {
        this.clear();
        return this.authority;
    }

    getAuthority(): Authority {
        var authority: Authority = {

            enabled: this.authority.enabled,
            idAuthority: this.authority.idAuthority,
            name: this.authority.name,
            creationDate:this.authority.creationDate,
            modifiedDate:this.authority.modifiedDate

        };
        return authority;
    }

    setAuthority(authority: Authority) {

            this.isAuthorityFormValid = true;
            this.authority.idAuthority = authority.idAuthority;
            this.authority.enabled = authority.enabled;
            this.authority.name =authority.name;
            this.authority.creationDate = authority.creationDate;
            this.authority.modifiedDate = authority.modifiedDate;
    }

    isFormValid() {
        return this.isAuthorityFormValid;
    }

    clear() {
            this.authority.idAuthority = null;
            this.authority.enabled = false;
            this.authority.name ='';
            this.authority.creationDate = '';
            this.authority.modifiedDate = '';
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

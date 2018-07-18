import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../user/user.component.model';


@Injectable()
export class ManagePrivilegeService {

    private isAfiliadoFormValid: boolean = false;
    private env: any = environment;
    private flag :boolean = false;
    private flagDelete :boolean = false;
    
    public user: User = JSON.parse(localStorage.getItem('currentUser'));
    

    constructor(private http: Http) {}

    getAllPrivilege(){
        let headers = new Headers;
        
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/adminPermiso", opts).pipe(map(res => res.json()));
    }

    updatePrivilege(adminPermiso){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.put(this.env.api + "/adminPermiso", adminPermiso, opts).pipe(map(res => res));
    }
   
       
    
}

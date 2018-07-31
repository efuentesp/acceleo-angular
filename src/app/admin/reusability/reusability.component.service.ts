import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Reusability }                           from '../reusability/reusability.component.model';
import { User } from '../user/user.component.model';
import { UserStorageComponent } from '../user/user-storage.component';

@Injectable()
export class ReusabilityService {

    private isReusabilityFormValid: boolean = false;
    private env: any = environment;
    private reusability = new Reusability();
    private flag :boolean = false;
    private flagDelete :boolean = false;
    private storage: UserStorageComponent;

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getAllReusability(){
		let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/reusability", opts).pipe(map(res => res.json()));
    }

    saveReusability(reusability){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

		if (!reusability.reusabilityId){
            return this.http.post(this.env.api + "/reusability", reusability, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/reusability/"+ reusability.reusabilityId, reusability, opts).pipe(map(res => res));
        }
    }

    deleteReusability(reusability){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/reusability/"+reusability.reusabilityId, opts).pipe(map(res => res));
    }

    getReusabilityById(reusabilityId){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/idreusability/"+reusabilityId, opts).pipe(map(res => res.json()));
    }

    resetReusability(): Reusability {
        this.clear();
        return this.reusability;
    }

    getReusability(): Reusability {
        var reusability: Reusability = {
					r1: this.reusability.r1, 
					r2: this.reusability.r2, 
					
					reusabilityId: this.reusability.reusabilityId	

        };
        return reusability;
    }


setReusability(reusability: Reusability) {
       
	this.isReusabilityFormValid = true;
			this.reusability.r1 = reusability.r1;    
			this.reusability.r2 = reusability.r2;    
			this.reusability.reusabilityId        = reusability.reusabilityId;
        	this.validateReusability();
    }

    isFormValid() {
        return this.isReusabilityFormValid;
    }

    validateReusability() {

    }

    clear() {

			this.reusability.r1 = '';    
			this.reusability.r2 = '';    
			this.reusability.reusabilityId = null;
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

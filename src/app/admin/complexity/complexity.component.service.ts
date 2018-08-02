import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Complexity }                           from '../complexity/complexity.component.model';
import { User } from '../user/user.component.model';
import { UserStorageComponent } from '../user/user-storage.component';

@Injectable()
export class ComplexityService {

    private isComplexityFormValid: boolean = false;
    private env: any = environment;
    private complexity = new Complexity();
    private flag :boolean = false;
    private flagDelete :boolean = false;
    private storage: UserStorageComponent;

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getAllComplexity(){
		let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/complexity", opts).pipe(map(res => res.json()));
    }

    saveComplexity(complexity){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

		if (!complexity.complexityId){
            return this.http.post(this.env.api + "/complexity", complexity, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/complexity/"+ complexity.complexityId, complexity, opts).pipe(map(res => res));
        }
    }

    deleteComplexity(complexity){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/complexity/"+complexity.complexityId, opts).pipe(map(res => res));
    }

    getComplexityById(complexityId){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/idcomplexity/"+complexityId, opts).pipe(map(res => res.json()));
    }

    resetComplexity(): Complexity {
        this.clear();
        return this.complexity;
    }

    getComplexity(): Complexity {
        var complexity: Complexity = {
					c: this.complexity.c, 
					ms: this.complexity.ms, 
					m: this.complexity.m, 
					s: this.complexity.s, 
					mc: this.complexity.mc, 
					
					complexityId: this.complexity.complexityId	

        };
        return complexity;
    }


setComplexity(complexity: Complexity) {
       
	this.isComplexityFormValid = true;
			this.complexity.c = complexity.c;    
			this.complexity.ms = complexity.ms;    
			this.complexity.m = complexity.m;    
			this.complexity.s = complexity.s;    
			this.complexity.mc = complexity.mc;    
			this.complexity.complexityId        = complexity.complexityId;
        	this.validateComplexity();
    }

    isFormValid() {
        return this.isComplexityFormValid;
    }

    validateComplexity() {

    }

    clear() {

			this.complexity.c = '';    
			this.complexity.ms = '';    
			this.complexity.m = '';    
			this.complexity.s = '';    
			this.complexity.mc = '';    
			this.complexity.complexityId = null;
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

import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Algorithmtype }                           from '../algorithmtype/algorithmtype.component.model';
import { User } from '../user/user.component.model';
import { UserStorageComponent } from '../user/user-storage.component';

@Injectable()
export class AlgorithmtypeService {

    private isAlgorithmtypeFormValid: boolean = false;
    private env: any = environment;
    private algorithmtype = new Algorithmtype();
    private flag :boolean = false;
    private flagDelete :boolean = false;
    private storage: UserStorageComponent;

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getAllAlgorithmtype(){
		let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/algorithmtype", opts).pipe(map(res => res.json()));
    }

    saveAlgorithmtype(algorithmtype){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

		if (!algorithmtype.algorithmtypeId){
            return this.http.post(this.env.api + "/algorithmtype", algorithmtype, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/algorithmtype/"+ algorithmtype.algorithmtypeId, algorithmtype, opts).pipe(map(res => res));
        }
    }

    deleteAlgorithmtype(algorithmtype){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/algorithmtype/"+algorithmtype.algorithmtypeId, opts).pipe(map(res => res));
    }

    getAlgorithmtypeById(algorithmtypeId){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/idalgorithmtype/"+algorithmtypeId, opts).pipe(map(res => res.json()));
    }

    resetAlgorithmtype(): Algorithmtype {
        this.clear();
        return this.algorithmtype;
    }

    getAlgorithmtype(): Algorithmtype {
        var algorithmtype: Algorithmtype = {
					a1: this.algorithmtype.a1, 
					a2: this.algorithmtype.a2, 
					
					algorithmtypeId: this.algorithmtype.algorithmtypeId	

        };
        return algorithmtype;
    }


setAlgorithmtype(algorithmtype: Algorithmtype) {
       
	this.isAlgorithmtypeFormValid = true;
			this.algorithmtype.a1 = algorithmtype.a1;    
			this.algorithmtype.a2 = algorithmtype.a2;    
			this.algorithmtype.algorithmtypeId        = algorithmtype.algorithmtypeId;
        	this.validateAlgorithmtype();
    }

    isFormValid() {
        return this.isAlgorithmtypeFormValid;
    }

    validateAlgorithmtype() {

    }

    clear() {

			this.algorithmtype.a1 = '';    
			this.algorithmtype.a2 = '';    
			this.algorithmtype.algorithmtypeId = null;
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

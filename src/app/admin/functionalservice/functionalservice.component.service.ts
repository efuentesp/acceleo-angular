import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Functionalservice }                           from '../functionalservice/functionalservice.component.model';
import { User } from '../user/user.component.model';
import { UserStorageComponent } from '../user/user-storage.component';

@Injectable()
export class FunctionalserviceService {

    private isFunctionalserviceFormValid: boolean = false;
    private env: any = environment;
    private functionalservice = new Functionalservice();
    private flag :boolean = false;
    private flagDelete :boolean = false;
    private storage: UserStorageComponent;

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getAllFunctionalservice(){
		let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/functionalservice", opts).pipe(map(res => res.json()));
    }

    saveFunctionalservice(functionalservice){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

		if (!functionalservice.functionalserviceId){
            return this.http.post(this.env.api + "/functionalservice", functionalservice, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/functionalservice/"+ functionalservice.functionalserviceId, functionalservice, opts).pipe(map(res => res));
        }
    }

    deleteFunctionalservice(functionalservice){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/functionalservice/"+functionalservice.functionalserviceId, opts).pipe(map(res => res));
    }

    getFunctionalserviceById(functionalserviceId){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/idfunctionalservice/"+functionalserviceId, opts).pipe(map(res => res.json()));
    }

    resetFunctionalservice(): Functionalservice {
        this.clear();
        return this.functionalservice;
    }

    getFunctionalservice(): Functionalservice {
        var functionalservice: Functionalservice = {
					comments: this.functionalservice.comments, 
					description: this.functionalservice.description, 
					repetitions: this.functionalservice.repetitions, 
					code: this.functionalservice.code, 
					size: this.functionalservice.size, 
					name: this.functionalservice.name, 
					
					menuId: this.functionalservice.menuId,
					menuItem: this.functionalservice.menuItem,
					complexityId: this.functionalservice.complexityId,
					repositoryId: this.functionalservice.repositoryId,
					dataId: this.functionalservice.dataId,
					algorithmtypeId: this.functionalservice.algorithmtypeId,
					reusabilityId: this.functionalservice.reusabilityId,
					display_resultfunctionalserviceId: this.functionalservice.functionalserviceId,
					exposed_filterfunctionalserviceId: this.functionalservice.functionalserviceId,
					requiredfunctionalserviceId: this.functionalservice.functionalserviceId,
					functionalserviceId: this.functionalservice.functionalserviceId	

        };
        return functionalservice;
    }


setFunctionalservice(functionalservice: Functionalservice) {
       
	this.isFunctionalserviceFormValid = true;
			this.functionalservice.comments = functionalservice.comments;    
			this.functionalservice.description = functionalservice.description;    
			this.functionalservice.repetitions = functionalservice.repetitions;    
			this.functionalservice.code = functionalservice.code;    
			this.functionalservice.size = functionalservice.size;    
			this.functionalservice.name = functionalservice.name;    
			this.functionalservice.menuId = functionalservice.menuId;
			this.functionalservice.menuItem = functionalservice.menuItem;
			this.functionalservice.complexityId = functionalservice.complexityId;
			this.functionalservice.repositoryId = functionalservice.repositoryId;
			this.functionalservice.dataId = functionalservice.dataId;
			this.functionalservice.algorithmtypeId = functionalservice.algorithmtypeId;
			this.functionalservice.reusabilityId = functionalservice.reusabilityId;
			this.functionalservice.display_resultfunctionalserviceId = functionalservice.display_resultfunctionalserviceId;
			this.functionalservice.exposed_filterfunctionalserviceId = functionalservice.exposed_filterfunctionalserviceId;
			this.functionalservice.requiredfunctionalserviceId = functionalservice.requiredfunctionalserviceId;
			this.functionalservice.functionalserviceId        = functionalservice.functionalserviceId;
        	this.validateFunctionalservice();
    }

    isFormValid() {
        return this.isFunctionalserviceFormValid;
    }

    validateFunctionalservice() {

    }

    clear() {

			this.functionalservice.comments = '';    
			this.functionalservice.description = '';    
			this.functionalservice.repetitions = null;    
			this.functionalservice.code = '';    
			this.functionalservice.size = '';    
			this.functionalservice.name = '';    
			this.functionalservice.menuId = null;
			this.functionalservice.menuItem = null;
			this.functionalservice.complexityId = null;
			this.functionalservice.repositoryId = null;
			this.functionalservice.dataId = null;
			this.functionalservice.algorithmtypeId = null;
			this.functionalservice.reusabilityId = null;
			this.functionalservice.display_resultfunctionalserviceId = null;
			this.functionalservice.exposed_filterfunctionalserviceId = null;
			this.functionalservice.requiredfunctionalserviceId = null;
			this.functionalservice.functionalserviceId = null;
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

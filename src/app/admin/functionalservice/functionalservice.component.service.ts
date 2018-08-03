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
		code: this.functionalservice.code, 
		size: this.functionalservice.size, 
		name: this.functionalservice.name, 
		comments: this.functionalservice.comments, 
		repetitions: this.functionalservice.repetitions, 
		menuId: this.functionalservice.menuId,
		menuItem: this.functionalservice.menuItem,
		description: this.functionalservice.description,
		complexityId: this.functionalservice.complexityId,
		complexityItem: this.functionalservice.complexityItem,
		repositoryId: this.functionalservice.repositoryId,
		repositoryItem: this.functionalservice.repositoryItem,
		dataId: this.functionalservice.dataId,
		dataItem: this.functionalservice.dataItem,
		algorithmtypeId: this.functionalservice.algorithmtypeId,
		algorithmtypeItem: this.functionalservice.algorithmtypeItem,
		reusabilityId: this.functionalservice.reusabilityId,
		reusabilityItem: this.functionalservice.reusabilityItem,
		functionalserviceId: this.functionalservice.functionalserviceId,
		functionalserviceItem: this.functionalservice.functionalserviceItem	
        };
        return functionalservice;
    }

setFunctionalservice(functionalservice: Functionalservice) {
       
		this.isFunctionalserviceFormValid = true;
		this.functionalservice.code = functionalservice.code;    
		this.functionalservice.size = functionalservice.size;    
		this.functionalservice.name = functionalservice.name;    
		this.functionalservice.comments = functionalservice.comments;    
		this.functionalservice.repetitions = functionalservice.repetitions;    
		this.functionalservice.menuId = functionalservice.menuId;
		this.functionalservice.menuItem = functionalservice.menuItem;
		this.functionalservice.description = functionalservice.description;
		this.functionalservice.complexityId = functionalservice.complexityId;
		this.functionalservice.repositoryId = functionalservice.repositoryId;
		this.functionalservice.dataId = functionalservice.dataId;
		this.functionalservice.algorithmtypeId = functionalservice.algorithmtypeId;
		this.functionalservice.reusabilityId = functionalservice.reusabilityId;
		this.functionalservice.functionalserviceId = functionalservice.functionalserviceId;
		this.functionalservice.functionalserviceItem = functionalservice.functionalserviceItem;
		this.validateFunctionalservice();
    }

    isFormValid() {
        return this.isFunctionalserviceFormValid;
    }

    validateFunctionalservice() {

    }

    clear() {

			this.functionalservice.code = '';    
			this.functionalservice.size = '';    
			this.functionalservice.name = '';    
			this.functionalservice.comments = '';    
			this.functionalservice.repetitions = null;    

			this.functionalservice.menuId = null;
			this.functionalservice.menuItem = null;
			this.functionalservice.description = '';
			this.functionalservice.complexityId = null;
			this.functionalservice.complexityItem = null;
			this.functionalservice.repositoryId = null;
			this.functionalservice.repositoryItem = null;
			this.functionalservice.dataId = null;
			this.functionalservice.dataItem = null;
			this.functionalservice.algorithmtypeId = null;
			this.functionalservice.algorithmtypeItem = null;
			this.functionalservice.reusabilityId = null;
			this.functionalservice.reusabilityItem = null;
			this.functionalservice.functionalserviceId = null;
			this.functionalservice.functionalserviceItem = null;
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

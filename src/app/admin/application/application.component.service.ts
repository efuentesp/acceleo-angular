import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Application }                           from '../application/application.component.model';
import { User } from '../user/user.component.model';
import { UserStorageComponent } from '../user/user-storage.component';

@Injectable()
export class ApplicationService {

    private isApplicationFormValid: boolean = false;
    private env: any = environment;
    private application = new Application();
    private flag :boolean = false;
    private flagDelete :boolean = false;
    private storage: UserStorageComponent;

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getAllApplication(){
		let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/application", opts).pipe(map(res => res.json()));
    }

    saveApplication(application){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

		if (!application.applicationId){
            return this.http.post(this.env.api + "/application", application, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/application/"+ application.applicationId, application, opts).pipe(map(res => res));
        }
    }

    deleteApplication(application){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/application/"+application.applicationId, opts).pipe(map(res => res));
    }

    getApplicationById(applicationId){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/idapplication/"+applicationId, opts).pipe(map(res => res.json()));
    }

    resetApplication(): Application {
        this.clear();
        return this.application;
    }

    getApplication(): Application {
        var application: Application = {
					code: this.application.code, 
					name: this.application.name, 
					
					applicationId: this.application.applicationId	

        };
        return application;
    }


setApplication(application: Application) {
       
	this.isApplicationFormValid = true;
			this.application.code = application.code;    
			this.application.name = application.name;    
			this.application.applicationId        = application.applicationId;
        	this.validateApplication();
    }

    isFormValid() {
        return this.isApplicationFormValid;
    }

    validateApplication() {

    }

    clear() {

			this.application.code = '';    
			this.application.name = '';    
			this.application.applicationId = null;
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

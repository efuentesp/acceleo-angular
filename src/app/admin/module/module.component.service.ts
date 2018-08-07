import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Module }                           from '../module/module.component.model';
import { User } from '../user/user.component.model';
import { UserStorageComponent } from '../user/user-storage.component';

@Injectable()
export class ModuleService {

    private isModuleFormValid: boolean = false;
    private env: any = environment;
    private module = new Module();
    private flag :boolean = false;
    private flagDelete :boolean = false;
    private storage: UserStorageComponent;

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getAllModule(){
		let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/module", opts).pipe(map(res => res.json()));
    }

    saveModule(module){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

		if (!module.moduleId){
            return this.http.post(this.env.api + "/module", module, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/module/"+ module.moduleId, module, opts).pipe(map(res => res));
        }
    }

    deleteModule(module){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/module/"+module.moduleId, opts).pipe(map(res => res));
    }

    getModuleById(moduleId){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/idmodule/"+moduleId, opts).pipe(map(res => res.json()));
    }

    resetModule(): Module {
        this.clear();
        return this.module;
    }

    getModule(): Module {
        var module: Module = {
		code: this.module.code, 
		name: this.module.name, 
		applicationId: this.module.applicationId,
		applicationItem: this.module.applicationItem,
		moduleId: this.module.moduleId,
		moduleItem: this.module.moduleItem	
        };
        return module;
    }

setModule(module: Module) {
       
		this.isModuleFormValid = true;
		this.module.code = module.code;    
		this.module.name = module.name;    
		this.module.applicationId = module.applicationId;
		this.module.applicationItem = module.applicationItem;
		this.module.moduleId = module.moduleId;
		this.module.moduleItem = module.moduleItem;
		this.validateModule();
    }

    isFormValid() {
        return this.isModuleFormValid;
    }

    validateModule() {

    }

    clear() {

			this.module.code = '';    
			this.module.name = '';    

			this.module.applicationId = null;
			this.module.applicationItem = null;
			this.module.moduleId = null;
			this.module.moduleItem = null;
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

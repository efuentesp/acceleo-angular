import { Injectable }                              from '@angular/core';
import { environment }                             from "../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Parentesco }                           from '../parentesco/parentesco.component.model';

@Injectable()
export class ParentescoService {

    private isParentescoFormValid: boolean = false;
    private env: any = environment;
    private parentesco = new Parentesco();

    constructor(private http: Http) {
    }

    getAllParentesco(){
      return this.http.get(this.env.api + "/parentesco").map(res => res.json()).catch(ParentescoService.handleError);
    }

    resetParentesco(): Parentesco {
        this.clear();
        return this.parentesco;
    }

    getParentesco(): Parentesco {
        var parentesco: Parentesco = {
					conyuge: this.parentesco.conyuge, 
					ascendiente: this.parentesco.ascendiente, 
					hijo: this.parentesco.hijo, 
					
					parentescoId: this.parentesco.parentescoId	

        };
        return parentesco;
    }

    setParentesco(parentesco: Parentesco) {
       
	this.isParentescoFormValid = true;
			this.parentesco.conyuge = parentesco.conyuge;    
			this.parentesco.ascendiente = parentesco.ascendiente;    
			this.parentesco.hijo = parentesco.hijo;    
			this.parentesco.parentescoId        = parentesco.parentescoId;
        	this.validateParentesco();
    }

    isFormValid() {
        return this.isParentescoFormValid;
    }

    validateParentesco() {

    }

    clear() {

			this.parentesco.conyuge = '';    
			this.parentesco.ascendiente = '';    
			this.parentesco.hijo = '';    
			this.parentesco.parentescoId = null;
    }

    saveParentesco(parentesco){

		if (!parentesco.parentescoId){
            return this.http.post(this.env.api + "/parentesco", parentesco).map(res => res);
        }else{
            return this.http.put(this.env.api + "/parentesco/"+parentesco.parentescoId, parentesco).map(res => res);
        }
     
    }

	private static handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
        if (error.status === 404) {
            errMsg = 'Resource was not found';
        } else {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = 'Error';
        }
    } else {
        errMsg = error.message ? error.message : error.toString();
    }

    return Observable.throw(errMsg);
    }
}

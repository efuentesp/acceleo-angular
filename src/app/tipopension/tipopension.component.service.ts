import { Injectable }                              from '@angular/core';
import { environment }                             from "../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Tipopension }                           from '../tipopension/tipopension.component.model';

@Injectable()
export class TipopensionService {

    private isTipopensionFormValid: boolean = false;
    private env: any = environment;
    private tipopension = new Tipopension();

    constructor(private http: Http) {
    }

    getAllTipopension(){
      return this.http.get(this.env.api + "/tipopension").map(res => res.json()).catch(TipopensionService.handleError);
    }

    resetTipopension(): Tipopension {
        this.clear();
        return this.tipopension;
    }

    getTipopension(): Tipopension {
        var tipopension: Tipopension = {
					nombre: this.tipopension.nombre, 
					clave: this.tipopension.clave, 
					
					tipopensionId: this.tipopension.tipopensionId	

        };
        return tipopension;
    }

    setTipopension(tipopension: Tipopension) {
       
	this.isTipopensionFormValid = true;
			this.tipopension.nombre = tipopension.nombre;    
			this.tipopension.clave = tipopension.clave;    
			this.tipopension.tipopensionId        = tipopension.tipopensionId;
        	this.validateTipopension();
    }

    isFormValid() {
        return this.isTipopensionFormValid;
    }

    validateTipopension() {

    }

    clear() {

			this.tipopension.nombre = '';    
			this.tipopension.clave = '';    
			this.tipopension.tipopensionId = null;
    }

    saveTipopension(tipopension){

		if (!tipopension.tipopensionId){
            return this.http.post(this.env.api + "/tipopension", tipopension).map(res => res);
        }else{
            return this.http.put(this.env.api + "/tipopension/"+tipopension.tipopensionId, tipopension).map(res => res);
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

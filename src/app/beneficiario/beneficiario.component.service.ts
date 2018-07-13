import { Injectable }                              from '@angular/core';
import { environment }                             from "../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Beneficiario }                           from '../beneficiario/beneficiario.component.model';

@Injectable()
export class BeneficiarioService {

    private isBeneficiarioFormValid: boolean = false;
    private env: any = environment;
    private beneficiario = new Beneficiario();

    constructor(private http: Http) {
    }

    getAllBeneficiario(){
      return this.http.get(this.env.api + "/beneficiario").map(res => res.json()).catch(BeneficiarioService.handleError);
    }

    resetBeneficiario(): Beneficiario {
        this.clear();
        return this.beneficiario;
    }

    getBeneficiario(): Beneficiario {
        var beneficiario: Beneficiario = {
					apellido_materno: this.beneficiario.apellido_materno, 
					curp: this.beneficiario.curp, 
					fecha_nacimiento: this.beneficiario.fecha_nacimiento, 
					nombre: this.beneficiario.nombre, 
					apellido_paterno: this.beneficiario.apellido_paterno, 
					
					parentescoId: this.beneficiario.parentescoId,
					beneficiarioId: this.beneficiario.beneficiarioId	

        };
        return beneficiario;
    }

    setBeneficiario(beneficiario: Beneficiario) {
       
	this.isBeneficiarioFormValid = true;
			this.beneficiario.apellido_materno = beneficiario.apellido_materno;    
			this.beneficiario.curp = beneficiario.curp;    
			this.beneficiario.fecha_nacimiento = beneficiario.fecha_nacimiento;    
			this.beneficiario.nombre = beneficiario.nombre;    
			this.beneficiario.apellido_paterno = beneficiario.apellido_paterno;    
			this.beneficiario.parentescoId = beneficiario.parentescoId;
			this.beneficiario.beneficiarioId        = beneficiario.beneficiarioId;
        	this.validateBeneficiario();
    }

    isFormValid() {
        return this.isBeneficiarioFormValid;
    }

    validateBeneficiario() {

    }

    clear() {

			this.beneficiario.apellido_materno = '';    
			this.beneficiario.curp = '';    
			this.beneficiario.fecha_nacimiento = '';    
			this.beneficiario.nombre = '';    
			this.beneficiario.apellido_paterno = '';    
			this.beneficiario.parentescoId = null;
			this.beneficiario.beneficiarioId = null;
    }

    saveBeneficiario(beneficiario){

		if (!beneficiario.beneficiarioId){
            return this.http.post(this.env.api + "/beneficiario", beneficiario).map(res => res);
        }else{
            return this.http.put(this.env.api + "/beneficiario/"+beneficiario.beneficiarioId, beneficiario).map(res => res);
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

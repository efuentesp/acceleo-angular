import { Injectable }                              from '@angular/core';
import { environment }                             from "../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Solicitudpension }                           from '../solicitudpension/solicitudpension.component.model';

@Injectable()
export class SolicitudpensionService {

    private isSolicitudpensionFormValid: boolean = false;
    private env: any = environment;
    private solicitudpension = new Solicitudpension();

    constructor(private http: Http) {
    }

    getAllSolicitudpension(){
      return this.http.get(this.env.api + "/solicitudpension").map(res => res.json()).catch(SolicitudpensionService.handleError);
    }

    resetSolicitudpension(): Solicitudpension {
        this.clear();
        return this.solicitudpension;
    }

    getSolicitudpension(): Solicitudpension {
        var solicitudpension: Solicitudpension = {
					numero: this.solicitudpension.numero, 
					observaciones: this.solicitudpension.observaciones, 
					fecha_solicitud: this.solicitudpension.fecha_solicitud, 
					
					afiliadoId: this.solicitudpension.afiliadoId,
					tipopensionId: this.solicitudpension.tipopensionId,
					solicitudpensionId: this.solicitudpension.solicitudpensionId	

        };
        return solicitudpension;
    }

    setSolicitudpension(solicitudpension: Solicitudpension) {
       
	this.isSolicitudpensionFormValid = true;
			this.solicitudpension.numero = solicitudpension.numero;    
			this.solicitudpension.observaciones = solicitudpension.observaciones;    
			this.solicitudpension.fecha_solicitud = solicitudpension.fecha_solicitud;    
			this.solicitudpension.afiliadoId = solicitudpension.afiliadoId;
			this.solicitudpension.tipopensionId = solicitudpension.tipopensionId;
			this.solicitudpension.solicitudpensionId        = solicitudpension.solicitudpensionId;
        	this.validateSolicitudpension();
    }

    isFormValid() {
        return this.isSolicitudpensionFormValid;
    }

    validateSolicitudpension() {

    }

    clear() {

			this.solicitudpension.numero = '';    
			this.solicitudpension.observaciones = '';    
			this.solicitudpension.fecha_solicitud = '';    
			this.solicitudpension.afiliadoId = null;
			this.solicitudpension.tipopensionId = null;
			this.solicitudpension.solicitudpensionId = null;
    }

    saveSolicitudpension(solicitudpension){

		if (!solicitudpension.solicitudpensionId){
            return this.http.post(this.env.api + "/solicitudpension", solicitudpension).map(res => res);
        }else{
            return this.http.put(this.env.api + "/solicitudpension/"+solicitudpension.solicitudpensionId, solicitudpension).map(res => res);
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

import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Solicitud }                           from '../solicitud/solicitud.component.model';
import { User } from '../user/user.component.model';
import { UserStorageComponent } from '../user/user-storage.component';

@Injectable()
export class SolicitudService {

    private isSolicitudFormValid: boolean = false;
    private env: any = environment;
    private solicitud = new Solicitud();
    private flag :boolean = false;
    private flagDelete :boolean = false;
    private storage: UserStorageComponent;

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getAllSolicitud(){
		let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/solicitud", opts).pipe(map(res => res.json()));
    }

    saveSolicitud(solicitud){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

        console.log('Solicitud', solicitud);

		if (!solicitud.solicitudId){
            return this.http.post(this.env.api + "/solicitud", solicitud, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/solicitud/"+ solicitud.solicitudId, solicitud, opts).pipe(map(res => res));
        }
    }

    deleteSolicitud(solicitud){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/solicitud/"+solicitud.solicitudId, opts).pipe(map(res => res));
    }

    getSolicitudById(solicitudId){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/idsolicitud/"+solicitudId, opts).pipe(map(res => res.json()));
    }

    resetSolicitud(): Solicitud {
        this.clear();
        return this.solicitud;
    }

    getSolicitud(): Solicitud {
        var solicitud: Solicitud = {
		
		posicionId: this.solicitud.posicionId,
		posicionItem: this.solicitud.posicionItem,
		
		candidatoId: this.solicitud.candidatoId,
		candidatoItem: this.solicitud.candidatoItem,
		fecha: this.solicitud.fecha,
		salario: this.solicitud.salario,
		correo: this.solicitud.correo,
		telefono: this.solicitud.telefono,
		
			estatussolicitudId: this.solicitud.estatussolicitudId,
			estatussolicitudItem: this.solicitud.estatussolicitudItem,
		solicitudId: this.solicitud.solicitudId,
		solicitudItem: this.solicitud.solicitudItem	
		
        };
        return solicitud;
    }

setSolicitud(solicitud: Solicitud) {
       
        this.isSolicitudFormValid = true;
this.solicitud.posicionId = solicitud.posicionId;
this.solicitud.posicionItem = solicitud.posicionItem;
this.solicitud.candidatoId = solicitud.candidatoId;
this.solicitud.candidatoItem = solicitud.candidatoItem;
this.solicitud.fecha = solicitud.fecha;
this.solicitud.salario = solicitud.salario;
this.solicitud.correo = solicitud.correo;
this.solicitud.telefono = solicitud.telefono;
this.solicitud.estatussolicitudId = solicitud.estatussolicitudId;
this.solicitud.estatussolicitudItem = solicitud.estatussolicitudItem;
        
		this.solicitud.solicitudId = solicitud.solicitudId;
		this.solicitud.solicitudItem = solicitud.solicitudItem;
		
		this.validateSolicitud();
    }

    isFormValid() {
        return this.isSolicitudFormValid;
    }

    validateSolicitud() {

    }

    clear() {
			
			this.solicitud.posicionId = null;
			this.solicitud.posicionItem = null;
			
			this.solicitud.candidatoId = null;
			this.solicitud.candidatoItem = null;
			this.solicitud.fecha = null; 
			this.solicitud.salario = null; 
			this.solicitud.correo = ''; 
			this.solicitud.telefono = ''; 
			
			this.solicitud.estatussolicitudId = null;
			this.solicitud.estatussolicitudItem = null;
			
    		
			this.solicitud.solicitudId = null;
			this.solicitud.solicitudItem = null;
			
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

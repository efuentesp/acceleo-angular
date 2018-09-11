import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Aportacion }                           from '../aportacion/aportacion.component.model';
import { User } from '../user/user.component.model';
import { UserStorageComponent } from '../user/user-storage.component';

@Injectable()
export class AportacionService {

    private isAportacionFormValid: boolean = false;
    private env: any = environment;
    private aportacion = new Aportacion();
    private flag :boolean = false;
    private flagDelete :boolean = false;
    private storage: UserStorageComponent;

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getAllAportacion(){
		let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/aportacion", opts).pipe(map(res => res.json()));
    }

    saveAportacion(aportacion){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

		if (!aportacion.aportacionId){
            return this.http.post(this.env.api + "/aportacion", aportacion, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/aportacion/"+ aportacion.aportacionId, aportacion, opts).pipe(map(res => res));
        }
    }

    deleteAportacion(aportacion){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/aportacion/"+aportacion.aportacionId, opts).pipe(map(res => res));
    }

    getAportacionById(aportacionId){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/idaportacion/"+aportacionId, opts).pipe(map(res => res.json()));
    }

    resetAportacion(): Aportacion {
        this.clear();
        return this.aportacion;
    }

    getAportacion(): Aportacion {
        var aportacion: Aportacion = {
		monto: this.aportacion.monto, 
		fecha: this.aportacion.fecha, 
		fechaAux: this.aportacion.fechaAux, 
		cuentadeahorroId: this.aportacion.cuentadeahorroId,
		cuentadeahorroItem: this.aportacion.cuentadeahorroItem,
		tipoaportacionId: this.aportacion.tipoaportacionId,
		tipoaportacionItem: this.aportacion.tipoaportacionItem,
		aportacionId: this.aportacion.aportacionId,
		aportacionItem: this.aportacion.aportacionItem	
        };
        return aportacion;
    }

setAportacion(aportacion: Aportacion) {
       
		this.isAportacionFormValid = true;
		this.aportacion.monto = aportacion.monto;  
		this.aportacion.fecha = aportacion.fecha;  
		this.aportacion.fechaAux = aportacion.fechaAux;  
		this.aportacion.cuentadeahorroId = aportacion.cuentadeahorroId;
		this.aportacion.cuentadeahorroItem = aportacion.cuentadeahorroItem;
		this.aportacion.tipoaportacionId = aportacion.tipoaportacionId;
		this.aportacion.tipoaportacionItem = aportacion.tipoaportacionItem;
		this.aportacion.aportacionId = aportacion.aportacionId;
		this.aportacion.aportacionItem = aportacion.aportacionItem;
		this.validateAportacion();
    }

    isFormValid() {
        return this.isAportacionFormValid;
    }

    validateAportacion() {

    }

    clear() {

			this.aportacion.monto = '';  
			this.aportacion.fecha = '';  
			this.aportacion.fechaAux = null;    

			this.aportacion.cuentadeahorroId = null;
			this.aportacion.cuentadeahorroItem = null;
			this.aportacion.tipoaportacionId = null;
			this.aportacion.tipoaportacionItem = null;
			this.aportacion.aportacionId = null;
			this.aportacion.aportacionItem = null;
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

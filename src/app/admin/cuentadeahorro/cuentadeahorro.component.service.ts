import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Cuentadeahorro }                           from '../cuentadeahorro/cuentadeahorro.component.model';
import { User } from '../user/user.component.model';
import { UserStorageComponent } from '../user/user-storage.component';

@Injectable()
export class CuentadeahorroService {

    private isCuentadeahorroFormValid: boolean = false;
    private env: any = environment;
    private cuentadeahorro = new Cuentadeahorro();
    private flag :boolean = false;
    private flagDelete :boolean = false;
    private storage: UserStorageComponent;

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getAllCuentadeahorro(){
		let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/cuentadeahorro", opts).pipe(map(res => res.json()));
    }

    saveCuentadeahorro(cuentadeahorro){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

		if (!cuentadeahorro.cuentadeahorroId){
            return this.http.post(this.env.api + "/cuentadeahorro", cuentadeahorro, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/cuentadeahorro/"+ cuentadeahorro.cuentadeahorroId, cuentadeahorro, opts).pipe(map(res => res));
        }
    }

    deleteCuentadeahorro(cuentadeahorro){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/cuentadeahorro/"+cuentadeahorro.cuentadeahorroId, opts).pipe(map(res => res));
    }

    getCuentadeahorroById(cuentadeahorroId){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/idcuentadeahorro/"+cuentadeahorroId, opts).pipe(map(res => res.json()));
    }

    resetCuentadeahorro(): Cuentadeahorro {
        this.clear();
        return this.cuentadeahorro;
    }

    getCuentadeahorro(): Cuentadeahorro {
        var cuentadeahorro: Cuentadeahorro = {
		numero: this.cuentadeahorro.numero, 
		fechacontratacion: this.cuentadeahorro.fechacontratacion, 
		fechadisponibilidad: this.cuentadeahorro.fechadisponibilidad, 
		fechavencimiento: this.cuentadeahorro.fechavencimiento, 
		tipoahorroId: this.cuentadeahorro.tipoahorroId,
		tipoahorroItem: this.cuentadeahorro.tipoahorroItem,
		cuentadeahorroId: this.cuentadeahorro.cuentadeahorroId,
		cuentadeahorroItem: this.cuentadeahorro.cuentadeahorroItem	
        };
        return cuentadeahorro;
    }

setCuentadeahorro(cuentadeahorro: Cuentadeahorro) {
       
		this.isCuentadeahorroFormValid = true;
		this.cuentadeahorro.numero = cuentadeahorro.numero;    
		this.cuentadeahorro.fechacontratacion = cuentadeahorro.fechacontratacion;    
		this.cuentadeahorro.fechadisponibilidad = cuentadeahorro.fechadisponibilidad;    
		this.cuentadeahorro.fechavencimiento = cuentadeahorro.fechavencimiento;    
		this.cuentadeahorro.tipoahorroId = cuentadeahorro.tipoahorroId;
		this.cuentadeahorro.cuentadeahorroId = cuentadeahorro.cuentadeahorroId;
		this.cuentadeahorro.cuentadeahorroItem = cuentadeahorro.cuentadeahorroItem;
		this.validateCuentadeahorro();
    }

    isFormValid() {
        return this.isCuentadeahorroFormValid;
    }

    validateCuentadeahorro() {

    }

    clear() {

			this.cuentadeahorro.numero = null;    
			this.cuentadeahorro.fechacontratacion = '';    
			this.cuentadeahorro.fechadisponibilidad = '';    
			this.cuentadeahorro.fechavencimiento = '';    

			this.cuentadeahorro.tipoahorroId = null;
			this.cuentadeahorro.tipoahorroItem = null;
			this.cuentadeahorro.cuentadeahorroId = null;
			this.cuentadeahorro.cuentadeahorroItem = null;
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

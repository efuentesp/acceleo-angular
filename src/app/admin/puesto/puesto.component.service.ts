import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Puesto }                           from '../puesto/puesto.component.model';
import { User } from '../user/user.component.model';
import { UserStorageComponent } from '../user/user-storage.component';

@Injectable()
export class PuestoService {

    private isPuestoFormValid: boolean = false;
    private env: any = environment;
    private puesto = new Puesto();
    private flag :boolean = false;
    private flagDelete :boolean = false;
    private storage: UserStorageComponent;

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getAllPuesto(){
		let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/puesto", opts).pipe(map(res => res.json()));
    }

    savePuesto(puesto){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

        console.log('Puesto', puesto);

		if (!puesto.puestoId){
            return this.http.post(this.env.api + "/puesto", puesto, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/puesto/"+ puesto.puestoId, puesto, opts).pipe(map(res => res));
        }
    }

    deletePuesto(puesto){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/puesto/"+puesto.puestoId, opts).pipe(map(res => res));
    }

    getPuestoById(puestoId){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/idpuesto/"+puestoId, opts).pipe(map(res => res.json()));
    }


    resetPuesto(): Puesto {
        this.clear();
        return this.puesto;
    }

    getPuesto(): Puesto {
        var puesto: Puesto = {
		puestosId: this.puesto.puestosId,
		puestosItem: this.puesto.puestosItem,
		descripcion: this.puesto.descripcion,
		puestoId: this.puesto.puestoId,
		puestoItem: this.puesto.puestoItem	
		
        };
        return puesto;
    }

setPuesto(puesto: Puesto) {
       
        this.isPuestoFormValid = true;
this.puesto.puestosId = puesto.puestosId;
this.puesto.puestosItem = puesto.puestosItem;
this.puesto.descripcion = puesto.descripcion;
        
		this.puesto.puestoId = puesto.puestoId;
		this.puesto.puestoItem = puesto.puestoItem;
		
		this.validatePuesto();
    }

    isFormValid() {
        return this.isPuestoFormValid;
    }

    validatePuesto() {

    }

    clear() {
			
			this.puesto.puestosId = null;
			this.puesto.puestosItem = null;
			this.puesto.descripcion = ''; 
    		
			this.puesto.puestoId = null;
			this.puesto.puestoItem = null;
			
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

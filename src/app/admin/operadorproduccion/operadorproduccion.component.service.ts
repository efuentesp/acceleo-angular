import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Operadorproduccion }                           from '../operadorproduccion/operadorproduccion.component.model';
import { User } from '../user/user.component.model';
import { UserStorageComponent } from '../user/user-storage.component';

@Injectable()
export class OperadorproduccionService {

    private isOperadorproduccionFormValid: boolean = false;
    private env: any = environment;
    private operadorproduccion = new Operadorproduccion();
    private flag :boolean = false;
    private flagDelete :boolean = false;
    private storage: UserStorageComponent;

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getAllOperadorproduccion(){
		let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/operadorproduccion", opts).pipe(map(res => res.json()));
    }

    saveOperadorproduccion(operadorproduccion){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

		if (!operadorproduccion.operadorproduccionId){
            return this.http.post(this.env.api + "/operadorproduccion", operadorproduccion, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/operadorproduccion/"+ operadorproduccion.operadorproduccionId, operadorproduccion, opts).pipe(map(res => res));
        }
    }

    deleteOperadorproduccion(operadorproduccion){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/operadorproduccion/"+operadorproduccion.operadorproduccionId, opts).pipe(map(res => res));
    }

    getOperadorproduccionById(operadorproduccionId){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/idoperadorproduccion/"+operadorproduccionId, opts).pipe(map(res => res.json()));
    }

    resetOperadorproduccion(): Operadorproduccion {
        this.clear();
        return this.operadorproduccion;
    }

    getOperadorproduccion(): Operadorproduccion {
        var operadorproduccion: Operadorproduccion = {
		nombre: this.operadorproduccion.nombre, 
		numeroempleado: this.operadorproduccion.numeroempleado, 
		operadorproduccionId: this.operadorproduccion.operadorproduccionId,
		operadorproduccionItem: this.operadorproduccion.operadorproduccionItem	
        };
        return operadorproduccion;
    }

setOperadorproduccion(operadorproduccion: Operadorproduccion) {
       
		this.isOperadorproduccionFormValid = true;
		this.operadorproduccion.nombre = operadorproduccion.nombre;  
		this.operadorproduccion.numeroempleado = operadorproduccion.numeroempleado;  
		this.operadorproduccion.operadorproduccionId = operadorproduccion.operadorproduccionId;
		this.operadorproduccion.operadorproduccionItem = operadorproduccion.operadorproduccionItem;
		this.validateOperadorproduccion();
    }

    isFormValid() {
        return this.isOperadorproduccionFormValid;
    }

    validateOperadorproduccion() {

    }

    clear() {

			this.operadorproduccion.nombre = '';    
			this.operadorproduccion.numeroempleado = null;    

			this.operadorproduccion.operadorproduccionId = null;
			this.operadorproduccion.operadorproduccionItem = null;
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

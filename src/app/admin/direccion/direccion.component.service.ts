import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Direccion }                           from '../direccion/direccion.component.model';
import { User } from '../user/user.component.model';
import { UserStorageComponent } from '../user/user-storage.component';

@Injectable()
export class DireccionService {

    private isDireccionFormValid: boolean = false;
    private env: any = environment;
    private direccion = new Direccion();
    private flag :boolean = false;
    private flagDelete :boolean = false;
    private storage: UserStorageComponent;

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getAllDireccion(){
		let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/direccion", opts).pipe(map(res => res.json()));
    }

    saveDireccion(direccion){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

		if (!direccion.direccionId){
            return this.http.post(this.env.api + "/direccion", direccion, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/direccion/"+ direccion.direccionId, direccion, opts).pipe(map(res => res));
        }
    }

    deleteDireccion(direccion){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/direccion/"+direccion.direccionId, opts).pipe(map(res => res));
    }

    getDireccionById(direccionId){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/iddireccion/"+direccionId, opts).pipe(map(res => res.json()));
    }

    resetDireccion(): Direccion {
        this.clear();
        return this.direccion;
    }

    getDireccion(): Direccion {
        var direccion: Direccion = {
		cp: this.direccion.cp, 
		ciudad: this.direccion.ciudad, 
		calle: this.direccion.calle, 
		estado: this.direccion.estado, 
		candidatoId: this.direccion.candidatoId,
		candidatoItem: this.direccion.candidatoItem,
		direccionId: this.direccion.direccionId,
		direccionItem: this.direccion.direccionItem	
        };
        return direccion;
    }

setDireccion(direccion: Direccion) {
       
		this.isDireccionFormValid = true;
		this.direccion.cp = direccion.cp;  
		this.direccion.ciudad = direccion.ciudad;  
		this.direccion.calle = direccion.calle;  
		this.direccion.estado = direccion.estado;  
		this.direccion.candidatoId = direccion.candidatoId;
		this.direccion.candidatoItem = direccion.candidatoItem;
		this.direccion.direccionId = direccion.direccionId;
		this.direccion.direccionItem = direccion.direccionItem;
		this.validateDireccion();
    }

    isFormValid() {
        return this.isDireccionFormValid;
    }

    validateDireccion() {

    }

    clear() {

			this.direccion.cp = '';    
			this.direccion.ciudad = '';    
			this.direccion.calle = '';    
			this.direccion.estado = '';    

			this.direccion.candidatoId = null;
			this.direccion.candidatoItem = null;
			this.direccion.direccionId = null;
			this.direccion.direccionItem = null;
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

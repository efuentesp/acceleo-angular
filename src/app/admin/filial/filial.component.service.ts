import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Filial }                           from '../filial/filial.component.model';
import { User } from '../user/user.component.model';
import { UserStorageComponent } from '../user/user-storage.component';

@Injectable()
export class FilialService {

    private isFilialFormValid: boolean = false;
    private env: any = environment;
    private filial = new Filial();
    private flag :boolean = false;
    private flagDelete :boolean = false;
    private storage: UserStorageComponent;

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getAllFilial(){
		let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/filial", opts).pipe(map(res => res.json()));
    }

    saveFilial(filial){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

        console.log('Filial', filial);

		if (!filial.filialId){
            return this.http.post(this.env.api + "/filial", filial, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/filial/"+ filial.filialId, filial, opts).pipe(map(res => res));
        }
    }

    deleteFilial(filial){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/filial/"+filial.filialId, opts).pipe(map(res => res));
    }

    getFilialById(filialId){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/idfilial/"+filialId, opts).pipe(map(res => res.json()));
    }

    resetFilial(): Filial {
        this.clear();
        return this.filial;
    }

    getFilial(): Filial {
        var filial: Filial = {
		nombre: this.filial.nombre,
		ubicacion: this.filial.ubicacion,
		ciudad: this.filial.ciudad,
		estado: this.filial.estado,
		telefono: this.filial.telefono,
		sitio: this.filial.sitio,
		contacto: this.filial.contacto,
		notas: this.filial.notas,
		filialId: this.filial.filialId,
		filialItem: this.filial.filialItem	
		
        };
        return filial;
    }

setFilial(filial: Filial) {
       
        this.isFilialFormValid = true;
this.filial.nombre = filial.nombre;
this.filial.ubicacion = filial.ubicacion;
this.filial.ciudad = filial.ciudad;
this.filial.estado = filial.estado;
this.filial.telefono = filial.telefono;
this.filial.sitio = filial.sitio;
this.filial.contacto = filial.contacto;
this.filial.notas = filial.notas;
        
		this.filial.filialId = filial.filialId;
		this.filial.filialItem = filial.filialItem;
		
		this.validateFilial();
    }

    isFormValid() {
        return this.isFilialFormValid;
    }

    validateFilial() {

    }

    clear() {
			this.filial.nombre = ''; 
			this.filial.ubicacion = ''; 
			this.filial.ciudad = ''; 
			this.filial.estado = ''; 
			this.filial.telefono = ''; 
			this.filial.sitio = ''; 
			this.filial.contacto = ''; 
			this.filial.notas = ''; 
    		
			this.filial.filialId = null;
			this.filial.filialItem = null;
			
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
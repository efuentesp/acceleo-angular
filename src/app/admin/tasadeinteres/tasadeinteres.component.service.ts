import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Tasadeinteres }                           from '../tasadeinteres/tasadeinteres.component.model';
import { User } from '../user/user.component.model';
import { UserStorageComponent } from '../user/user-storage.component';

@Injectable()
export class TasadeinteresService {

    private isTasadeinteresFormValid: boolean = false;
    private env: any = environment;
    private tasadeinteres = new Tasadeinteres();
    private flag :boolean = false;
    private flagDelete :boolean = false;
    private storage: UserStorageComponent;

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getAllTasadeinteres(){
		let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/tasadeinteres", opts).pipe(map(res => res.json()));
    }

    saveTasadeinteres(tasadeinteres){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

		if (!tasadeinteres.tasadeinteresId){
            return this.http.post(this.env.api + "/tasadeinteres", tasadeinteres, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/tasadeinteres/"+ tasadeinteres.tasadeinteresId, tasadeinteres, opts).pipe(map(res => res));
        }
    }

    deleteTasadeinteres(tasadeinteres){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/tasadeinteres/"+tasadeinteres.tasadeinteresId, opts).pipe(map(res => res));
    }

    getTasadeinteresById(tasadeinteresId){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/idtasadeinteres/"+tasadeinteresId, opts).pipe(map(res => res.json()));
    }

    resetTasadeinteres(): Tasadeinteres {
        this.clear();
        return this.tasadeinteres;
    }

    getTasadeinteres(): Tasadeinteres {
        var tasadeinteres: Tasadeinteres = {
		fechafin: this.tasadeinteres.fechafin, 
		fechafinAux: this.tasadeinteres.fechafinAux, 
		tasa: this.tasadeinteres.tasa, 
		fechainicio: this.tasadeinteres.fechainicio, 
		fechainicioAux: this.tasadeinteres.fechainicioAux, 
		empresaId: this.tasadeinteres.empresaId,
		empresaItem: this.tasadeinteres.empresaItem,
		tasadeinteresId: this.tasadeinteres.tasadeinteresId,
		tasadeinteresItem: this.tasadeinteres.tasadeinteresItem	
        };
        return tasadeinteres;
    }

setTasadeinteres(tasadeinteres: Tasadeinteres) {
       
		this.isTasadeinteresFormValid = true;
		this.tasadeinteres.fechafin = tasadeinteres.fechafin;  
		this.tasadeinteres.fechafinAux = tasadeinteres.fechafinAux;  
		this.tasadeinteres.tasa = tasadeinteres.tasa;  
		this.tasadeinteres.fechainicio = tasadeinteres.fechainicio;  
		this.tasadeinteres.fechainicioAux = tasadeinteres.fechainicioAux;  
		this.tasadeinteres.empresaId = tasadeinteres.empresaId;
		this.tasadeinteres.empresaItem = tasadeinteres.empresaItem;
		this.tasadeinteres.tasadeinteresId = tasadeinteres.tasadeinteresId;
		this.tasadeinteres.tasadeinteresItem = tasadeinteres.tasadeinteresItem;
		this.validateTasadeinteres();
    }

    isFormValid() {
        return this.isTasadeinteresFormValid;
    }

    validateTasadeinteres() {

    }

    clear() {

			this.tasadeinteres.fechafin = '';  
			this.tasadeinteres.fechafinAux = null;    
			this.tasadeinteres.tasa = '';  
			this.tasadeinteres.fechainicio = '';  
			this.tasadeinteres.fechainicioAux = null;    

			this.tasadeinteres.empresaId = null;
			this.tasadeinteres.empresaItem = null;
			this.tasadeinteres.tasadeinteresId = null;
			this.tasadeinteres.tasadeinteresItem = null;
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

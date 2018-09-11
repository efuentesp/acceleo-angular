import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Departamento }                           from '../departamento/departamento.component.model';
import { User } from '../user/user.component.model';
import { UserStorageComponent } from '../user/user-storage.component';

@Injectable()
export class DepartamentoService {

    private isDepartamentoFormValid: boolean = false;
    private env: any = environment;
    private departamento = new Departamento();
    private flag :boolean = false;
    private flagDelete :boolean = false;
    private storage: UserStorageComponent;

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getAllDepartamento(){
		let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/departamento", opts).pipe(map(res => res.json()));
    }

    saveDepartamento(departamento){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

		if (!departamento.departamentoId){
            return this.http.post(this.env.api + "/departamento", departamento, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/departamento/"+ departamento.departamentoId, departamento, opts).pipe(map(res => res));
        }
    }

    deleteDepartamento(departamento){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/departamento/"+departamento.departamentoId, opts).pipe(map(res => res));
    }

    getDepartamentoById(departamentoId){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/iddepartamento/"+departamentoId, opts).pipe(map(res => res.json()));
    }

    resetDepartamento(): Departamento {
        this.clear();
        return this.departamento;
    }

    getDepartamento(): Departamento {
        var departamento: Departamento = {
		nombredepto: this.departamento.nombredepto, 
		representante: this.departamento.representante, 
		empresaId: this.departamento.empresaId,
		empresaItem: this.departamento.empresaItem,
		departamentoId: this.departamento.departamentoId,
		departamentoItem: this.departamento.departamentoItem	
        };
        return departamento;
    }

setDepartamento(departamento: Departamento) {
       
		this.isDepartamentoFormValid = true;
		this.departamento.nombredepto = departamento.nombredepto;  
		this.departamento.representante = departamento.representante;  
		this.departamento.empresaId = departamento.empresaId;
		this.departamento.empresaItem = departamento.empresaItem;
		this.departamento.departamentoId = departamento.departamentoId;
		this.departamento.departamentoItem = departamento.departamentoItem;
		this.validateDepartamento();
    }

    isFormValid() {
        return this.isDepartamentoFormValid;
    }

    validateDepartamento() {

    }

    clear() {

			this.departamento.nombredepto = '';    
			this.departamento.representante = '';    

			this.departamento.empresaId = null;
			this.departamento.empresaItem = null;
			this.departamento.departamentoId = null;
			this.departamento.departamentoItem = null;
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

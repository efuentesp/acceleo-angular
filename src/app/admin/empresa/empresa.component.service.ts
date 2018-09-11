import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Empresa }                           from '../empresa/empresa.component.model';
import { User } from '../user/user.component.model';
import { UserStorageComponent } from '../user/user-storage.component';

@Injectable()
export class EmpresaService {

    private isEmpresaFormValid: boolean = false;
    private env: any = environment;
    private empresa = new Empresa();
    private flag :boolean = false;
    private flagDelete :boolean = false;
    private storage: UserStorageComponent;

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getAllEmpresa(){
		let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/empresa", opts).pipe(map(res => res.json()));
    }

    saveEmpresa(empresa){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

		if (!empresa.empresaId){
            return this.http.post(this.env.api + "/empresa", empresa, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/empresa/"+ empresa.empresaId, empresa, opts).pipe(map(res => res));
        }
    }

    deleteEmpresa(empresa){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/empresa/"+empresa.empresaId, opts).pipe(map(res => res));
    }

    getEmpresaById(empresaId){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/idempresa/"+empresaId, opts).pipe(map(res => res.json()));
    }

    resetEmpresa(): Empresa {
        this.clear();
        return this.empresa;
    }

    getEmpresa(): Empresa {
        var empresa: Empresa = {
		razonsocial: this.empresa.razonsocial, 
		clave: this.empresa.clave, 
		nombrecorto: this.empresa.nombrecorto, 
		empresaId: this.empresa.empresaId,
		empresaItem: this.empresa.empresaItem	
        };
        return empresa;
    }

setEmpresa(empresa: Empresa) {
       
		this.isEmpresaFormValid = true;
		this.empresa.razonsocial = empresa.razonsocial;  
		this.empresa.clave = empresa.clave;  
		this.empresa.nombrecorto = empresa.nombrecorto;  
		this.empresa.empresaId = empresa.empresaId;
		this.empresa.empresaItem = empresa.empresaItem;
		this.validateEmpresa();
    }

    isFormValid() {
        return this.isEmpresaFormValid;
    }

    validateEmpresa() {

    }

    clear() {

			this.empresa.razonsocial = '';    
			this.empresa.clave = '';    
			this.empresa.nombrecorto = '';    

			this.empresa.empresaId = null;
			this.empresa.empresaItem = null;
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

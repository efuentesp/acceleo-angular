import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Rol }                           from '../rol/rol.component.model';
import { User } from '../user/user.component.model';
import { UserStorageComponent } from '../user/user-storage.component';

@Injectable()
export class RolService {

    private isRolFormValid: boolean = false;
    private env: any = environment;
    private rol = new Rol();
    private flag :boolean = false;
    private flagDelete :boolean = false;
    private storage: UserStorageComponent;

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getAllRol(){
		let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/rol", opts).pipe(map(res => res.json()));
    }

    saveRol(rol){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

        console.log('Rol', rol);

		if (!rol.rolId){
            return this.http.post(this.env.api + "/rol", rol, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/rol/"+ rol.rolId, rol, opts).pipe(map(res => res));
        }
    }

    deleteRol(rol){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/rol/"+rol.rolId, opts).pipe(map(res => res));
    }

    getRolById(rolId){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/idrol/"+rolId, opts).pipe(map(res => res.json()));
    }

    resetRol(): Rol {
        this.clear();
        return this.rol;
    }

    getRol(): Rol {
        var rol: Rol = {
		clave: this.rol.clave,	
		nombre: this.rol.nombre,
		activo: this.rol.activo,	
		rolId: this.rol.rolId,
		rolItem: this.rol.rolItem	
		
        };
        return rol;
    }

setRol(rol: Rol) {
       
        this.isRolFormValid = true;
this.rol.clave = rol.clave;
this.rol.nombre = rol.nombre;
this.rol.activo = rol.activo;
        
		this.rol.rolId = rol.rolId;
		this.rol.rolItem = rol.rolItem;
		
		this.validateRol();
    }

    isFormValid() {
        return this.isRolFormValid;
    }

    validateRol() {

    }

    clear() {
			this.rol.clave = null; 
			this.rol.nombre = ''; 
			this.rol.activo = null; 
    		
			this.rol.rolId = null;
			this.rol.rolItem = null;
			
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

import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Usuario }                           from '../usuario/usuario.component.model';
import { User } from '../user/user.component.model';
import { UserStorageComponent } from '../user/user-storage.component';

@Injectable()
export class UsuarioService {

    private isUsuarioFormValid: boolean = false;
    private env: any = environment;
    private usuario = new Usuario();
    private flag :boolean = false;
    private flagDelete :boolean = false;
    private storage: UserStorageComponent;

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getAllUsuario(){
		let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/usuario", opts).pipe(map(res => res.json()));
    }

    saveUsuario(usuario){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

        console.log('Usuario', usuario);

		if (!usuario.usuarioId){
            return this.http.post(this.env.api + "/usuario", usuario, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/usuario/"+ usuario.usuarioId, usuario, opts).pipe(map(res => res));
        }
    }

    deleteUsuario(usuario){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/usuario/"+usuario.usuarioId, opts).pipe(map(res => res));
    }

    getUsuarioById(usuarioId){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/idusuario/"+usuarioId, opts).pipe(map(res => res.json()));
    }

  	getAllUsuarioByRol(rolId){
  	        let headers = new Headers;
  	        headers.append('Content-Type','application/json');
  	        headers.append('Authorization','Bearer ' + this.user.token+'');
  	        let opts = new RequestOptions({ headers: headers });
  	        return this.http.get(this.env.api + "/usuario/rol/"+rolId, opts).pipe(map(res => res.json()));
  	    }

    resetUsuario(): Usuario {
        this.clear();
        return this.usuario;
    }

    getUsuario(): Usuario {
        var usuario: Usuario = {
		nombreclave: this.usuario.nombreclave,
		password: this.usuario.password,
		activo: this.usuario.activo,	
		rol: this.usuario.rol,
		rolId: this.usuario.rolId,
		rolItem: this.usuario.rolItem,
		usuarioId: this.usuario.usuarioId,
		usuarioItem: this.usuario.usuarioItem	
		
        };
        return usuario;
    }

setUsuario(usuario: Usuario) {
       
        this.isUsuarioFormValid = true;
this.usuario.nombreclave = usuario.nombreclave;
this.usuario.password = usuario.password;
this.usuario.activo = usuario.activo;
this.usuario.rol = usuario.rol;
this.usuario.rolId = usuario.rolId;
this.usuario.rolItem = usuario.rolItem;
        
		this.usuario.usuarioId = usuario.usuarioId;
		this.usuario.usuarioItem = usuario.usuarioItem;
		
		this.validateUsuario();
    }

    isFormValid() {
        return this.isUsuarioFormValid;
    }

    validateUsuario() {

    }

    clear() {
			this.usuario.nombreclave = ''; 
			this.usuario.password = ''; 
			this.usuario.activo = null; 
			
			this.usuario.rol = null;
			this.usuario.rolId = null;
			this.usuario.rolItem = null;
    		
			this.usuario.usuarioId = null;
			this.usuario.usuarioItem = null;
			
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

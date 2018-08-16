import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Perfil }                           from '../perfil/perfil.component.model';
import { User } from '../user/user.component.model';
import { UserStorageComponent } from '../user/user-storage.component';

@Injectable()
export class PerfilService {

    private isPerfilFormValid: boolean = false;
    private env: any = environment;
    private perfil = new Perfil();
    private flag :boolean = false;
    private flagDelete :boolean = false;
    private storage: UserStorageComponent;

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getAllPerfil(){
		let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/perfil", opts).pipe(map(res => res.json()));
    }

    savePerfil(perfil){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

		if (!perfil.perfilId){
            return this.http.post(this.env.api + "/perfil", perfil, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/perfil/"+ perfil.perfilId, perfil, opts).pipe(map(res => res));
        }
    }

    deletePerfil(perfil){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/perfil/"+perfil.perfilId, opts).pipe(map(res => res));
    }

    getPerfilById(perfilId){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/idperfil/"+perfilId, opts).pipe(map(res => res.json()));
    }

    resetPerfil(): Perfil {
        this.clear();
        return this.perfil;
    }

    getPerfil(): Perfil {
        var perfil: Perfil = {
		nip: this.perfil.nip, 
		usuario: this.perfil.usuario, 
		socioId: this.perfil.socioId,
		socioItem: this.perfil.socioItem,
		perfilId: this.perfil.perfilId,
		perfilItem: this.perfil.perfilItem	
        };
        return perfil;
    }

setPerfil(perfil: Perfil) {
       
		this.isPerfilFormValid = true;
		this.perfil.nip = perfil.nip;    
		this.perfil.usuario = perfil.usuario;    
		this.perfil.socioId = perfil.socioId;
		this.perfil.socioItem = perfil.socioItem;
		this.perfil.perfilId = perfil.perfilId;
		this.perfil.perfilItem = perfil.perfilItem;
		this.validatePerfil();
    }

    isFormValid() {
        return this.isPerfilFormValid;
    }

    validatePerfil() {

    }

    clear() {

			this.perfil.nip = '';    
			this.perfil.usuario = '';    

			this.perfil.socioId = null;
			this.perfil.socioItem = null;
			this.perfil.perfilId = null;
			this.perfil.perfilItem = null;
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

import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Reclutador }                           from '../reclutador/reclutador.component.model';
import { User } from '../user/user.component.model';
import { UserStorageComponent } from '../user/user-storage.component';

@Injectable()
export class ReclutadorService {

    private isReclutadorFormValid: boolean = false;
    private env: any = environment;
    private reclutador = new Reclutador();
    private flag :boolean = false;
    private flagDelete :boolean = false;
    private storage: UserStorageComponent;

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getAllReclutador(){
		let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/reclutador", opts).pipe(map(res => res.json()));
    }

    saveReclutador(reclutador){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

        console.log('Reclutador', reclutador);

		if (!reclutador.reclutadorId){
            return this.http.post(this.env.api + "/reclutador", reclutador, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/reclutador/"+ reclutador.reclutadorId, reclutador, opts).pipe(map(res => res));
        }
    }

    deleteReclutador(reclutador){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/reclutador/"+reclutador.reclutadorId, opts).pipe(map(res => res));
    }

    getReclutadorById(reclutadorId){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/idreclutador/"+reclutadorId, opts).pipe(map(res => res.json()));
    }

    resetReclutador(): Reclutador {
        this.clear();
        return this.reclutador;
    }

    getReclutador(): Reclutador {
        var reclutador: Reclutador = {
		nombre: this.reclutador.nombre,
		apellidopaterno: this.reclutador.apellidopaterno,
		apellidomaterno: this.reclutador.apellidomaterno,
		
			generoId: this.reclutador.generoId,
			generoItem: this.reclutador.generoItem,
		reclutadorId: this.reclutador.reclutadorId,
		reclutadorItem: this.reclutador.reclutadorItem	
		
        };
        return reclutador;
    }

setReclutador(reclutador: Reclutador) {
       
        this.isReclutadorFormValid = true;
this.reclutador.nombre = reclutador.nombre;
this.reclutador.apellidopaterno = reclutador.apellidopaterno;
this.reclutador.apellidomaterno = reclutador.apellidomaterno;
this.reclutador.generoId = reclutador.generoId;
this.reclutador.generoItem = reclutador.generoItem;
        
		this.reclutador.reclutadorId = reclutador.reclutadorId;
		this.reclutador.reclutadorItem = reclutador.reclutadorItem;
		
		this.validateReclutador();
    }

    isFormValid() {
        return this.isReclutadorFormValid;
    }

    validateReclutador() {

    }

    clear() {
			this.reclutador.nombre = ''; 
			this.reclutador.apellidopaterno = ''; 
			this.reclutador.apellidomaterno = ''; 
			
			this.reclutador.generoId = null;
			this.reclutador.generoItem = null;
			
    		
			this.reclutador.reclutadorId = null;
			this.reclutador.reclutadorItem = null;
			
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

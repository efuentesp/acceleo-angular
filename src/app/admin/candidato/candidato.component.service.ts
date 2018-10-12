import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Candidato }                           from '../candidato/candidato.component.model';
import { User } from '../user/user.component.model';
import { UserStorageComponent } from '../user/user-storage.component';

@Injectable()
export class CandidatoService {

    private isCandidatoFormValid: boolean = false;
    private env: any = environment;
    private candidato = new Candidato();
    private flag :boolean = false;
    private flagDelete :boolean = false;
    private storage: UserStorageComponent;

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getAllCandidato(){
		let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/candidato", opts).pipe(map(res => res.json()));
    }

    saveCandidato(candidato){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

		if (!candidato.candidatoId){
            return this.http.post(this.env.api + "/candidato", candidato, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/candidato/"+ candidato.candidatoId, candidato, opts).pipe(map(res => res));
        }
    }

    deleteCandidato(candidato){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/candidato/"+candidato.candidatoId, opts).pipe(map(res => res));
    }

    getCandidatoById(candidatoId){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/idcandidato/"+candidatoId, opts).pipe(map(res => res.json()));
    }

    resetCandidato(): Candidato {
        this.clear();
        return this.candidato;
    }

    getCandidato(): Candidato {
        var candidato: Candidato = {
		fecha: this.candidato.fecha, 
		fechaAux: this.candidato.fechaAux, 
		apellidomaterno: this.candidato.apellidomaterno, 
		nombre: this.candidato.nombre, 
		apellidopaterno: this.candidato.apellidopaterno, 
		generoId: this.candidato.generoId,
		generoItem: this.candidato.generoItem,
		estatuscandidatoId: this.candidato.estatuscandidatoId,
		estatuscandidatoItem: this.candidato.estatuscandidatoItem,
		solicitudId: this.candidato.solicitudId,
		solicitudItem: this.candidato.solicitudItem,
		eventoId: this.candidato.eventoId,
		eventoItem: this.candidato.eventoItem,
		candidatoId: this.candidato.candidatoId,
		candidatoItem: this.candidato.candidatoItem	
        };
        return candidato;
    }

setCandidato(candidato: Candidato) {
       
		this.isCandidatoFormValid = true;
		this.candidato.fecha = candidato.fecha;  
		this.candidato.fechaAux = candidato.fechaAux;  
		this.candidato.apellidomaterno = candidato.apellidomaterno;  
		this.candidato.nombre = candidato.nombre;  
		this.candidato.apellidopaterno = candidato.apellidopaterno;  
		this.candidato.generoId = candidato.generoId;
		this.candidato.generoItem = candidato.generoItem;
		this.candidato.estatuscandidatoId = candidato.estatuscandidatoId;
		this.candidato.estatuscandidatoItem = candidato.estatuscandidatoItem;
		this.candidato.solicitudId = candidato.solicitudId;
		this.candidato.solicitudItem = candidato.solicitudItem;
		this.candidato.eventoId = candidato.eventoId;
		this.candidato.eventoItem = candidato.eventoItem;
		this.candidato.candidatoId = candidato.candidatoId;
		this.candidato.candidatoItem = candidato.candidatoItem;
		this.validateCandidato();
    }

    isFormValid() {
        return this.isCandidatoFormValid;
    }

    validateCandidato() {

    }

    clear() {

			this.candidato.fecha = null;  
			this.candidato.fechaAux = null;    
			this.candidato.apellidomaterno = '';    
			this.candidato.nombre = '';    
			this.candidato.apellidopaterno = '';    

			this.candidato.generoId = null;
			this.candidato.generoItem = null;
			this.candidato.estatuscandidatoId = null;
			this.candidato.estatuscandidatoItem = null;
			this.candidato.solicitudId = null;
			this.candidato.solicitudItem = null;
			this.candidato.eventoId = null;
			this.candidato.eventoItem = null;
			this.candidato.candidatoId = null;
			this.candidato.candidatoItem = null;
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

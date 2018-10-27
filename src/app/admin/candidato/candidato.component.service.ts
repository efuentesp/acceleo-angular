import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
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

    getAllCandidatoByCandidato(filtro){
		let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/candidato/"+filtro, opts).pipe(map(res => res.json()));
    }

    getAllCandidatoByUserName(username){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/candidato/username/"+username, opts).pipe(map(res => res.json()));
    }

    getAllCandidatoByUserNameList(username){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/candidato/username/list/"+username, opts).pipe(map(res => res.json()));
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
		nombre: this.candidato.nombre,
		apellidopaterno: this.candidato.apellidopaterno,
		apellidomaterno: this.candidato.apellidomaterno,
		fecha: this.candidato.fecha,
		fechaAux: this.candidato.fechaAux,
		generoId: this.candidato.generoId,
		generoItem: this.candidato.generoItem,
		estatuscandidatoId: this.candidato.estatuscandidatoId,
		estatuscandidatoItem: this.candidato.estatuscandidatoItem,
		// solicitud: this.candidato.solicitud,
		// solicitudId: this.candidato.solicitudId,
		// solicitudItem: this.candidato.solicitudItem,
		// evento: this.candidato.evento,
		// eventoId: this.candidato.eventoId,
		// eventoItem: this.candidato.eventoItem,
		candidatoId: this.candidato.candidatoId,
        candidatoItem: this.candidato.candidatoItem, 
        username: this.candidato.username	
		
        };
        return candidato;
    }

setCandidato(candidato: Candidato) {
       
        this.isCandidatoFormValid = true;
this.candidato.nombre = candidato.nombre;
this.candidato.apellidopaterno = candidato.apellidopaterno;
this.candidato.apellidomaterno = candidato.apellidomaterno;
this.candidato.fecha = candidato.fecha;
this.candidato.fechaAux = candidato.fechaAux;
this.candidato.generoId = candidato.generoId;
this.candidato.generoItem = candidato.generoItem;
this.candidato.estatuscandidatoId = candidato.estatuscandidatoId;
this.candidato.estatuscandidatoItem = candidato.estatuscandidatoItem;
// this.candidato.solicitud = candidato.solicitud;
// this.candidato.solicitudId = candidato.solicitudId;
// this.candidato.solicitudItem = candidato.solicitudItem;
// this.candidato.evento = candidato.evento;
// this.candidato.eventoId = candidato.eventoId;
// this.candidato.eventoItem = candidato.eventoItem;
        
		this.candidato.candidatoId = candidato.candidatoId;
        this.candidato.candidatoItem = candidato.candidatoItem;
        this.candidato.username = candidato.username;
		
		this.validateCandidato();
    }

    isFormValid() {
        return this.isCandidatoFormValid;
    }

    validateCandidato() {

    }

    clear() {
			this.candidato.nombre = ''; 
			this.candidato.apellidopaterno = ''; 
			this.candidato.apellidomaterno = ''; 
			this.candidato.fecha = null; 
			this.candidato.fechaAux = null; 
			
			this.candidato.generoId = null;
			this.candidato.generoItem = null;
			
			this.candidato.estatuscandidatoId = null;
			this.candidato.estatuscandidatoItem = null;
			
			// this.candidato.solicitud = null;
			// this.candidato.solicitudId = null;
			// this.candidato.solicitudItem = null;
			
			// this.candidato.evento = null;
			// this.candidato.eventoId = null;
			// this.candidato.eventoItem = null;
    		
			this.candidato.candidatoId = null;
			this.candidato.candidatoItem = null;
			this.candidato.username = '';
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

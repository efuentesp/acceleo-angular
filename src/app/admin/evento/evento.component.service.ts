import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Evento }                           from '../evento/evento.component.model';
import { User } from '../user/user.component.model';
import { UserStorageComponent } from '../user/user-storage.component';

@Injectable()
export class EventoService {

    private isEventoFormValid: boolean = false;
    private env: any = environment;
    private evento = new Evento();
    private flag :boolean = false;
    private flagDelete :boolean = false;
    private storage: UserStorageComponent;

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getAllEvento(){
		let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/evento", opts).pipe(map(res => res.json()));
    }

    saveEvento(evento){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

        console.log('Evento', evento);

		if (!evento.eventoId){
            return this.http.post(this.env.api + "/evento", evento, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/evento/"+ evento.eventoId, evento, opts).pipe(map(res => res));
        }
    }

    deleteEvento(evento){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/evento/"+evento.eventoId, opts).pipe(map(res => res));
    }

    getEventoById(eventoId){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/idevento/"+eventoId, opts).pipe(map(res => res.json()));
    }

    resetEvento(): Evento {
        this.clear();
        return this.evento;
    }

    getEvento(): Evento {
        var evento: Evento = {
		
			tipoeventoId: this.evento.tipoeventoId,
			tipoeventoItem: this.evento.tipoeventoItem,
		nombre: this.evento.nombre,
		
		posicionId: this.evento.posicionId,
		posicionItem: this.evento.posicionItem,
		
		candidatoId: this.evento.candidatoId,
		candidatoItem: this.evento.candidatoItem,
		fecha: this.evento.fecha,
		responsable: this.evento.responsable,
		notas: this.evento.notas,
		fechareal: this.evento.fechareal,
		responsablereal: this.evento.responsablereal,
		feedback: this.evento.feedback,
		comentarios: this.evento.comentarios,
		
			estatuseventoId: this.evento.estatuseventoId,
			estatuseventoItem: this.evento.estatuseventoItem,
		eventoId: this.evento.eventoId,
		eventoItem: this.evento.eventoItem	
		
        };
        return evento;
    }

setEvento(evento: Evento) {
       
        this.isEventoFormValid = true;
this.evento.tipoeventoId = evento.tipoeventoId;
this.evento.tipoeventoItem = evento.tipoeventoItem;
this.evento.nombre = evento.nombre;
this.evento.posicionId = evento.posicionId;
this.evento.posicionItem = evento.posicionItem;
this.evento.candidatoId = evento.candidatoId;
this.evento.candidatoItem = evento.candidatoItem;
this.evento.fecha = evento.fecha;
this.evento.responsable = evento.responsable;
this.evento.notas = evento.notas;
this.evento.fechareal = evento.fechareal;
this.evento.responsablereal = evento.responsablereal;
this.evento.feedback = evento.feedback;
this.evento.comentarios = evento.comentarios;
this.evento.estatuseventoId = evento.estatuseventoId;
this.evento.estatuseventoItem = evento.estatuseventoItem;
        
		this.evento.eventoId = evento.eventoId;
		this.evento.eventoItem = evento.eventoItem;
		
		this.validateEvento();
    }

    isFormValid() {
        return this.isEventoFormValid;
    }

    validateEvento() {

    }

    clear() {
			
			this.evento.tipoeventoId = null;
			this.evento.tipoeventoItem = null;
			
			this.evento.nombre = ''; 
			
			this.evento.posicionId = null;
			this.evento.posicionItem = null;
			
			this.evento.candidatoId = null;
			this.evento.candidatoItem = null;
			this.evento.fecha = null; 
			this.evento.responsable = ''; 
			this.evento.notas = ''; 
			this.evento.fechareal = null; 
			this.evento.responsablereal = ''; 
			this.evento.feedback = ''; 
			this.evento.comentarios = ''; 
			
			this.evento.estatuseventoId = null;
			this.evento.estatuseventoItem = null;
			
    		
			this.evento.eventoId = null;
			this.evento.eventoItem = null;
			
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

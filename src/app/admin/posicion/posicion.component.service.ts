import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Posicion }                           from '../posicion/posicion.component.model';
import { User } from '../user/user.component.model';
import { UserStorageComponent } from '../user/user-storage.component';

@Injectable()
export class PosicionService {

    private isPosicionFormValid: boolean = false;
    private env: any = environment;
    private posicion = new Posicion();
    private flag :boolean = false;
    private flagDelete :boolean = false;
    private storage: UserStorageComponent;

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getAllPosicion(){
		let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/posicion", opts).pipe(map(res => res.json()));
    }

    savePosicion(posicion){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

        console.log('Posicion', posicion);

		if (!posicion.posicionId){
            return this.http.post(this.env.api + "/posicion", posicion, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/posicion/"+ posicion.posicionId, posicion, opts).pipe(map(res => res));
        }
    }

    deletePosicion(posicion){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/posicion/"+posicion.posicionId, opts).pipe(map(res => res));
    }

    getPosicionById(posicionId){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/idposicion/"+posicionId, opts).pipe(map(res => res.json()));
    }

    resetPosicion(): Posicion {
        this.clear();
        return this.posicion;
    }

    getPosicion(): Posicion {
        var posicion: Posicion = {
		
		filialId: this.posicion.filialId,
		filialItem: this.posicion.filialItem,
		
		puestoId: this.posicion.puestoId,
		puestoItem: this.posicion.puestoItem,
		nombre: this.posicion.nombre,
		descripcion: this.posicion.descripcion,
		fecha: this.posicion.fecha,
		contacto: this.posicion.contacto,
		salario: this.posicion.salario,
		vacantes: this.posicion.vacantes,	
		
			tiponominaId: this.posicion.tiponominaId,
			tiponominaItem: this.posicion.tiponominaItem,
		
		reclutadorId: this.posicion.reclutadorId,
		reclutadorItem: this.posicion.reclutadorItem,
		
			estatusposicionId: this.posicion.estatusposicionId,
			estatusposicionItem: this.posicion.estatusposicionItem,
		
		solicitudId: this.posicion.solicitudId,
		solicitudItem: this.posicion.solicitudItem,
		
		eventoId: this.posicion.eventoId,
		eventoItem: this.posicion.eventoItem,
		posicionId: this.posicion.posicionId,
		posicionItem: this.posicion.posicionItem	
		
        };
        return posicion;
    }

setPosicion(posicion: Posicion) {
       
        this.isPosicionFormValid = true;
this.posicion.filialId = posicion.filialId;
this.posicion.filialItem = posicion.filialItem;
this.posicion.puestoId = posicion.puestoId;
this.posicion.puestoItem = posicion.puestoItem;
this.posicion.nombre = posicion.nombre;
this.posicion.descripcion = posicion.descripcion;
this.posicion.fecha = posicion.fecha;
this.posicion.contacto = posicion.contacto;
this.posicion.salario = posicion.salario;
this.posicion.vacantes = posicion.vacantes;
this.posicion.tiponominaId = posicion.tiponominaId;
this.posicion.tiponominaItem = posicion.tiponominaItem;
this.posicion.reclutadorId = posicion.reclutadorId;
this.posicion.reclutadorItem = posicion.reclutadorItem;
this.posicion.estatusposicionId = posicion.estatusposicionId;
this.posicion.estatusposicionItem = posicion.estatusposicionItem;
this.posicion.solicitudId = posicion.solicitudId;
this.posicion.solicitudItem = posicion.solicitudItem;
this.posicion.eventoId = posicion.eventoId;
this.posicion.eventoItem = posicion.eventoItem;
        
		this.posicion.posicionId = posicion.posicionId;
		this.posicion.posicionItem = posicion.posicionItem;
		
		this.validatePosicion();
    }

    isFormValid() {
        return this.isPosicionFormValid;
    }

    validatePosicion() {

    }

    clear() {
			
			this.posicion.filialId = null;
			this.posicion.filialItem = null;
			
			this.posicion.puestoId = null;
			this.posicion.puestoItem = null;
			this.posicion.nombre = ''; 
			this.posicion.descripcion = ''; 
			this.posicion.fecha = null; 
			this.posicion.contacto = ''; 
			this.posicion.salario = null; 
			this.posicion.vacantes = null; 
			
			this.posicion.tiponominaId = null;
			this.posicion.tiponominaItem = null;
			
			
			this.posicion.reclutadorId = null;
			this.posicion.reclutadorItem = null;
			
			this.posicion.estatusposicionId = null;
			this.posicion.estatusposicionItem = null;
			
			
			this.posicion.solicitudId = null;
			this.posicion.solicitudItem = null;
			
			this.posicion.eventoId = null;
			this.posicion.eventoItem = null;
    		
			this.posicion.posicionId = null;
			this.posicion.posicionItem = null;
			
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

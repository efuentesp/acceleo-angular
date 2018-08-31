import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Ordensimplificada }                           from '../ordensimplificada/ordensimplificada.component.model';
import { User } from '../user/user.component.model';
import { UserStorageComponent } from '../user/user-storage.component';

@Injectable()
export class OrdensimplificadaService {

    private isOrdensimplificadaFormValid: boolean = false;
    private env: any = environment;
    private ordensimplificada = new Ordensimplificada();
    private flag :boolean = false;
    private flagDelete :boolean = false;
    private storage: UserStorageComponent;

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getAllOrdensimplificada(){
		let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/ordensimplificada", opts).pipe(map(res => res.json()));
    }

    saveOrdensimplificada(ordensimplificada){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

		if (!ordensimplificada.ordensimplificadaId){
            return this.http.post(this.env.api + "/ordensimplificada", ordensimplificada, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/ordensimplificada/"+ ordensimplificada.ordensimplificadaId, ordensimplificada, opts).pipe(map(res => res));
        }
    }

    deleteOrdensimplificada(ordensimplificada){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/ordensimplificada/"+ordensimplificada.ordensimplificadaId, opts).pipe(map(res => res));
    }

    getOrdensimplificadaById(ordensimplificadaId){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/idordensimplificada/"+ordensimplificadaId, opts).pipe(map(res => res.json()));
    }

    resetOrdensimplificada(): Ordensimplificada {
        this.clear();
        return this.ordensimplificada;
    }

    getOrdensimplificada(): Ordensimplificada {
        var ordensimplificada: Ordensimplificada = {
		fechafinal: this.ordensimplificada.fechafinal, 
		fechafinalAux: this.ordensimplificada.fechafinalAux, 
		ordentrabajo: this.ordensimplificada.ordentrabajo, 
		cantidadprogramada: this.ordensimplificada.cantidadprogramada, 
		sap: this.ordensimplificada.sap, 
		cantidadproducida: this.ordensimplificada.cantidadproducida, 
		fechainicial: this.ordensimplificada.fechainicial, 
		fechainicialAux: this.ordensimplificada.fechainicialAux, 
		lineaId: this.ordensimplificada.lineaId,
		lineaItem: this.ordensimplificada.lineaItem,
		destinoId: this.ordensimplificada.destinoId,
		destinoItem: this.ordensimplificada.destinoItem,
		estadoordenId: this.ordensimplificada.estadoordenId,
		estadoordenItem: this.ordensimplificada.estadoordenItem,
		operadorproduccionId: this.ordensimplificada.operadorproduccionId,
		operadorproduccionItem: this.ordensimplificada.operadorproduccionItem,
		comentario: this.ordensimplificada.comentario,
		clienteId: this.ordensimplificada.clienteId,
		clienteItem: this.ordensimplificada.clienteItem,
		ordensimplificadaId: this.ordensimplificada.ordensimplificadaId,
		ordensimplificadaItem: this.ordensimplificada.ordensimplificadaItem	
        };
        return ordensimplificada;
    }

setOrdensimplificada(ordensimplificada: Ordensimplificada) {
       
		this.isOrdensimplificadaFormValid = true;
		this.ordensimplificada.fechafinal = ordensimplificada.fechafinal;  
		this.ordensimplificada.fechafinalAux = ordensimplificada.fechafinalAux;  
		this.ordensimplificada.ordentrabajo = ordensimplificada.ordentrabajo;  
		this.ordensimplificada.cantidadprogramada = ordensimplificada.cantidadprogramada;  
		this.ordensimplificada.sap = ordensimplificada.sap;  
		this.ordensimplificada.cantidadproducida = ordensimplificada.cantidadproducida;  
		this.ordensimplificada.fechainicial = ordensimplificada.fechainicial;  
		this.ordensimplificada.fechainicialAux = ordensimplificada.fechainicialAux;  
		this.ordensimplificada.lineaId = ordensimplificada.lineaId;
		this.ordensimplificada.lineaItem = ordensimplificada.lineaItem;
		this.ordensimplificada.destinoId = ordensimplificada.destinoId;
		this.ordensimplificada.destinoItem = ordensimplificada.destinoItem;
		this.ordensimplificada.estadoordenId = ordensimplificada.estadoordenId;
		this.ordensimplificada.estadoordenItem = ordensimplificada.estadoordenItem;
		this.ordensimplificada.estadoordenId = ordensimplificada.estadoordenId;
		this.ordensimplificada.estadoordenItem = ordensimplificada.estadoordenItem;
		this.ordensimplificada.operadorproduccionId = ordensimplificada.operadorproduccionId;
		this.ordensimplificada.operadorproduccionItem = ordensimplificada.operadorproduccionItem;
		this.ordensimplificada.operadorproduccionId = ordensimplificada.operadorproduccionId;
		this.ordensimplificada.operadorproduccionItem = ordensimplificada.operadorproduccionItem;
		this.ordensimplificada.comentario = ordensimplificada.comentario;
		this.ordensimplificada.clienteId = ordensimplificada.clienteId;
		this.ordensimplificada.clienteItem = ordensimplificada.clienteItem;
		this.ordensimplificada.ordensimplificadaId = ordensimplificada.ordensimplificadaId;
		this.ordensimplificada.ordensimplificadaItem = ordensimplificada.ordensimplificadaItem;
		this.validateOrdensimplificada();
    }

    isFormValid() {
        return this.isOrdensimplificadaFormValid;
    }

    validateOrdensimplificada() {

    }

    clear() {

			this.ordensimplificada.fechafinal = '';  
			this.ordensimplificada.fechafinalAux = null;    
			this.ordensimplificada.ordentrabajo = null;    
			this.ordensimplificada.cantidadprogramada = null;    
			this.ordensimplificada.sap = null;    
			this.ordensimplificada.cantidadproducida = null;    
			this.ordensimplificada.fechainicial = '';  
			this.ordensimplificada.fechainicialAux = null;    

			this.ordensimplificada.lineaId = null;
			this.ordensimplificada.lineaItem = null;
			this.ordensimplificada.destinoId = null;
			this.ordensimplificada.destinoItem = null;
			this.ordensimplificada.estadoordenId = null;
			this.ordensimplificada.estadoordenItem = null;
			this.ordensimplificada.estadoordenId = null;
			this.ordensimplificada.estadoordenItem = null;
			this.ordensimplificada.operadorproduccionId = null;
			this.ordensimplificada.operadorproduccionItem = null;
			this.ordensimplificada.operadorproduccionId = null;
			this.ordensimplificada.operadorproduccionItem = null;
			this.ordensimplificada.comentario = '';
			this.ordensimplificada.clienteId = null;
			this.ordensimplificada.clienteItem = null;
			this.ordensimplificada.ordensimplificadaId = null;
			this.ordensimplificada.ordensimplificadaItem = null;
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

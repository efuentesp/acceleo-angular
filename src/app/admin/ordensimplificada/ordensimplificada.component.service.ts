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
		linea1Id: this.ordensimplificada.linea1Id,
		linea1Item: this.ordensimplificada.linea1Item,
		destino1Id: this.ordensimplificada.destino1Id,
		destino1Item: this.ordensimplificada.destino1Item,
		estadoorden1Id: this.ordensimplificada.estadoorden1Id,
		estadoorden1Item: this.ordensimplificada.estadoorden1Item,
		estadoorden2Id: this.ordensimplificada.estadoorden2Id,
		estadoorden2Item: this.ordensimplificada.estadoorden2Item,
		operadorproduccion1Id: this.ordensimplificada.operadorproduccion1Id,
		operadorproduccion1Item: this.ordensimplificada.operadorproduccion1Item,
		operadorproduccion2Id: this.ordensimplificada.operadorproduccion2Id,
		operadorproduccion2Item: this.ordensimplificada.operadorproduccion2Item,
		comentario: this.ordensimplificada.comentario,
		cliente1Id: this.ordensimplificada.cliente1Id,
		cliente1Item: this.ordensimplificada.cliente1Item,
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
		this.ordensimplificada.linea1Id = ordensimplificada.linea1Id;
		this.ordensimplificada.linea1Item = ordensimplificada.linea1Item;
		this.ordensimplificada.destino1Id = ordensimplificada.destino1Id;
		this.ordensimplificada.destino1Item = ordensimplificada.destino1Item;
		this.ordensimplificada.estadoorden1Id = ordensimplificada.estadoorden1Id;
		this.ordensimplificada.estadoorden1Item = ordensimplificada.estadoorden1Item;
		this.ordensimplificada.estadoorden2Id = ordensimplificada.estadoorden2Id;
		this.ordensimplificada.estadoorden2Item = ordensimplificada.estadoorden2Item;
		this.ordensimplificada.operadorproduccion1Id = ordensimplificada.operadorproduccion1Id;
		this.ordensimplificada.operadorproduccion1Item = ordensimplificada.operadorproduccion1Item;
		this.ordensimplificada.operadorproduccion2Id = ordensimplificada.operadorproduccion2Id;
		this.ordensimplificada.operadorproduccion2Item = ordensimplificada.operadorproduccion2Item;
		this.ordensimplificada.comentario = ordensimplificada.comentario;
		this.ordensimplificada.cliente1Id = ordensimplificada.cliente1Id;
		this.ordensimplificada.cliente1Item = ordensimplificada.cliente1Item;

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

			this.ordensimplificada.linea1Id = null;
			this.ordensimplificada.linea1Item = null;

			this.ordensimplificada.destino1Id = null;
			this.ordensimplificada.destino1Item = null;
			
			this.ordensimplificada.estadoorden1Id = null;
			this.ordensimplificada.estadoorden1Item = null;
			
			this.ordensimplificada.estadoorden2Id = null;
			this.ordensimplificada.estadoorden2Item = null;
			
			this.ordensimplificada.operadorproduccion1Id = null;
			this.ordensimplificada.operadorproduccion1Item = null;
			
			this.ordensimplificada.operadorproduccion2Id = null;
			this.ordensimplificada.operadorproduccion2Item = null;
			this.ordensimplificada.comentario = '';
			this.ordensimplificada.cliente1Id = null;
			this.ordensimplificada.cliente1Item = null;
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

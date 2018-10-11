import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Etiquetaasignada }                           from '../etiquetaasignada/etiquetaasignada.component.model';
import { User } from '../user/user.component.model';
import { UserStorageComponent } from '../user/user-storage.component';

@Injectable()
export class EtiquetaasignadaService {

    private isEtiquetaasignadaFormValid: boolean = false;
    private env: any = environment;
    private etiquetaasignada = new Etiquetaasignada();
    private flag :boolean = false;
    private flagDelete :boolean = false;
    private storage: UserStorageComponent;

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getAllEtiquetaasignada(){
		let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/etiquetaasignada", opts).pipe(map(res => res.json()));
    }

    saveEtiquetaasignada(etiquetaasignada){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

		if (!etiquetaasignada.etiquetaasignadaId){
            return this.http.post(this.env.api + "/etiquetaasignada", etiquetaasignada, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/etiquetaasignada/"+ etiquetaasignada.etiquetaasignadaId, etiquetaasignada, opts).pipe(map(res => res));
        }
    }

    deleteEtiquetaasignada(etiquetaasignada){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/etiquetaasignada/"+etiquetaasignada.etiquetaasignadaId, opts).pipe(map(res => res));
    }

    getEtiquetaasignadaById(etiquetaasignadaId){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/idetiquetaasignada/"+etiquetaasignadaId, opts).pipe(map(res => res.json()));
    }

    resetEtiquetaasignada(): Etiquetaasignada {
        this.clear();
        return this.etiquetaasignada;
    }

    getEtiquetaasignada(): Etiquetaasignada {
        var etiquetaasignada: Etiquetaasignada = {
		etiquetaasignadasxpalet: this.etiquetaasignada.etiquetaasignadasxpalet, 
		f5: this.etiquetaasignada.f5, 
		sap: this.etiquetaasignada.sap, 
		multiplo3: this.etiquetaasignada.multiplo3, 
		multiplo2: this.etiquetaasignada.multiplo2, 
		multiplo1: this.etiquetaasignada.multiplo1, 
		cliente1Id: this.etiquetaasignada.cliente1Id,
		cliente1Item: this.etiquetaasignada.cliente1Item,
		ordensimplificada1Id: this.etiquetaasignada.ordensimplificada1Id,
        ordensimplificada1Item: this.etiquetaasignada.ordensimplificada1Item,
        
		etiquetaasignadaId: this.etiquetaasignada.etiquetaasignadaId,
		etiquetaasignadaItem: this.etiquetaasignada.etiquetaasignadaItem	
        };
        return etiquetaasignada;
    }

setEtiquetaasignada(etiquetaasignada: Etiquetaasignada) {
       
		this.isEtiquetaasignadaFormValid = true;
		this.etiquetaasignada.etiquetaasignadasxpalet = etiquetaasignada.etiquetaasignadasxpalet;  
		this.etiquetaasignada.f5 = etiquetaasignada.f5;  
		this.etiquetaasignada.sap = etiquetaasignada.sap;  
		this.etiquetaasignada.multiplo3 = etiquetaasignada.multiplo3;  
		this.etiquetaasignada.multiplo2 = etiquetaasignada.multiplo2;  
		this.etiquetaasignada.multiplo1 = etiquetaasignada.multiplo1;  
		this.etiquetaasignada.cliente1Id = etiquetaasignada.cliente1Id;
		this.etiquetaasignada.cliente1Item = etiquetaasignada.cliente1Item;
		this.etiquetaasignada.ordensimplificada1Id = etiquetaasignada.ordensimplificada1Id;
        this.etiquetaasignada.ordensimplificada1Item = etiquetaasignada.ordensimplificada1Item;
        
		this.etiquetaasignada.etiquetaasignadaId = etiquetaasignada.etiquetaasignadaId;
		this.etiquetaasignada.etiquetaasignadaItem = etiquetaasignada.etiquetaasignadaItem;
		this.validateEtiquetaasignada();
    }

    isFormValid() {
        return this.isEtiquetaasignadaFormValid;
    }

    validateEtiquetaasignada() {

    }

    clear() {

			this.etiquetaasignada.etiquetaasignadasxpalet = null;    
			this.etiquetaasignada.f5 = null;    
			this.etiquetaasignada.sap = null;    
			this.etiquetaasignada.multiplo3 = null;    
			this.etiquetaasignada.multiplo2 = null;    
			this.etiquetaasignada.multiplo1 = null;    

			this.etiquetaasignada.cliente1Id = null;
			this.etiquetaasignada.cliente1Item = null;
			this.etiquetaasignada.ordensimplificada1Id = null;
            this.etiquetaasignada.ordensimplificada1Item = null;
            
			this.etiquetaasignada.etiquetaasignadaId = null;
			this.etiquetaasignada.etiquetaasignadaItem = null;
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

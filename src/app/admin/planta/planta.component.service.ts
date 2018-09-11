import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Planta }                           from '../planta/planta.component.model';
import { User } from '../user/user.component.model';
import { UserStorageComponent } from '../user/user-storage.component';

@Injectable()
export class PlantaService {

    private isPlantaFormValid: boolean = false;
    private env: any = environment;
    private planta = new Planta();
    private flag :boolean = false;
    private flagDelete :boolean = false;
    private storage: UserStorageComponent;

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getAllPlanta(){
		let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/planta", opts).pipe(map(res => res.json()));
    }

    savePlanta(planta){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

		if (!planta.plantaId){
            return this.http.post(this.env.api + "/planta", planta, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/planta/"+ planta.plantaId, planta, opts).pipe(map(res => res));
        }
    }

    deletePlanta(planta){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/planta/"+planta.plantaId, opts).pipe(map(res => res));
    }

    getPlantaById(plantaId){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/idplanta/"+plantaId, opts).pipe(map(res => res.json()));
    }

    resetPlanta(): Planta {
        this.clear();
        return this.planta;
    }

    getPlanta(): Planta {
        var planta: Planta = {
		minimo: this.planta.minimo, 
		diadepago: this.planta.diadepago, 
		maximo: this.planta.maximo, 
		nombreplanta: this.planta.nombreplanta, 
		direccion: this.planta.direccion, 
		empresaId: this.planta.empresaId,
		empresaItem: this.planta.empresaItem,
		plantaId: this.planta.plantaId,
		plantaItem: this.planta.plantaItem	
        };
        return planta;
    }

setPlanta(planta: Planta) {
       
		this.isPlantaFormValid = true;
		this.planta.minimo = planta.minimo;  
		this.planta.diadepago = planta.diadepago;  
		this.planta.maximo = planta.maximo;  
		this.planta.nombreplanta = planta.nombreplanta;  
		this.planta.direccion = planta.direccion;  
		this.planta.empresaId = planta.empresaId;
		this.planta.empresaItem = planta.empresaItem;
		this.planta.plantaId = planta.plantaId;
		this.planta.plantaItem = planta.plantaItem;
		this.validatePlanta();
    }

    isFormValid() {
        return this.isPlantaFormValid;
    }

    validatePlanta() {

    }

    clear() {

			this.planta.minimo = '';  
			this.planta.diadepago = null;    
			this.planta.maximo = '';  
			this.planta.nombreplanta = '';    
			this.planta.direccion = '';    

			this.planta.empresaId = null;
			this.planta.empresaItem = null;
			this.planta.plantaId = null;
			this.planta.plantaItem = null;
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

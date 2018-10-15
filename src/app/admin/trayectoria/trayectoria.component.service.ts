import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Trayectoria }                           from '../trayectoria/trayectoria.component.model';
import { User } from '../user/user.component.model';
import { UserStorageComponent } from '../user/user-storage.component';

@Injectable()
export class TrayectoriaService {

    private isTrayectoriaFormValid: boolean = false;
    private env: any = environment;
    private trayectoria = new Trayectoria();
    private flag :boolean = false;
    private flagDelete :boolean = false;
    private storage: UserStorageComponent;

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getAllTrayectoria(){
		let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/trayectoria", opts).pipe(map(res => res.json()));
    }

    saveTrayectoria(trayectoria){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

        console.log('Trayectoria', trayectoria);

		if (!trayectoria.trayectoriaId){
            return this.http.post(this.env.api + "/trayectoria", trayectoria, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/trayectoria/"+ trayectoria.trayectoriaId, trayectoria, opts).pipe(map(res => res));
        }
    }

    deleteTrayectoria(trayectoria){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/trayectoria/"+trayectoria.trayectoriaId, opts).pipe(map(res => res));
    }

    getTrayectoriaById(trayectoriaId){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/idtrayectoria/"+trayectoriaId, opts).pipe(map(res => res.json()));
    }

    resetTrayectoria(): Trayectoria {
        this.clear();
        return this.trayectoria;
    }

    getTrayectoria(): Trayectoria {
        var trayectoria: Trayectoria = {
		
		candidatoId: this.trayectoria.candidatoId,
		candidatoItem: this.trayectoria.candidatoItem,
		
			tipotrayectoriaId: this.trayectoria.tipotrayectoriaId,
			tipotrayectoriaItem: this.trayectoria.tipotrayectoriaItem,
		descripcion: this.trayectoria.descripcion,
		clave: this.trayectoria.clave,
		
		documentoId: this.trayectoria.documentoId,
		documentoItem: this.trayectoria.documentoItem,
		trayectoriaId: this.trayectoria.trayectoriaId,
		trayectoriaItem: this.trayectoria.trayectoriaItem	
		
        };
        return trayectoria;
    }

setTrayectoria(trayectoria: Trayectoria) {
       
        this.isTrayectoriaFormValid = true;
this.trayectoria.candidatoId = trayectoria.candidatoId;
this.trayectoria.candidatoItem = trayectoria.candidatoItem;
this.trayectoria.tipotrayectoriaId = trayectoria.tipotrayectoriaId;
this.trayectoria.tipotrayectoriaItem = trayectoria.tipotrayectoriaItem;
this.trayectoria.descripcion = trayectoria.descripcion;
this.trayectoria.clave = trayectoria.clave;
this.trayectoria.documentoId = trayectoria.documentoId;
this.trayectoria.documentoItem = trayectoria.documentoItem;
        
		this.trayectoria.trayectoriaId = trayectoria.trayectoriaId;
		this.trayectoria.trayectoriaItem = trayectoria.trayectoriaItem;
		
		this.validateTrayectoria();
    }

    isFormValid() {
        return this.isTrayectoriaFormValid;
    }

    validateTrayectoria() {

    }

    clear() {
			
			this.trayectoria.candidatoId = null;
			this.trayectoria.candidatoItem = null;
			
			this.trayectoria.tipotrayectoriaId = null;
			this.trayectoria.tipotrayectoriaItem = null;
			
			this.trayectoria.descripcion = ''; 
			this.trayectoria.clave = ''; 
			
			this.trayectoria.documentoId = null;
			this.trayectoria.documentoItem = null;
    		
			this.trayectoria.trayectoriaId = null;
			this.trayectoria.trayectoriaItem = null;
			
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

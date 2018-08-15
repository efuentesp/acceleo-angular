import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Domicilio }                           from '../domicilio/domicilio.component.model';
import { User } from '../user/user.component.model';
import { UserStorageComponent } from '../user/user-storage.component';

@Injectable()
export class DomicilioService {

    private isDomicilioFormValid: boolean = false;
    private env: any = environment;
    private domicilio = new Domicilio();
    private flag :boolean = false;
    private flagDelete :boolean = false;
    private storage: UserStorageComponent;

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getAllDomicilio(){
		let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/domicilio", opts).pipe(map(res => res.json()));
    }

    saveDomicilio(domicilio){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

		if (!domicilio.domicilioId){
            return this.http.post(this.env.api + "/domicilio", domicilio, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/domicilio/"+ domicilio.domicilioId, domicilio, opts).pipe(map(res => res));
        }
    }

    deleteDomicilio(domicilio){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/domicilio/"+domicilio.domicilioId, opts).pipe(map(res => res));
    }

    getDomicilioById(domicilioId){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/iddomicilio/"+domicilioId, opts).pipe(map(res => res.json()));
    }

    resetDomicilio(): Domicilio {
        this.clear();
        return this.domicilio;
    }

    getDomicilio(): Domicilio {
        var domicilio: Domicilio = {
		estado: this.domicilio.estado, 
		calle: this.domicilio.calle, 
		ciudad: this.domicilio.ciudad, 
		cp: this.domicilio.cp, 
		// Modal
		deId: this.domicilio.deId,
		deItem: this.domicilio.deItem,
		domicilioId: this.domicilio.domicilioId,
		domicilioItem: this.domicilio.domicilioItem	
        };
        return domicilio;
    }

setDomicilio(domicilio: Domicilio) {
       
		this.isDomicilioFormValid = true;
		this.domicilio.estado = domicilio.estado;    
		this.domicilio.calle = domicilio.calle;    
		this.domicilio.ciudad = domicilio.ciudad;    
		this.domicilio.cp = domicilio.cp;    
		this.domicilio.deId = domicilio.deId;
		this.domicilio.deItem = domicilio.deItem;
		this.domicilio.domicilioId = domicilio.domicilioId;
		this.domicilio.domicilioItem = domicilio.domicilioItem;
		this.validateDomicilio();
    }

    isFormValid() {
        return this.isDomicilioFormValid;
    }

    validateDomicilio() {

    }

    clear() {

			this.domicilio.estado = '';    
			this.domicilio.calle = null;    
			this.domicilio.ciudad = '';    
			this.domicilio.cp = '';    

			this.domicilio.deId = null;
			this.domicilio.deItem = null;
			this.domicilio.domicilioId = null;
			this.domicilio.domicilioItem = null;
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

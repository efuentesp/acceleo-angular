import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Interes }                           from '../interes/interes.component.model';
import { User } from '../user/user.component.model';
import { UserStorageComponent } from '../user/user-storage.component';

@Injectable()
export class InteresService {

    private isInteresFormValid: boolean = false;
    private env: any = environment;
    private interes = new Interes();
    private flag :boolean = false;
    private flagDelete :boolean = false;
    private storage: UserStorageComponent;

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getAllInteres(){
		let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/interes", opts).pipe(map(res => res.json()));
    }

    saveInteres(interes){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

		if (!interes.interesId){
            return this.http.post(this.env.api + "/interes", interes, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/interes/"+ interes.interesId, interes, opts).pipe(map(res => res));
        }
    }

    deleteInteres(interes){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/interes/"+interes.interesId, opts).pipe(map(res => res));
    }

    getInteresById(interesId){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/idinteres/"+interesId, opts).pipe(map(res => res.json()));
    }

    resetInteres(): Interes {
        this.clear();
        return this.interes;
    }

    getInteres(): Interes {
        var interes: Interes = {
		monto: this.interes.monto, 
		fecha: this.interes.fecha, 
		// Modal
		paraId: this.interes.paraId,
		paraItem: this.interes.paraItem,
		interesId: this.interes.interesId,
		interesItem: this.interes.interesItem	
        };
        return interes;
    }

setInteres(interes: Interes) {
       
		this.isInteresFormValid = true;
		this.interes.monto = interes.monto;    
		this.interes.fecha = interes.fecha;    
		this.interes.paraId = interes.paraId;
		this.interes.paraItem = interes.paraItem;
		this.interes.interesId = interes.interesId;
		this.interes.interesItem = interes.interesItem;
		this.validateInteres();
    }

    isFormValid() {
        return this.isInteresFormValid;
    }

    validateInteres() {

    }

    clear() {

			this.interes.monto = null;    
			this.interes.fecha = '';    

			this.interes.paraId = null;
			this.interes.paraItem = null;
			this.interes.interesId = null;
			this.interes.interesItem = null;
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

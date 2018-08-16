import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Cuentabancaria }                           from '../cuentabancaria/cuentabancaria.component.model';
import { User } from '../user/user.component.model';
import { UserStorageComponent } from '../user/user-storage.component';

@Injectable()
export class CuentabancariaService {

    private isCuentabancariaFormValid: boolean = false;
    private env: any = environment;
    private cuentabancaria = new Cuentabancaria();
    private flag :boolean = false;
    private flagDelete :boolean = false;
    private storage: UserStorageComponent;

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getAllCuentabancaria(){
		let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/cuentabancaria", opts).pipe(map(res => res.json()));
    }

    saveCuentabancaria(cuentabancaria){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

		if (!cuentabancaria.cuentabancariaId){
            return this.http.post(this.env.api + "/cuentabancaria", cuentabancaria, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/cuentabancaria/"+ cuentabancaria.cuentabancariaId, cuentabancaria, opts).pipe(map(res => res));
        }
    }

    deleteCuentabancaria(cuentabancaria){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/cuentabancaria/"+cuentabancaria.cuentabancariaId, opts).pipe(map(res => res));
    }

    getCuentabancariaById(cuentabancariaId){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/idcuentabancaria/"+cuentabancariaId, opts).pipe(map(res => res.json()));
    }

    resetCuentabancaria(): Cuentabancaria {
        this.clear();
        return this.cuentabancaria;
    }

    getCuentabancaria(): Cuentabancaria {
        var cuentabancaria: Cuentabancaria = {
		cuenta: this.cuentabancaria.cuenta, 
		clabe: this.cuentabancaria.clabe, 
		socioId: this.cuentabancaria.socioId,
		socioItem: this.cuentabancaria.socioItem,
		bancoId: this.cuentabancaria.bancoId,
		bancoItem: this.cuentabancaria.bancoItem,
		cuentabancariaId: this.cuentabancaria.cuentabancariaId,
		cuentabancariaItem: this.cuentabancaria.cuentabancariaItem	
        };
        return cuentabancaria;
    }

setCuentabancaria(cuentabancaria: Cuentabancaria) {
       
		this.isCuentabancariaFormValid = true;
		this.cuentabancaria.cuenta = cuentabancaria.cuenta;    
		this.cuentabancaria.clabe = cuentabancaria.clabe;    
		this.cuentabancaria.socioId = cuentabancaria.socioId;
		this.cuentabancaria.socioItem = cuentabancaria.socioItem;
		this.cuentabancaria.bancoId = cuentabancaria.bancoId;
		this.cuentabancaria.bancoItem = cuentabancaria.bancoItem;
		this.cuentabancaria.cuentabancariaId = cuentabancaria.cuentabancariaId;
		this.cuentabancaria.cuentabancariaItem = cuentabancaria.cuentabancariaItem;
		this.validateCuentabancaria();
    }

    isFormValid() {
        return this.isCuentabancariaFormValid;
    }

    validateCuentabancaria() {

    }

    clear() {

			this.cuentabancaria.cuenta = null;    
			this.cuentabancaria.clabe = null;    

			this.cuentabancaria.socioId = null;
			this.cuentabancaria.socioItem = null;
			this.cuentabancaria.bancoId = null;
			this.cuentabancaria.bancoItem = null;
			this.cuentabancaria.cuentabancariaId = null;
			this.cuentabancaria.cuentabancariaItem = null;
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

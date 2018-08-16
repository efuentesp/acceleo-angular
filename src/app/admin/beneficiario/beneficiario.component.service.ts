import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Beneficiario }                           from '../beneficiario/beneficiario.component.model';
import { User } from '../user/user.component.model';
import { UserStorageComponent } from '../user/user-storage.component';

@Injectable()
export class BeneficiarioService {

    private isBeneficiarioFormValid: boolean = false;
    private env: any = environment;
    private beneficiario = new Beneficiario();
    private flag :boolean = false;
    private flagDelete :boolean = false;
    private storage: UserStorageComponent;

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getAllBeneficiario(){
		let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/beneficiario", opts).pipe(map(res => res.json()));
    }

    saveBeneficiario(beneficiario){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

		if (!beneficiario.beneficiarioId){
            return this.http.post(this.env.api + "/beneficiario", beneficiario, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/beneficiario/"+ beneficiario.beneficiarioId, beneficiario, opts).pipe(map(res => res));
        }
    }

    deleteBeneficiario(beneficiario){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/beneficiario/"+beneficiario.beneficiarioId, opts).pipe(map(res => res));
    }

    getBeneficiarioById(beneficiarioId){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/idbeneficiario/"+beneficiarioId, opts).pipe(map(res => res.json()));
    }

    resetBeneficiario(): Beneficiario {
        this.clear();
        return this.beneficiario;
    }

    getBeneficiario(): Beneficiario {
        var beneficiario: Beneficiario = {
		nombre: this.beneficiario.nombre, 
		apellidomaterno: this.beneficiario.apellidomaterno, 
		apellidopaterno: this.beneficiario.apellidopaterno, 
		fechanacimiento: this.beneficiario.fechanacimiento, 
		cuentadeahorroId: this.beneficiario.cuentadeahorroId,
		cuentadeahorroItem: this.beneficiario.cuentadeahorroItem,
		generoId: this.beneficiario.generoId,
		generoItem: this.beneficiario.generoItem,
		parentescoId: this.beneficiario.parentescoId,
		parentescoItem: this.beneficiario.parentescoItem,
		beneficiarioId: this.beneficiario.beneficiarioId,
		beneficiarioItem: this.beneficiario.beneficiarioItem	
        };
        return beneficiario;
    }

setBeneficiario(beneficiario: Beneficiario) {
       
		this.isBeneficiarioFormValid = true;
		this.beneficiario.nombre = beneficiario.nombre;    
		this.beneficiario.apellidomaterno = beneficiario.apellidomaterno;    
		this.beneficiario.apellidopaterno = beneficiario.apellidopaterno;    
		this.beneficiario.fechanacimiento = beneficiario.fechanacimiento;    
		this.beneficiario.cuentadeahorroId = beneficiario.cuentadeahorroId;
		this.beneficiario.cuentadeahorroItem = beneficiario.cuentadeahorroItem;
		this.beneficiario.generoId = beneficiario.generoId;
		this.beneficiario.generoItem = beneficiario.generoItem;
		this.beneficiario.parentescoId = beneficiario.parentescoId;
		this.beneficiario.parentescoItem = beneficiario.parentescoItem;
		this.beneficiario.beneficiarioId = beneficiario.beneficiarioId;
		this.beneficiario.beneficiarioItem = beneficiario.beneficiarioItem;
		this.validateBeneficiario();
    }

    isFormValid() {
        return this.isBeneficiarioFormValid;
    }

    validateBeneficiario() {

    }

    clear() {

			this.beneficiario.nombre = '';    
			this.beneficiario.apellidomaterno = '';    
			this.beneficiario.apellidopaterno = '';    
			this.beneficiario.fechanacimiento = '';    

			this.beneficiario.cuentadeahorroId = null;
			this.beneficiario.cuentadeahorroItem = null;
			this.beneficiario.generoId = null;
			this.beneficiario.generoItem = null;
			this.beneficiario.parentescoId = null;
			this.beneficiario.parentescoItem = null;
			this.beneficiario.beneficiarioId = null;
			this.beneficiario.beneficiarioItem = null;
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

import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Socio }                           from '../socio/socio.component.model';
import { User } from '../user/user.component.model';
import { UserStorageComponent } from '../user/user-storage.component';

@Injectable()
export class SocioService {

    private isSocioFormValid: boolean = false;
    private env: any = environment;
    private socio = new Socio();
    private flag :boolean = false;
    private flagDelete :boolean = false;
    private storage: UserStorageComponent;

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getAllSocio(){
		let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/socio", opts).pipe(map(res => res.json()));
    }

    saveSocio(socio){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

		if (!socio.socioId){
            return this.http.post(this.env.api + "/socio", socio, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/socio/"+ socio.socioId, socio, opts).pipe(map(res => res));
        }
    }

    deleteSocio(socio){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/socio/"+socio.socioId, opts).pipe(map(res => res));
    }

    getSocioById(socioId){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/idsocio/"+socioId, opts).pipe(map(res => res.json()));
    }

    resetSocio(): Socio {
        this.clear();
        return this.socio;
    }

    getSocio(): Socio {
        var socio: Socio = {
		apellidomaterno: this.socio.apellidomaterno, 
		numero: this.socio.numero, 
		nombre: this.socio.nombre, 
		telefono: this.socio.telefono, 
		apellidopaterno: this.socio.apellidopaterno, 
		correo: this.socio.correo, 
		// Radio
		generoId: this.socio.generoId,
		generoItem: this.socio.generoItem,
		// Radio
		tipoempleadoId: this.socio.tipoempleadoId,
		tipoempleadoItem: this.socio.tipoempleadoItem,
		// Modal
		perteneceId: this.socio.perteneceId,
		perteneceItem: this.socio.perteneceItem,
		// Modal
		laboraId: this.socio.laboraId,
		laboraItem: this.socio.laboraItem,
		socioId: this.socio.socioId,
		socioItem: this.socio.socioItem	
        };
        return socio;
    }

setSocio(socio: Socio) {
       
		this.isSocioFormValid = true;
		this.socio.apellidomaterno = socio.apellidomaterno;    
		this.socio.numero = socio.numero;    
		this.socio.nombre = socio.nombre;    
		this.socio.telefono = socio.telefono;    
		this.socio.apellidopaterno = socio.apellidopaterno;    
		this.socio.correo = socio.correo;    
		this.socio.generoId = socio.generoId;
		this.socio.tipoempleadoId = socio.tipoempleadoId;
		this.socio.perteneceId = socio.perteneceId;
		this.socio.perteneceItem = socio.perteneceItem;
		this.socio.laboraId = socio.laboraId;
		this.socio.laboraItem = socio.laboraItem;
		this.socio.socioId = socio.socioId;
		this.socio.socioItem = socio.socioItem;
		this.validateSocio();
    }

    isFormValid() {
        return this.isSocioFormValid;
    }

    validateSocio() {

    }

    clear() {

			this.socio.apellidomaterno = '';    
			this.socio.numero = null;    
			this.socio.nombre = '';    
			this.socio.telefono = '';    
			this.socio.apellidopaterno = '';    
			this.socio.correo = '';    

			this.socio.generoId = null;
			this.socio.generoItem = null;
			this.socio.tipoempleadoId = null;
			this.socio.tipoempleadoItem = null;
			this.socio.perteneceId = null;
			this.socio.perteneceItem = null;
			this.socio.laboraId = null;
			this.socio.laboraItem = null;
			this.socio.socioId = null;
			this.socio.socioItem = null;
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

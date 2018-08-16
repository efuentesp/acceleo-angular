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
		apellidopaterno: this.socio.apellidopaterno, 
		numero: this.socio.numero, 
		nombre: this.socio.nombre, 
		apellidomaterno: this.socio.apellidomaterno, 
		generoId: this.socio.generoId,
		generoItem: this.socio.generoItem,
		telefono: this.socio.telefono,
		correo: this.socio.correo,
		telefono: this.socio.telefono,
		correo: this.socio.correo,
		tipoempleadoId: this.socio.tipoempleadoId,
		tipoempleadoItem: this.socio.tipoempleadoItem,
		departamentoId: this.socio.departamentoId,
		departamentoItem: this.socio.departamentoItem,
		plantaId: this.socio.plantaId,
		plantaItem: this.socio.plantaItem,
		socioId: this.socio.socioId,
		socioItem: this.socio.socioItem	
        };
        return socio;
    }

setSocio(socio: Socio) {
       
		this.isSocioFormValid = true;
		this.socio.apellidopaterno = socio.apellidopaterno;    
		this.socio.numero = socio.numero;    
		this.socio.nombre = socio.nombre;    
		this.socio.apellidomaterno = socio.apellidomaterno;    
		this.socio.generoId = socio.generoId;
		this.socio.generoItem = socio.generoItem;
		this.socio.telefono = socio.telefono;
		this.socio.correo = socio.correo;
		this.socio.telefono = socio.telefono;
		this.socio.correo = socio.correo;
		this.socio.tipoempleadoId = socio.tipoempleadoId;
		this.socio.tipoempleadoItem = socio.tipoempleadoItem;
		this.socio.departamentoId = socio.departamentoId;
		this.socio.departamentoItem = socio.departamentoItem;
		this.socio.plantaId = socio.plantaId;
		this.socio.plantaItem = socio.plantaItem;
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

			this.socio.apellidopaterno = '';    
			this.socio.numero = null;    
			this.socio.nombre = '';    
			this.socio.apellidomaterno = '';    

			this.socio.generoId = null;
			this.socio.generoItem = null;
			this.socio.telefono = '';
			this.socio.correo = '';
			this.socio.telefono = '';
			this.socio.correo = '';
			this.socio.tipoempleadoId = null;
			this.socio.tipoempleadoItem = null;
			this.socio.departamentoId = null;
			this.socio.departamentoItem = null;
			this.socio.plantaId = null;
			this.socio.plantaItem = null;
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

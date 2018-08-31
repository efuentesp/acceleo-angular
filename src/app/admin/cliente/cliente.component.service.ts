import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Cliente }                           from '../cliente/cliente.component.model';
import { User } from '../user/user.component.model';
import { UserStorageComponent } from '../user/user-storage.component';

@Injectable()
export class ClienteService {

    private isClienteFormValid: boolean = false;
    private env: any = environment;
    private cliente = new Cliente();
    private flag :boolean = false;
    private flagDelete :boolean = false;
    private storage: UserStorageComponent;

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getAllCliente(){
		let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/cliente", opts).pipe(map(res => res.json()));
    }

    saveCliente(cliente){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

		if (!cliente.clienteId){
            return this.http.post(this.env.api + "/cliente", cliente, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/cliente/"+ cliente.clienteId, cliente, opts).pipe(map(res => res));
        }
    }

    deleteCliente(cliente){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/cliente/"+cliente.clienteId, opts).pipe(map(res => res));
    }

    getClienteById(clienteId){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/idcliente/"+clienteId, opts).pipe(map(res => res.json()));
    }

    resetCliente(): Cliente {
        this.clear();
        return this.cliente;
    }

    getCliente(): Cliente {
        var cliente: Cliente = {
		nombre: this.cliente.nombre, 
		clave: this.cliente.clave, 
		clienteId: this.cliente.clienteId,
		clienteItem: this.cliente.clienteItem,
		etiquetaasignadaId: this.cliente.etiquetaasignadaId,
		etiquetaasignadaItem: this.cliente.etiquetaasignadaItem,
		ordensimplificadaId: this.cliente.ordensimplificadaId,
		ordensimplificadaItem: this.cliente.ordensimplificadaItem
        };
        return cliente;
    }

setCliente(cliente: Cliente) {
       
		this.isClienteFormValid = true;
		this.cliente.nombre = cliente.nombre;  
		this.cliente.clave = cliente.clave;  
		this.cliente.clienteId = cliente.clienteId;
		this.cliente.clienteItem = cliente.clienteItem;
		this.cliente.etiquetaasignadaId = cliente.etiquetaasignadaId;
		this.cliente.etiquetaasignadaItem = cliente.etiquetaasignadaItem;
		this.cliente.ordensimplificadaId = cliente.ordensimplificadaId;
		this.cliente.ordensimplificadaItem = cliente.ordensimplificadaItem;
		this.cliente.clienteId = cliente.clienteId;
		this.cliente.clienteItem = cliente.clienteItem;
		this.validateCliente();
    }

    isFormValid() {
        return this.isClienteFormValid;
    }

    validateCliente() {

    }

    clear() {

			this.cliente.nombre = '';    
			this.cliente.clave = null;    

			this.cliente.clienteId = null;
			this.cliente.clienteItem = null;
			this.cliente.etiquetaasignadaId = null;
			this.cliente.etiquetaasignadaItem = null;
			this.cliente.ordensimplificadaId = null;
			this.cliente.ordensimplificadaItem = null;
			this.cliente.clienteId = null;
			this.cliente.clienteItem = null;
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

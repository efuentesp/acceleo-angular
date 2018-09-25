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
        cliente1Id: this.cliente.cliente1Id,
		cliente1Item: this.cliente.cliente1Item
        };
        return cliente;
    }

setCliente(cliente: Cliente) {
       
		this.isClienteFormValid = true;
		this.cliente.nombre = cliente.nombre;  
        this.cliente.clave = cliente.clave;  
        
		this.cliente.clienteId = cliente.clienteId;
        this.cliente.clienteItem = cliente.clienteItem;
        
		this.cliente.cliente1Id = cliente.cliente1Id;
		this.cliente.cliente1Item = cliente.cliente1Item;
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
            
			this.cliente.cliente1Id = null;
			this.cliente.cliente1Item = null;
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

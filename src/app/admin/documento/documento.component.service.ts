import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Documento }                           from '../documento/documento.component.model';
import { User } from '../user/user.component.model';
import { UserStorageComponent } from '../user/user-storage.component';

@Injectable()
export class DocumentoService {

    private isDocumentoFormValid: boolean = false;
    private env: any = environment;
    private documento = new Documento();
    private flag :boolean = false;
    private flagDelete :boolean = false;
    private storage: UserStorageComponent;

    public user: User = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private http: Http) {
    }

    getAllDocumento(){
		let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
      return this.http.get(this.env.api + "/documento", opts).pipe(map(res => res.json()));
    }

    getAllDocumentoByCandidato(id){
        let headers = new Headers;
         headers.append('Content-Type','application/json');
         headers.append('Authorization','Bearer ' + this.user.token+'');
         let opts = new RequestOptions({ headers: headers });
         return this.http.get(this.env.api + "/documento/candidato/"+id, opts).pipe(map(res => res.json()));
    }


    saveDocumento(documento){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });

        console.log('Documento', documento);

		if (!documento.documentoId){
            return this.http.post(this.env.api + "/documento", documento, opts).pipe(map(res => res));
        }else{
            return this.http.put(this.env.api + "/documento/"+ documento.documentoId, documento, opts).pipe(map(res => res));
        }
    }

    deleteDocumento(documento){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.delete(this.env.api + "/documento/"+documento.documentoId, opts).pipe(map(res => res));
    }

    getDocumentoById(documentoId){

        let headers = new Headers;
        headers.append('Content-Type','application/json');
        headers.append('Authorization','Bearer ' + this.user.token+'');
        let opts = new RequestOptions({ headers: headers });
        return this.http.get(this.env.api + "/iddocumento/"+documentoId, opts).pipe(map(res => res.json()));
    }


    resetDocumento(): Documento {
        this.clear();
        return this.documento;
    }

    getDocumento(): Documento {
        var documento: Documento = {
		nombre: this.documento.nombre,
		descripcion: this.documento.descripcion,
		size: this.documento.size,	
		documentoId: this.documento.documentoId,
		documentoItem: this.documento.documentoItem	
		
        };
        return documento;
    }

setDocumento(documento: Documento) {
       
        this.isDocumentoFormValid = true;
this.documento.nombre = documento.nombre;
this.documento.descripcion = documento.descripcion;
this.documento.size = documento.size;
        
		this.documento.documentoId = documento.documentoId;
		this.documento.documentoItem = documento.documentoItem;
		
		this.validateDocumento();
    }

    isFormValid() {
        return this.isDocumentoFormValid;
    }

    validateDocumento() {

    }

    clear() {
			this.documento.nombre = ''; 
			this.documento.descripcion = ''; 
			this.documento.size = null; 
    		
			this.documento.documentoId = null;
			this.documento.documentoItem = null;
			
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

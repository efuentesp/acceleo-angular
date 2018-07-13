import { Injectable }                              from '@angular/core';
import { environment }                             from "../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Genero }                           from '../genero/genero.component.model';

@Injectable()
export class GeneroService {

    private isGeneroFormValid: boolean = false;
    private env: any = environment;
    private genero = new Genero();

    constructor(private http: Http) {
    }

    getAllGenero(){
      return this.http.get(this.env.api + "/genero").map(res => res.json()).catch(GeneroService.handleError);
    }

    resetGenero(): Genero {
        this.clear();
        return this.genero;
    }

    getGenero(): Genero {
        var genero: Genero = {
					female: this.genero.female, 
					male: this.genero.male, 
					
					generoId: this.genero.generoId	

        };
        return genero;
    }

    setGenero(genero: Genero) {
       
	this.isGeneroFormValid = true;
			this.genero.female = genero.female;    
			this.genero.male = genero.male;    
			this.genero.generoId        = genero.generoId;
        	this.validateGenero();
    }

    isFormValid() {
        return this.isGeneroFormValid;
    }

    validateGenero() {

    }

    clear() {

			this.genero.female = '';    
			this.genero.male = '';    
			this.genero.generoId = null;
    }

    saveGenero(genero){

		if (!genero.generoId){
            return this.http.post(this.env.api + "/genero", genero).map(res => res);
        }else{
            return this.http.put(this.env.api + "/genero/"+genero.generoId, genero).map(res => res);
        }
     
    }

	private static handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
        if (error.status === 404) {
            errMsg = 'Resource was not found';
        } else {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = 'Error';
        }
    } else {
        errMsg = error.message ? error.message : error.toString();
    }

    return Observable.throw(errMsg);
    }
}

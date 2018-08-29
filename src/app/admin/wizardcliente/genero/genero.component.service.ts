import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Genero }                           from '../genero/genero.component.model';

@Injectable()
export class GeneroService {

    private isGeneroFormValid: boolean = false;
    private env: any = environment;
    private genero = new Genero();

    constructor(private http: Http) {
    }

    getAllGenero(){
      return this.http.get(this.env.api + "/genero").pipe(map(res => res.json()));
    }

    resetGenero(): Genero {
        this.clear();
        return this.genero;
    }

    getGenero(): Genero {
        var genero: Genero = {
					valor: this.genero.valor,     
					nombre: this.genero.nombre,     
					id: this.genero.id
        };
        return genero;
    }

    setGenero(genero: Genero) {

        this.isGeneroFormValid = true;

			this.genero.valor = genero.valor;    
			this.genero.nombre = genero.nombre;    
			this.genero.id        = genero.id;

        this.validateGenero();
    }

    isFormValid() {
        return this.isGeneroFormValid;
    }

    validateGenero() {

    }

    clear() {

			this.genero.valor = '';    
			this.genero.nombre = '';    
			this.genero.id = null;

    }

    saveGenero(genero){
      return this.http.post(this.env.api + "/genero", genero).pipe(map(res => res));
    }
}

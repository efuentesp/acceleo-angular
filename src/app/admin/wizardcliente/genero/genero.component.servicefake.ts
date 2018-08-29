import { Injectable }                              from '@angular/core';
import { environment }                             from "../../../../environments/environment";
import { Http, Response }                          from "@angular/http";
import { Headers, RequestOptions }                 from '@angular/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Genero }                           from '../genero/genero.component.model';
const GENEROS_API: string = "./assets/data/genero.json";

@Injectable()
export class GeneroFakeService {

    private isGeneroFormValid: boolean = false;
    private env: any = environment;
    private genero = new Genero();

    constructor(private http: Http) {
    }

    getAllGenero(){
      return this.http.get(GENEROS_API).pipe(map(res => res.json()));
    }

}

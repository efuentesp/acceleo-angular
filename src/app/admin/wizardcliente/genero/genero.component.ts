import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { GeneroService }                                  from '../genero/genero.component.service';
import { Genero }                                         from '../genero/genero.component.model';





@Component ({
    selector: 'app-view',
    templateUrl: './genero.component.html'
})

export class GeneroComponent implements OnInit {

    title = 'Nuevo Genero';
    generoList: Genero;
    genero: Genero;
    form: any;





    constructor(private router: Router, private generoService: GeneroService
) {}

    ngOnInit() {
        this.genero = this.generoService.getGenero();
        this.loadGeneros();


    }

    loadGeneros() {
      this.generoService.getAllGenero().subscribe(data => {
        if (data) {
          this.generoList = data;
        }
      }, error => {
        swal('Error...', 'An error occurred while calling the generos.', 'error');
      });
    }

    save(genero, modal){

      console.log('Next');
      /*
      this.generoService.saveGenero(this.genero).subscribe(res => {
        if (res.status == 201){
          swal('Success...', 'Genero save successfully.', 'success');
        }else{
          swal('Error...', 'Genero save unsuccessfully.', 'error');
        }

      } );*/
    }



	

}


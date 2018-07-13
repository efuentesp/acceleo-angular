import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { GeneroService }                                  from '../genero/genero.component.service';
import { Genero }                                         from '../genero/genero.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './genero_mgmnt.component.html'
})

export class GeneroMngComponent implements OnInit {

    title = 'Nuevo Genero';
    generoList: Genero;
    genero: Genero;
    form: any;

  	public busquedaGenero='';
	filterInputGenero = new FormControl();

    constructor(private router: Router, private generoService: GeneroService) {
	   	   this.filterInputGenero.valueChanges.subscribe(busquedaGenero => {
	         this.busquedaGenero = busquedaGenero;
	       });
	}

    ngOnInit() {

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
    save(genero){
      this.generoService.saveGenero(this.genero).subscribe(res => {
        if (res.status == 201){
          swal('Success...', 'Genero save successfully.', 'success');
        }else{
          swal('Error...', 'Genero save unsuccessfully.', 'error');
        }

      } );
    }
	

  add(){
    this.router.navigate(['/genero']);
  }

  setClickedRowgenero(index, genero){
	this.generoService.setGenero(genero);
    this.router.navigate(['/genero']);
  }

}


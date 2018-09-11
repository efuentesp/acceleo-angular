import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';

import { CuentabancariaService }                                  from '../../cuentabancaria/cuentabancaria.component.service';
import { Cuentabancaria }                                         from '../../cuentabancaria/cuentabancaria.component.model';

import { SocioService }                                  from '../../socio/socio.component.service';
import { Socio }                                         from '../../socio/socio.component.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component ({
    selector: 'app-view',
    templateUrl: './cuentabancaria-manage.component.html',
	styleUrls: ['./cuentabancaria-manage.component.css']
})

export class CuentabancariaManageComponent implements OnInit {

    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

    public title = 'Manage Cuentabancaria';
    public cuentabancariaList: Cuentabancaria [];
    public cuentabancaria: Cuentabancaria;

  	public busquedacuentabancaria='';
    public filterInputcuentabancaria = new FormControl();

 	public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));

    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;

	public socioList: Socio [];
    public socio: Socio;
	public socioAux: Socio;

	public busquedaSocio='';
	filterInputSocio = new FormControl();

    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private cuentabancariaService: CuentabancariaService
	,private socioService: SocioService
){


  	 this.filterInputSocio.valueChanges.subscribe(busquedaSocio => {
     this.busquedaSocio = busquedaSocio;
	   });

	}

    ngOnInit() {
      
	  // Get data user
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.valueName = this.user.username;
      this.token = this.user.token;

      this.cuentabancariaService.setEdit(false);
      this.cuentabancariaService.setDelete(false);

      this.loadCuentabancarias();
      this.habilita();

    }   

    loadCuentabancarias() {
      this.cuentabancariaService.getAllCuentabancaria().subscribe(data => {

		var datePipe = new DatePipe('en-US');

        if (data) {

          this.cuentabancariaList = data;

			this.cuentabancariaList.forEach(element => {

				Atributosocio

			//let datePipe     = new DatePipe('en-US');
			//let fechaDate    = datePipe.transform(element.fecha, 'yyyy-MM-dd');
            //element.fecha    = fechaDate;
            //element.fechaAux = this.parse(fechaDate);



				this.socioService.getSocioById(element.socioId).subscribe(dataAux => {
					if (dataAux) {
						this.socioAux = dataAux;
						element.socioItem = this.socioAux.







	      if (element.bancoId == 'b1'){
	          element.bancoItem = 'HSBC';
	      }
	      if (element.bancoId == 'b2'){
	          element.bancoItem = 'SANTANDER';
	      }
	      if (element.bancoId == 'b3'){
	          element.bancoItem = 'BBVA Bancomer';
	      }
	      if (element.bancoId == 'b4'){
	          element.bancoItem = 'BANAMEX';
	      }
	      if (element.bancoId == 'b5'){
	          element.bancoItem = 'BANORTE';
	      }











				}	
			});	
		});

        }
      }, error => {
        swal('Error...', 'An error occurred while calling the cuentabancarias.', 'error');
      });
    }

  add(){
    this.cuentabancariaService.clear();
    this.router.navigate([ '../createcuentabancaria' ], { relativeTo: this.route })
  }

  editar(cuentabancaria){
    this.cuentabancariaService.setCuentabancaria(cuentabancaria);
    this.cuentabancariaService.setEdit(true);
    this.cuentabancariaService.setDelete(false);
    this.router.navigate([ '../editcuentabancaria' ], { relativeTo: this.route })
  }

  eliminar(cuentabancaria){
    this.cuentabancariaService.setCuentabancaria(cuentabancaria);
    this.cuentabancariaService.setEdit(false);
    this.cuentabancariaService.setDelete(true);
    this.router.navigate([ '../editcuentabancaria' ], { relativeTo: this.route })
  }

  // Select row
  setClickedRowCuentabancaria(index, cuentabancaria){
    this.cuentabancariaService.setCuentabancaria(cuentabancaria);
    this.cuentabancariaService.setEdit(true);
    this.cuentabancariaService.setDelete(false);
    this.router.navigate([ '../editcuentabancaria' ], { relativeTo: this.route })
  }
  
  habilita(){
    this.userAdmin.authorities.forEach(element => {
      if (element.authority == 'ROLE_CUENTABANCARIADELETE'){
        this.deleteActive = true;
      }
      if (element.authority == 'ROLE_CUENTABANCARIACREATE'){
        this.createActive = true;
      }
      if (element.authority == 'ROLE_CUENTABANCARIAUPDATE'){
        this.updateActive = true;
      }
      if (element.authority == 'ROLE_CUENTABANCARIASEARCH'){
        this.searchActive = true;
      }
    });
  }

  // Parse to NgbDateStruct
    isNumber(value: any): boolean {
      return !isNaN(this.toInteger(value));
  }
 
  toInteger(value: any): number {
      return parseInt(`${value}`, 10);
  }
  parse(value: string): NgbDateStruct {
    if (value) {
        const dateParts = value.trim().split('-');
        if (dateParts.length === 1 && this.isNumber(dateParts[0])) {
            return {day: this.toInteger(dateParts[0]), month: null, year: null};
        } else if (dateParts.length === 2 && this.isNumber(dateParts[0]) && this.isNumber(dateParts[1])) {
            return {day: this.toInteger(dateParts[1]), month: this.toInteger(dateParts[0]), year: null};
        } else if (dateParts.length === 3 && this.isNumber(dateParts[0]) && this.isNumber(dateParts[1]) && this.isNumber(dateParts[2])) {
            return {day: this.toInteger(dateParts[2]), month: this.toInteger(dateParts[1]), year: this.toInteger(dateParts[0])};
        }
    }
    return null;
  }

}

import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';

import { TasadeinteresService }                                  from '../../tasadeinteres/tasadeinteres.component.service';
import { Tasadeinteres }                                         from '../../tasadeinteres/tasadeinteres.component.model';

import { EmpresaService }                                  from '../../empresa/empresa.component.service';
import { Empresa }                                         from '../../empresa/empresa.component.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component ({
    selector: 'app-view',
    templateUrl: './tasadeinteres-manage.component.html',
	styleUrls: ['./tasadeinteres-manage.component.css']
})

export class TasadeinteresManageComponent implements OnInit {

    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

    public title = 'Manage Tasadeinteres';
    public tasadeinteresList: Tasadeinteres [];
    public tasadeinteres: Tasadeinteres;

  	public busquedatasadeinteres='';
    public filterInputtasadeinteres = new FormControl();

 	public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));

    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;

	public empresaList: Empresa [];
    public empresa: Empresa;
	public empresaAux: Empresa;

	public busquedaEmpresa='';
	filterInputEmpresa = new FormControl();

    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private tasadeinteresService: TasadeinteresService
	,private empresaService: EmpresaService
){


  	 this.filterInputEmpresa.valueChanges.subscribe(busquedaEmpresa => {
     this.busquedaEmpresa = busquedaEmpresa;
	   });

	}

    ngOnInit() {
      
	  // Get data user
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.valueName = this.user.username;
      this.token = this.user.token;

      this.tasadeinteresService.setEdit(false);
      this.tasadeinteresService.setDelete(false);

      this.loadTasadeinteress();
      this.habilita();

    }   

    loadTasadeinteress() {
      this.tasadeinteresService.getAllTasadeinteres().subscribe(data => {
        if (data) {

      this.tasadeinteresList = data;
			this.tasadeinteresList.forEach(element => {

        let datePipe     = new DatePipe('en-US');
        let fechafinDate       = datePipe.transform(element.fechafin,    'yyyy-MM-dd');
        let fechainicioDate    = datePipe.transform(element.fechainicio,  'yyyy-MM-dd');
        
        element.fechainicio      = fechainicioDate;
        element.fechainicioAux   = this.parse(fechainicioDate);
        element.fechafin         = fechafinDate;
        element.fechafinAux      = this.parse(fechafinDate);
       
				this.empresaService.getEmpresaById(element.empresaId).subscribe(dataAux => {
					if (dataAux) {
						this.empresaAux = dataAux;
						element.empresaItem = this.empresaAux.clave;

		

		

		

		

		

		

		

		

		
				}	
			});	
		});

        }
      }, error => {
        swal('Error...', 'An error occurred while calling the tasadeinteress.', 'error');
      });
    }

  add(){
    this.tasadeinteresService.clear();
    this.router.navigate([ '../createtasadeinteres' ], { relativeTo: this.route })
  }

  editar(tasadeinteres){
    this.tasadeinteresService.setTasadeinteres(tasadeinteres);
    this.tasadeinteresService.setEdit(true);
    this.tasadeinteresService.setDelete(false);
    this.router.navigate([ '../edittasadeinteres' ], { relativeTo: this.route })
  }

  eliminar(tasadeinteres){
    this.tasadeinteresService.setTasadeinteres(tasadeinteres);
    this.tasadeinteresService.setEdit(false);
    this.tasadeinteresService.setDelete(true);
    this.router.navigate([ '../edittasadeinteres' ], { relativeTo: this.route })
  }

  // Select row
  setClickedRowTasadeinteres(index, tasadeinteres){
    this.tasadeinteresService.setTasadeinteres(tasadeinteres);
    this.tasadeinteresService.setEdit(true);
    this.tasadeinteresService.setDelete(false);
    this.router.navigate([ '../edittasadeinteres' ], { relativeTo: this.route })
  }
  
  habilita(){
    this.userAdmin.authorities.forEach(element => {
      if (element.authority == 'ROLE_TASADEINTERESDELETE'){
        this.deleteActive = true;
      }
      if (element.authority == 'ROLE_TASADEINTERESCREATE'){
        this.createActive = true;
      }
      if (element.authority == 'ROLE_TASADEINTERESUPDATE'){
        this.updateActive = true;
      }
      if (element.authority == 'ROLE_TASADEINTERESSEARCH'){
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

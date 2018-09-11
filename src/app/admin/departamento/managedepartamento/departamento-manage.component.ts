import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';

import { DepartamentoService }                                  from '../../departamento/departamento.component.service';
import { Departamento }                                         from '../../departamento/departamento.component.model';

import { EmpresaService }                                  from '../../empresa/empresa.component.service';
import { Empresa }                                         from '../../empresa/empresa.component.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component ({
    selector: 'app-view',
    templateUrl: './departamento-manage.component.html',
	styleUrls: ['./departamento-manage.component.css']
})

export class DepartamentoManageComponent implements OnInit {

    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

    public title = 'Manage Departamento';
    public departamentoList: Departamento [];
    public departamento: Departamento;

  	public busquedadepartamento='';
    public filterInputdepartamento = new FormControl();

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
				private departamentoService: DepartamentoService
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

      this.departamentoService.setEdit(false);
      this.departamentoService.setDelete(false);

      this.loadDepartamentos();
      this.habilita();

    }   

    loadDepartamentos() {
      this.departamentoService.getAllDepartamento().subscribe(data => {

		var datePipe = new DatePipe('en-US');

        if (data) {

          this.departamentoList = data;

			this.departamentoList.forEach(element => {

				Atributoempresa

			//let datePipe     = new DatePipe('en-US');
			//let fechaDate    = datePipe.transform(element.fecha, 'yyyy-MM-dd');
            //element.fecha    = fechaDate;
            //element.fechaAux = this.parse(fechaDate);



				this.empresaService.getEmpresaById(element.empresaId).subscribe(dataAux => {
					if (dataAux) {
						this.empresaAux = dataAux;
						element.empresaItem = this.empresaAux.
















				}	
			});	
		});

        }
      }, error => {
        swal('Error...', 'An error occurred while calling the departamentos.', 'error');
      });
    }

  add(){
    this.departamentoService.clear();
    this.router.navigate([ '../createdepartamento' ], { relativeTo: this.route })
  }

  editar(departamento){
    this.departamentoService.setDepartamento(departamento);
    this.departamentoService.setEdit(true);
    this.departamentoService.setDelete(false);
    this.router.navigate([ '../editdepartamento' ], { relativeTo: this.route })
  }

  eliminar(departamento){
    this.departamentoService.setDepartamento(departamento);
    this.departamentoService.setEdit(false);
    this.departamentoService.setDelete(true);
    this.router.navigate([ '../editdepartamento' ], { relativeTo: this.route })
  }

  // Select row
  setClickedRowDepartamento(index, departamento){
    this.departamentoService.setDepartamento(departamento);
    this.departamentoService.setEdit(true);
    this.departamentoService.setDelete(false);
    this.router.navigate([ '../editdepartamento' ], { relativeTo: this.route })
  }
  
  habilita(){
    this.userAdmin.authorities.forEach(element => {
      if (element.authority == 'ROLE_DEPARTAMENTODELETE'){
        this.deleteActive = true;
      }
      if (element.authority == 'ROLE_DEPARTAMENTOCREATE'){
        this.createActive = true;
      }
      if (element.authority == 'ROLE_DEPARTAMENTOUPDATE'){
        this.updateActive = true;
      }
      if (element.authority == 'ROLE_DEPARTAMENTOSEARCH'){
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

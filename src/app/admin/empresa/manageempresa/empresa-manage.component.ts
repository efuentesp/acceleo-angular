import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';

import { EmpresaService }                                  from '../../empresa/empresa.component.service';
import { Empresa }                                         from '../../empresa/empresa.component.model';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component ({
    selector: 'app-view',
    templateUrl: './empresa-manage.component.html',
	styleUrls: ['./empresa-manage.component.css']
})

export class EmpresaManageComponent implements OnInit {

    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

    public title = 'Manage Empresa';
    public empresaList: Empresa [];
    public empresa: Empresa;

  	public busquedaempresa='';
    public filterInputempresa = new FormControl();

 	public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));

    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;


    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private empresaService: EmpresaService
){



	}

    ngOnInit() {
      
	  // Get data user
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.valueName = this.user.username;
      this.token = this.user.token;

      this.empresaService.setEdit(false);
      this.empresaService.setDelete(false);

      this.loadEmpresas();
      this.habilita();

    }   

    loadEmpresas() {
      this.empresaService.getAllEmpresa().subscribe(data => {

		var datePipe = new DatePipe('en-US');

        if (data) {

          this.empresaList = data;

        }
      }, error => {
        swal('Error...', 'An error occurred while calling the empresas.', 'error');
      });
    }

  add(){
    this.empresaService.clear();
    this.router.navigate([ '../createempresa' ], { relativeTo: this.route })
  }

  editar(empresa){
    this.empresaService.setEmpresa(empresa);
    this.empresaService.setEdit(true);
    this.empresaService.setDelete(false);
    this.router.navigate([ '../editempresa' ], { relativeTo: this.route })
  }

  eliminar(empresa){
    this.empresaService.setEmpresa(empresa);
    this.empresaService.setEdit(false);
    this.empresaService.setDelete(true);
    this.router.navigate([ '../editempresa' ], { relativeTo: this.route })
  }

  // Select row
  setClickedRowEmpresa(index, empresa){
    this.empresaService.setEmpresa(empresa);
    this.empresaService.setEdit(true);
    this.empresaService.setDelete(false);
    this.router.navigate([ '../editempresa' ], { relativeTo: this.route })
  }
  
  habilita(){
    this.userAdmin.authorities.forEach(element => {
      if (element.authority == 'ROLE_EMPRESADELETE'){
        this.deleteActive = true;
      }
      if (element.authority == 'ROLE_EMPRESACREATE'){
        this.createActive = true;
      }
      if (element.authority == 'ROLE_EMPRESAUPDATE'){
        this.updateActive = true;
      }
      if (element.authority == 'ROLE_EMPRESASEARCH'){
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

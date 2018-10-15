import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';

import { ReclutadorService }                                  from '../../reclutador/reclutador.component.service';
import { Reclutador }                                         from '../../reclutador/reclutador.component.model';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component ({
    selector: 'app-view',
    templateUrl: './reclutador-manage.component.html',
	styleUrls: ['./reclutador-manage.component.css']
})

export class ReclutadorManageComponent implements OnInit {

    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

    public title = 'Manage Reclutador';
    public reclutadorList: Reclutador [];
    public reclutador: Reclutador;

  	public busquedareclutador='';
    public filterInputreclutador = new FormControl();

 	public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));

    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;

    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private reclutadorService:ReclutadorService
){
	
	
}

    ngOnInit() {
      
	  // Get data user
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.valueName = this.user.username;
      this.token = this.user.token;

      this.reclutadorService.setEdit(false);
      this.reclutadorService.setDelete(false);

      this.loadReclutador();
      this.habilita();

    }   
    
loadReclutador(){
    this.reclutadorService.getAllReclutador().subscribe(data => {
        if (data) {
            this.reclutadorList = data;
        }
    }, error => {
    swal('Error...', 'An error occurred while calling the reclutadors.', 'error');
    });
}


add(){
	this.reclutadorService.clear();
	this.router.navigate([ '../createreclutador' ], { relativeTo: this.route })
}


editar(reclutador){
	this.reclutadorService.setReclutador(reclutador);
	this.reclutadorService.setEdit(true);
	this.reclutadorService.setDelete(false);
	this.router.navigate([ '../editreclutador' ], { relativeTo: this.route })
}


eliminar(reclutador){
	this.reclutadorService.setReclutador(reclutador);
	this.reclutadorService.setEdit(false);
	this.reclutadorService.setDelete(true);
	this.router.navigate([ '../editreclutador' ], { relativeTo: this.route })
}

  // Select row
  setClickedRowReclutador(index, reclutador){
    this.reclutadorService.setReclutador(reclutador);
    this.reclutadorService.setEdit(true);
    this.reclutadorService.setDelete(false);
    this.router.navigate([ '../editreclutador' ], { relativeTo: this.route })
  }
  
  habilita(){
    this.userAdmin.authorities.forEach(element => {
if (element.authority == 'ROLE_RECLUTADORDELETE'){
	this.deleteActive = true;
}
if (element.authority == 'ROLE_RECLUTADORCREATE'){
this.createActive = true;
}
if (element.authority == 'ROLE_RECLUTADORUPDATE'){
	this.updateActive = true;
}
if (element.authority == 'ROLE_ORDENSIMPLIFICADASEARCH'){
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


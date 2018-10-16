import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';

import { DireccionService }                                  from '../../direccion/direccion.component.service';
import { Direccion }                                         from '../../direccion/direccion.component.model';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component ({
    selector: 'app-view',
    templateUrl: './direccion-manage.component.html',
	styleUrls: ['./direccion-manage.component.css']
})

export class DireccionManageComponent implements OnInit {

    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

    public title = 'Manage Direccion';
    public direccionList: Direccion [];
    public direccion: Direccion;

  	public busquedadireccion='';
    public filterInputdireccion = new FormControl();

 	public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));

    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;

    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private direccionService:DireccionService
){
	
	
}

    ngOnInit() {
      
	  // Get data user
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.valueName = this.user.username;
      this.token = this.user.token;

      this.direccionService.setEdit(false);
      this.direccionService.setDelete(false);

      this.loadDireccion();
      this.habilita();

    }   
    
loadDireccion(){
    this.direccionService.getAllDireccion().subscribe(data => {
        if (data) {
            this.direccionList = data;
				
        }
    }, error => {
    swal('Error...', 'An error occurred while calling the direccions.', 'error');
    });
}


add(){
	this.direccionService.clear();
	this.router.navigate([ '../createdireccion' ], { relativeTo: this.route })
}


editar(direccion){
	this.direccionService.setDireccion(direccion);
	this.direccionService.setEdit(true);
	this.direccionService.setDelete(false);
	this.router.navigate([ '../editdireccion' ], { relativeTo: this.route })
}


eliminar(direccion){
	this.direccionService.setDireccion(direccion);
	this.direccionService.setEdit(false);
	this.direccionService.setDelete(true);
	this.router.navigate([ '../editdireccion' ], { relativeTo: this.route })
}

  // Select row
  setClickedRowDireccion(index, direccion){
    this.direccionService.setDireccion(direccion);
    this.direccionService.setEdit(true);
    this.direccionService.setDelete(false);
    this.router.navigate([ '../editdireccion' ], { relativeTo: this.route })
  }
  
  habilita(){
    this.userAdmin.authorities.forEach(element => {
if (element.authority == 'ROLE_DIRECCIONDELETE'){
	this.deleteActive = true;
}
if (element.authority == 'ROLE_DIRECCIONCREATE'){
this.createActive = true;
}
if (element.authority == 'ROLE_DIRECCIONUPDATE'){
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

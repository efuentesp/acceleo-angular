import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';

import { RolService }                                  from '../../rol/rol.component.service';
import { Rol }                                         from '../../rol/rol.component.model';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component ({
    selector: 'app-view',
    templateUrl: './rol-manage.component.html',
	styleUrls: ['./rol-manage.component.css']
})

export class RolManageComponent implements OnInit {

    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

    public title = 'Manage Rol';
    public rolList: Rol [];
    public rol: Rol;

  	public busquedarol='';
    public filterInputrol = new FormControl();

 	public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));

    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;


    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private rolService: RolService
){



	}

    ngOnInit() {
      
	  // Get data user
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.valueName = this.user.username;
      this.token = this.user.token;

      this.rolService.setEdit(false);
      this.rolService.setDelete(false);

      this.loadRols();
      this.habilita();

    }   

    loadRols() {
      this.rolService.getAllRol().subscribe(data => {

		var datePipe = new DatePipe('en-US');

        if (data) {

          this.rolList = data;

        }
      }, error => {
        swal('Error...', 'An error occurred while calling the rols.', 'error');
      });
    }

  add(){
    this.rolService.clear();
    this.router.navigate([ '../createrol' ], { relativeTo: this.route })
  }

  editar(rol){
    this.rolService.setRol(rol);
    this.rolService.setEdit(true);
    this.rolService.setDelete(false);
    this.router.navigate([ '../editrol' ], { relativeTo: this.route })
  }

  eliminar(rol){
    this.rolService.setRol(rol);
    this.rolService.setEdit(false);
    this.rolService.setDelete(true);
    this.router.navigate([ '../editrol' ], { relativeTo: this.route })
  }

  // Select row
  setClickedRowRol(index, rol){
    this.rolService.setRol(rol);
    this.rolService.setEdit(true);
    this.rolService.setDelete(false);
    this.router.navigate([ '../editrol' ], { relativeTo: this.route })
  }
  
  habilita(){
    this.userAdmin.authorities.forEach(element => {
      if (element.authority == 'ROLE_ROLDELETE'){
        this.deleteActive = true;
      }
      if (element.authority == 'ROLE_ROLCREATE'){
        this.createActive = true;
      }
      if (element.authority == 'ROLE_ROLUPDATE'){
        this.updateActive = true;
      }
      if (element.authority == 'ROLE_ROLSEARCH'){
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

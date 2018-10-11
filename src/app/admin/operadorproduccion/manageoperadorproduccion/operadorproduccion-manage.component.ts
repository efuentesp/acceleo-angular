import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';

import { OperadorproduccionService }                                  from '../../operadorproduccion/operadorproduccion.component.service';
import { Operadorproduccion }                                         from '../../operadorproduccion/operadorproduccion.component.model';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component ({
    selector: 'app-view',
    templateUrl: './operadorproduccion-manage.component.html',
	styleUrls: ['./operadorproduccion-manage.component.css']
})

export class OperadorproduccionManageComponent implements OnInit {

    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

    public title = 'Manage Operadorproduccion';
    public operadorproduccionList: Operadorproduccion [];
    public operadorproduccion: Operadorproduccion;

  	public busquedaoperadorproduccion='';
    public filterInputoperadorproduccion = new FormControl();

 	public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));

    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;


    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private operadorproduccionService: OperadorproduccionService
){



	}

    ngOnInit() {
      
	  // Get data user
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.valueName = this.user.username;
      this.token = this.user.token;

      this.operadorproduccionService.setEdit(false);
      this.operadorproduccionService.setDelete(false);

      this.loadOperadorproduccions();
      this.habilita();

    }   

    loadOperadorproduccions() {
      this.operadorproduccionService.getAllOperadorproduccion().subscribe(data => {

		var datePipe = new DatePipe('en-US');

        if (data) {

          this.operadorproduccionList = data;

        }
      }, error => {
        swal('Error...', 'An error occurred while calling the operadorproduccions.', 'error');
      });
    }

  add(){
    this.operadorproduccionService.clear();
    this.router.navigate([ '../createoperadorproduccion' ], { relativeTo: this.route })
  }

  editar(operadorproduccion){
    this.operadorproduccionService.setOperadorproduccion(operadorproduccion);
    this.operadorproduccionService.setEdit(true);
    this.operadorproduccionService.setDelete(false);
    this.router.navigate([ '../editoperadorproduccion' ], { relativeTo: this.route })
  }

  eliminar(operadorproduccion){
    this.operadorproduccionService.setOperadorproduccion(operadorproduccion);
    this.operadorproduccionService.setEdit(false);
    this.operadorproduccionService.setDelete(true);
    this.router.navigate([ '../editoperadorproduccion' ], { relativeTo: this.route })
  }

  // Select row
  setClickedRowOperadorproduccion(index, operadorproduccion){
    this.operadorproduccionService.setOperadorproduccion(operadorproduccion);
    this.operadorproduccionService.setEdit(true);
    this.operadorproduccionService.setDelete(false);
    this.router.navigate([ '../editoperadorproduccion' ], { relativeTo: this.route })
  }
  
  habilita(){
    this.userAdmin.authorities.forEach(element => {
      if (element.authority == 'ROLE_OPERADORPRODUCCIONDELETE'){
        this.deleteActive = true;
      }
      if (element.authority == 'ROLE_OPERADORPRODUCCIONCREATE'){
        this.createActive = true;
      }
      if (element.authority == 'ROLE_OPERADORPRODUCCIONUPDATE'){
        this.updateActive = true;
      }
      if (element.authority == 'ROLE_OPERADORPRODUCCIONSEARCH'){
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

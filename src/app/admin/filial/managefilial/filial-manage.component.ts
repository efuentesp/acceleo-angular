import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';

import { FilialService }                                  from '../../filial/filial.component.service';
import { Filial }                                         from '../../filial/filial.component.model';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component ({
    selector: 'app-view',
    templateUrl: './filial-manage.component.html',
	styleUrls: ['./filial-manage.component.css']
})

export class FilialManageComponent implements OnInit {

    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

    public title = 'Manage Filial';
    public filialList: Filial [];
    public filial: Filial;

  	public busquedafilial='';
    public filterInputfilial = new FormControl();

 	public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));

    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;

    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private filialService:FilialService
){
	
	
}

    ngOnInit() {
      
	  // Get data user
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.valueName = this.user.username;
      this.token = this.user.token;

      this.filialService.setEdit(false);
      this.filialService.setDelete(false);

      this.loadFilial();
      this.habilita();

    }   
    
loadFilial(){
    this.filialService.getAllFilial().subscribe(data => {
        if (data) {
            this.filialList = data;
        }
    }, error => {
    swal('Error...', 'An error occurred while calling the filials.', 'error');
    });
}


add(){
	this.filialService.clear();
	this.router.navigate([ '../createfilial' ], { relativeTo: this.route })
}


editar(filial){
	this.filialService.setFilial(filial);
	this.filialService.setEdit(true);
	this.filialService.setDelete(false);
	this.router.navigate([ '../editfilial' ], { relativeTo: this.route })
}


eliminar(filial){
	this.filialService.setFilial(filial);
	this.filialService.setEdit(false);
	this.filialService.setDelete(true);
	this.router.navigate([ '../editfilial' ], { relativeTo: this.route })
}

  // Select row
  setClickedRowFilial(index, filial){
    this.filialService.setFilial(filial);
    this.filialService.setEdit(true);
    this.filialService.setDelete(false);
    this.router.navigate([ '../editfilial' ], { relativeTo: this.route })
  }
  
  habilita(){
    this.userAdmin.authorities.forEach(element => {
if (element.authority == 'ROLE_FILIALDELETE'){
	this.deleteActive = true;
}
if (element.authority == 'ROLE_FILIALCREATE'){
this.createActive = true;
}
if (element.authority == 'ROLE_FILIALUPDATE'){
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

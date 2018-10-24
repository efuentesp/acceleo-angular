import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute, Params}                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';

import { PuestoService }                                  from '../../puesto/puesto.component.service';
import { Puesto }                                         from '../../puesto/puesto.component.model';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


@Component ({
    selector: 'app-view',
    templateUrl: './puesto-manage.component.html',
	styleUrls: ['./puesto-manage.component.css']
})

export class PuestoManageComponent implements OnInit {

    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

    public title = 'Manage Puesto';
    public puestoList: Puesto [];
    public puesto: Puesto;

  	public busquedaPuesto='';
    public filterInputPuesto = new FormControl();
    datePipe = new DatePipe('en-US');

 	public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));


    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;
    

// data  
public link: string = '';

    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private puestoService:PuestoService
){
			this.filterInputPuesto.valueChanges.subscribe(busquedaPuesto => {
		  	  	this.busquedaPuesto = busquedaPuesto;
		  	  });
}

    ngOnInit() {
      
	  // Get data user
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.valueName = this.user.username;
      this.token = this.user.token;

      this.puestoService.setEdit(false);
      this.puestoService.setDelete(false);
    
      this.habilita();
      this.getParams();

    }   
    
loadPuesto(){
    this.puestoService.getAllPuesto().subscribe(data => {
        if (data) {
            this.puestoList = data;
            
            // Grid Values
this.puestoList.forEach(element => {
      	if (element.puestosId == 'a'){
      	    element.puestosItem = "Promotor de cambaceo";
      	}		
      	if (element.puestosId == 'b'){
      	    element.puestosItem = "Valuador";
      	}		
      	if (element.puestosId == 'c'){
      	    element.puestosItem = "Mecanógrafo";
      	}		
      	if (element.puestosId == 'd'){
      	    element.puestosItem = "Expendedor";
      	}		
      	if (element.puestosId == 'e'){
      	    element.puestosItem = "Almacenista";
      	}		
      	if (element.puestosId == 'f'){
      	    element.puestosItem = "Mozo";
      	}		
      	if (element.puestosId == 'g'){
      	    element.puestosItem = "Cajero";
      	}		
});
        }
    }, error => {
    swal('Error...', 'An error occurred while calling the puestos.', 'error');
    });
}


add(){
	this.puestoService.clear();
	this.router.navigate([ '../createpuesto' ], { relativeTo: this.route })
}


editar(puesto){
	this.puestoService.setPuesto(puesto);
	this.puestoService.setEdit(true);
	this.puestoService.setDelete(false);
	this.router.navigate([ '../editpuesto' ], { relativeTo: this.route })
}


eliminar(puesto){
	this.puestoService.setPuesto(puesto);
	this.puestoService.setEdit(false);
	this.puestoService.setDelete(true);
	this.router.navigate([ '../editpuesto' ], { relativeTo: this.route })
}

  // Select row
  setClickedRowPuesto(index, puesto){
    this.puestoService.setPuesto(puesto);
    this.puestoService.setEdit(true);
    this.puestoService.setDelete(false);
    this.router.navigate([ '../editpuesto' ], { relativeTo: this.route })
  }
  
  habilita(){
    this.userAdmin.authorities.forEach(element => {
if (element.authority == 'ROLE_PUESTODELETE'){
	this.deleteActive = true;
}
if (element.authority == 'ROLE_PUESTOCREATE'){
this.createActive = true;
}
if (element.authority == 'ROLE_PUESTOUPDATE'){
	this.updateActive = true;
}
if (element.authority == 'ROLE_PUESTOSEARCH'){
	this.searchActive = true;
}

 // Children with one to many
	
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
  
  	
  	  getParams(){
  	    this.route.params.subscribe((params: Params) => {
  	        this.link = params['link'];
  	        
  	
  	        if (!this.link){
  	            this.loadPuesto();
  	        }else{
  	        	
  	        }
  	        
  	    });
  	  }
  	  
  	
}

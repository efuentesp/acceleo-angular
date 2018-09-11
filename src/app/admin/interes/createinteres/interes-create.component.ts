import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { InteresService }                                  from '../../interes/interes.component.service';
import { Interes }                                         from '../../interes/interes.component.model';

import { CuentadeahorroService }                                  from '../../cuentadeahorro/cuentadeahorro.component.service';
import { Cuentadeahorro }                                         from '../../cuentadeahorro/cuentadeahorro.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './interes-create.component.html',
	styleUrls: ['./interes-create.component.css']
})

export class InteresCreateComponent implements OnInit {

    public title = 'Nuevo Interes';
    public interes: Interes;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;
	public datePipe = new DatePipe('en-US');

	public cuentadeahorroList: Cuentadeahorro [];
    public cuentadeahorro: Cuentadeahorro;
    public cuentadeahorroAux: Cuentadeahorro;

	public busquedaCuentadeahorro='';
	filterInputCuentadeahorro = new FormControl();


    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private parserFormatter: NgbDateParserFormatter,
				private interesService: InteresService
	,private cuentadeahorroService: CuentadeahorroService
){
  	 this.filterInputCuentadeahorro.valueChanges.subscribe(busquedaCuentadeahorro => {
     this.busquedaCuentadeahorro = busquedaCuentadeahorro;
   });
	}

    ngOnInit() {
		this.interesService.clear();
        this.interes = new Interes;

		this.loadCuentadeahorros();
       
    } 

save(){

	this.interes.fecha = this.parserFormatter.format(this.interes.fechaAux);

   this.interesService.saveInteres(this.interes).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Interes save successfully.', 'success');
        this.router.navigate([ '../manageinteres' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Interes.', 'error');
     }else{
       swal('Error...', 'Interes save unsuccessfully.', 'error');
     }
   } );
}


	loadCuentadeahorros(){
  		this.cuentadeahorroService.getAllCuentadeahorro().subscribe(data => {
    	if (data) {
      	
		this.cuentadeahorroList = data;
// Cambios por cada modal
    	}
  		}, error => {
    	swal('Error...', 'An error occurred while calling the Cuentadeahorros.', 'error');
  	});



}

 setClickedRowCuentadeahorro(index,cuentadeahorro){
	      
		  cuentadeahorro.checked = !cuentadeahorro.checked;
		  if (cuentadeahorro.checked){
		  this.cuentadeahorroService.setCuentadeahorro(cuentadeahorro);
		  this.interes.cuentadeahorroId = cuentadeahorro.cuentadeahorroId;
		  this.interes.cuentadeahorroItem = cuentadeahorro.
	    	}else{
            this.cuentadeahorroService.clear();
			this.interes.cuentadeahorroId = null;
		    this.interes.cuentadeahorroItem = "";
		}
 }

  return(interes){
      this.location.back();
  }
}

import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { AportacionService }                                  from '../../aportacion/aportacion.component.service';
import { Aportacion }                                         from '../../aportacion/aportacion.component.model';

import { CuentadeahorroService }                                  from '../../cuentadeahorro/cuentadeahorro.component.service';
import { Cuentadeahorro }                                         from '../../cuentadeahorro/cuentadeahorro.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './aportacion-create.component.html',
	styleUrls: ['./aportacion-create.component.css']
})

export class AportacionCreateComponent implements OnInit {

    public title = 'Nuevo Aportacion';
    public aportacion: Aportacion;
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
				private aportacionService: AportacionService
	,private cuentadeahorroService: CuentadeahorroService
){
  	 this.filterInputCuentadeahorro.valueChanges.subscribe(busquedaCuentadeahorro => {
     this.busquedaCuentadeahorro = busquedaCuentadeahorro;
   });
	}

    ngOnInit() {
		this.aportacionService.clear();
        this.aportacion = new Aportacion;

		this.loadCuentadeahorros();
       
    } 

save(){

	this.aportacion.fecha = this.parserFormatter.format(this.aportacion.fechaAux);

   this.aportacionService.saveAportacion(this.aportacion).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Aportacion save successfully.', 'success');
        this.router.navigate([ '../manageaportacion' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Aportacion.', 'error');
     }else{
       swal('Error...', 'Aportacion save unsuccessfully.', 'error');
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
		  this.aportacion.cuentadeahorroId = cuentadeahorro.cuentadeahorroId;
		  this.aportacion.cuentadeahorroItem = cuentadeahorro.
	    	}else{
            this.cuentadeahorroService.clear();
			this.aportacion.cuentadeahorroId = null;
		    this.aportacion.cuentadeahorroItem = "";
		}
 }

  return(aportacion){
      this.location.back();
  }
}

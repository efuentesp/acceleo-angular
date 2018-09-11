import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { CuentadeahorroService }                                  from '../../cuentadeahorro/cuentadeahorro.component.service';
import { Cuentadeahorro }                                         from '../../cuentadeahorro/cuentadeahorro.component.model';

import { SocioService }                                  from '../../socio/socio.component.service';
import { Socio }                                         from '../../socio/socio.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './cuentadeahorro-create.component.html',
	styleUrls: ['./cuentadeahorro-create.component.css']
})

export class CuentadeahorroCreateComponent implements OnInit {

    public title = 'Nuevo Cuentadeahorro';
    public cuentadeahorro: Cuentadeahorro;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;
	public datePipe = new DatePipe('en-US');

	public socioList: Socio [];
    public socio: Socio;
    public socioAux: Socio;

	public busquedaSocio='';
	filterInputSocio = new FormControl();


    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private parserFormatter: NgbDateParserFormatter,
				private cuentadeahorroService: CuentadeahorroService
	,private socioService: SocioService
){
  	 this.filterInputSocio.valueChanges.subscribe(busquedaSocio => {
     this.busquedaSocio = busquedaSocio;
   });
	}

    ngOnInit() {
		this.cuentadeahorroService.clear();
        this.cuentadeahorro = new Cuentadeahorro;

		this.loadSocios();
       
    } 

save(){

	this.cuentadeahorro.fechacontratacion = this.parserFormatter.format(this.cuentadeahorro.fechacontratacionAux);
	this.cuentadeahorro.fechavencimiento = this.parserFormatter.format(this.cuentadeahorro.fechavencimientoAux);
	this.cuentadeahorro.fechadisponibilidad = this.parserFormatter.format(this.cuentadeahorro.fechadisponibilidadAux);

   this.cuentadeahorroService.saveCuentadeahorro(this.cuentadeahorro).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Cuentadeahorro save successfully.', 'success');
        this.router.navigate([ '../managecuentadeahorro' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Cuentadeahorro.', 'error');
     }else{
       swal('Error...', 'Cuentadeahorro save unsuccessfully.', 'error');
     }
   } );
}


	loadSocios(){
  		this.socioService.getAllSocio().subscribe(data => {
    	if (data) {
      	
		this.socioList = data;
// Cambios por cada modal
    	}
  		}, error => {
    	swal('Error...', 'An error occurred while calling the Socios.', 'error');
  	});



}

 setClickedRowSocio(index,socio){
	      
		  socio.checked = !socio.checked;
		  if (socio.checked){
		  this.socioService.setSocio(socio);
		  this.cuentadeahorro.socioId = socio.socioId;
		  this.cuentadeahorro.socioItem = socio.
	    	}else{
            this.socioService.clear();
			this.cuentadeahorro.socioId = null;
		    this.cuentadeahorro.socioItem = "";
		}
 }

  return(cuentadeahorro){
      this.location.back();
  }
}

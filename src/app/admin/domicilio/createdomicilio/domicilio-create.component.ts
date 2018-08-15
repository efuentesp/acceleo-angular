import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';

import { DomicilioService }                                  from '../../domicilio/domicilio.component.service';
import { Domicilio }                                         from '../../domicilio/domicilio.component.model';

import { SocioService }                                  from '../../socio/socio.component.service';
import { Socio }                                         from '../../socio/socio.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './domicilio-create.component.html',
	styleUrls: ['./domicilio-create.component.css']
})

export class DomicilioCreateComponent implements OnInit {

    public title = 'Nuevo Domicilio';
    public domicilio: Domicilio;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public deList: Socio [];
    public de: Socio;
    public deAux: Socio;

	public busquedaSocio='';
	filterInputSocio = new FormControl();


    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private domicilioService: DomicilioService
	,private deService: SocioService
){
  	 this.filterInputSocio.valueChanges.subscribe(busquedaSocio => {
     this.busquedaSocio = busquedaSocio;
   });
	}

    ngOnInit() {
		this.domicilioService.clear();
        this.domicilio = new Domicilio;

		this.loadDes();
       
    } 

save(){
   this.domicilioService.saveDomicilio(this.domicilio).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Domicilio save successfully.', 'success');
        this.router.navigate([ '../managedomicilio' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Domicilio.', 'error');
     }else{
       swal('Error...', 'Domicilio save unsuccessfully.', 'error');
     }
   } );
}


	loadDes(){
  		this.deService.getAllSocio().subscribe(data => {
    	if (data) {
      	
		this.deList = data;
// Cambios por cada modal
    	}
  		}, error => {
    	swal('Error...', 'An error occurred while calling the Socios.', 'error');
  	});
}

 setClickedRowDe(index,de){
	      
		  de.checked = !de.checked;
		  if (de.checked){
		  this.deService.setSocio(de);
		  this.domicilio.deId = de.deId;
		  //this.domicilio.deItem = de.Item;

	    	}else{
            this.deService.clear();
			this.domicilio.deId = null;
		    this.domicilio.deItem = "";
		}
 }

  return(domicilio){
      this.location.back();
  }
}

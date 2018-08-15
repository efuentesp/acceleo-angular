import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';

import { CuentabancariaService }                                  from '../../cuentabancaria/cuentabancaria.component.service';
import { Cuentabancaria }                                         from '../../cuentabancaria/cuentabancaria.component.model';

import { SocioService }                                  from '../../socio/socio.component.service';
import { Socio }                                         from '../../socio/socio.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './cuentabancaria-create.component.html',
	styleUrls: ['./cuentabancaria-create.component.css']
})

export class CuentabancariaCreateComponent implements OnInit {

    public title = 'Nuevo Cuentabancaria';
    public cuentabancaria: Cuentabancaria;
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
				private cuentabancariaService: CuentabancariaService
	,private deService: SocioService
){
  	 this.filterInputSocio.valueChanges.subscribe(busquedaSocio => {
     this.busquedaSocio = busquedaSocio;
   });
	}

    ngOnInit() {
		this.cuentabancariaService.clear();
        this.cuentabancaria = new Cuentabancaria;

		this.loadDes();
       
    } 

save(){
   this.cuentabancariaService.saveCuentabancaria(this.cuentabancaria).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Cuentabancaria save successfully.', 'success');
        this.router.navigate([ '../managecuentabancaria' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Cuentabancaria.', 'error');
     }else{
       swal('Error...', 'Cuentabancaria save unsuccessfully.', 'error');
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
		  this.cuentabancaria.deId = de.deId;
		  //this.cuentabancaria.deItem = de.Item;

	    	}else{
            this.deService.clear();
			this.cuentabancaria.deId = null;
		    this.cuentabancaria.deItem = "";
		}
 }

  return(cuentabancaria){
      this.location.back();
  }
}

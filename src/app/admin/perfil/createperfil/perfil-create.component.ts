import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';

import { PerfilService }                                  from '../../perfil/perfil.component.service';
import { Perfil }                                         from '../../perfil/perfil.component.model';

import { SocioService }                                  from '../../socio/socio.component.service';
import { Socio }                                         from '../../socio/socio.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './perfil-create.component.html',
	styleUrls: ['./perfil-create.component.css']
})

export class PerfilCreateComponent implements OnInit {

    public title = 'Nuevo Perfil';
    public perfil: Perfil;
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
				private perfilService: PerfilService
	,private deService: SocioService
){
  	 this.filterInputSocio.valueChanges.subscribe(busquedaSocio => {
     this.busquedaSocio = busquedaSocio;
   });
	}

    ngOnInit() {
		this.perfilService.clear();
        this.perfil = new Perfil;

		this.loadDes();
       
    } 

save(){
   this.perfilService.savePerfil(this.perfil).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Perfil save successfully.', 'success');
        this.router.navigate([ '../manageperfil' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Perfil.', 'error');
     }else{
       swal('Error...', 'Perfil save unsuccessfully.', 'error');
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
		  this.perfil.deId = de.deId;
		  //this.perfil.deItem = de.Item;

	    	}else{
            this.deService.clear();
			this.perfil.deId = null;
		    this.perfil.deItem = "";
		}
 }

  return(perfil){
      this.location.back();
  }
}

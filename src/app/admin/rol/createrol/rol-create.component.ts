import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';
import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CustomNgbDateParserFormatter } from '../../../dateformat';

import { RolService }                                  from '../../rol/rol.component.service';
import { Rol }                                         from '../../rol/rol.component.model';


@Component ({
    selector: 'app-view',
    templateUrl: './rol-create.component.html',
	styleUrls: ['./rol-create.component.css']
})

export class RolCreateComponent implements OnInit {

   public title = 'Nuevo Rol';
   public rolform: any;
   public user: User;
   public valueName: string;
   public token: string;

public rolList: Rol [];
public rol: Rol;
public rolAux: Rol;

public busquedaRol='';
filterInputRol = new FormControl();


constructor(private router: Router,  
			private route: ActivatedRoute, 
			private location: Location,
			private parseFormat: CustomNgbDateParserFormatter,
			private rolService: RolService
){
  	 this.filterInputRol.valueChanges.subscribe(busquedaRol => {
  	  	this.busquedaRol = busquedaRol;
  	  });
}

ngOnInit() {
	this.rolService.clear();
	      this.rol = new Rol;
} 

save(){
	if (
	this.rol.clave ===null || 
	this.rol.nombre ==="" || this.rol.nombre ===null || 
	this.rol.activo ===null || 
		this.rol.rolId === null 
	){
		return;
	}else{
	   this.rolService.saveRol(this.rol).subscribe(res => {
	     if (res.status == 201 || res.status == 200){
	        swal('Success...', 'Rol save successfully.', 'success');
	        this.router.navigate([ '../managerol' ], { relativeTo: this.route })
	     }else if (res.status == 403){
	        swal('Error...', 'Usuario no tiene permiso para guardar rol.', 'error');
	     }else{
	       swal('Error...', 'rol save unsuccessfully.', 'error');
	     }
	   } );
	}
}


}

import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';
import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { PermisoService }                                  from '../../permiso/permiso.component.service';
import { Permiso }                                         from '../../permiso/permiso.component.model';

import { RolService }                                  from '../../rol/rol.component.service';
import { Rol }                                         from '../../rol/rol.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './permiso-create.component.html',
	styleUrls: ['./permiso-create.component.css']
})

export class PermisoCreateComponent implements OnInit {

    public title = 'Nuevo Permiso';
    public permisoform: any;
    public user: User;
    public valueName: string;
    public token: string;

public permisoList: Permiso [];
public permiso: Permiso;
    public permisoAux: Permiso;

public busquedaPermiso='';
filterInputPermiso = new FormControl();

public rolList: Rol [];
	    public rol: Rol;
	    public rolAux: Rol;
	    
	    public busquedaRol='';
	    filterInputRol = new FormControl();

constructor(private router: Router,  
			private route: ActivatedRoute, 
			private location: Location,
			private parserFormatter: NgbDateParserFormatter,
			private permisoService: PermisoService
			,private rolService: RolService
){
  	 this.filterInputPermiso.valueChanges.subscribe(busquedaPermiso => {
     	this.busquedaPermiso = busquedaPermiso;
     });
     
	this.filterInputRol.valueChanges.subscribe(busquedaRol => {
		     this.busquedaRol = busquedaRol;
		   });
}

    ngOnInit() {
		this.permisoService.clear();
        this.permiso = new Permiso;

		//this.loadPermiso();
		this.loadRol();
    } 

save(){

	if (
		this.permiso.rolId ===null ||
		this.permiso.funcion ==="" || this.permiso.funcion ===null || 
		this.permiso.ruta ==="" || this.permiso.ruta ===null || 
		this.permiso.nivelpermiso ==="" || this.permiso.nivelpermiso ===null || 
		this.permiso.permisoId !== null 
	){
		return;
	}else{
	   this.permisoService.savePermiso(this.permiso).subscribe(res => {
	     if (res.status == 201 || res.status == 200){
	        swal('Success...', 'Permiso save successfully.', 'success');
	        this.router.navigate([ '../managepermiso' ], { relativeTo: this.route })
	     }else if (res.status == 403){
	        swal('Error...', 'Usuario no tiene permiso para guardar permiso.', 'error');
	     }else{
	       swal('Error...', 'permiso save unsuccessfully.', 'error');
	     }
	   } );
   }
}

loadpermiso(){
  		this.permisoService.getAllPermiso().subscribe(data => {
    	if (data) {
			this.permisoList = data;
    	}
  		}, error => {
    	swal('Error...', 'An error occurred while calling the Permisos.', 'error');
  		});
}

setClickedRowPermiso(index,permiso){	      
		  permiso.checked = !permiso.checked;
		  if (permiso.checked){
		  this.permisoService.setPermiso(permiso);
		  this.permiso.permisoId = permiso.permisoId;
		  this.permiso.permisoItem = permiso.funcion;
	    	}else{
            this.permisoService.clear();
			this.permiso.permisoId = null;
		    this.permiso.permisoItem = "";
		}
 }
 
loadRol(){
   		this.rolService.getAllRol().subscribe(data => {
     	if (data) {
      	
 		this.rolList = data;

     	}
   		}, error => {
     	swal('Error...', 'An error occurred while calling the Rols.', 'error');
   	});
 }

	  setClickedRowRol(index,rol){
	 		  rol.checked = !rol.checked;
	 		  if (rol.checked){
	 		  this.rolService.setRol(rol);
	 		  this.permiso.rolId = rol.rolId;
	 		  this.permiso.rolItem = rol.nombre;
	 	    	}else{
	             this.rolService.clear();
	 			this.permiso.rolId = null;
	 		    this.permiso.rolItem = "";
	 		}
	  }
 

  return(permiso){
      this.location.back();
  }
}

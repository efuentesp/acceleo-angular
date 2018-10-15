import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';
import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { UsuarioService }                                  from '../../usuario/usuario.component.service';
import { Usuario }                                         from '../../usuario/usuario.component.model';

import { RolService }                                  from '../../rol/rol.component.service';
import { Rol }                                         from '../../rol/rol.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './usuario-create.component.html',
	styleUrls: ['./usuario-create.component.css']
})

export class UsuarioCreateComponent implements OnInit {

    public title = 'Nuevo Usuario';
    public usuarioform: any;
    public user: User;
    public valueName: string;
    public token: string;

public usuarioList: Usuario [];
public usuario: Usuario;
    public usuarioAux: Usuario;

public busquedaUsuario='';
filterInputUsuario = new FormControl();

public rolList: Rol [];
	    public rol: Rol;
	    public rolAux: Rol;
	    
	    public busquedaRol='';
	    filterInputRol = new FormControl();

constructor(private router: Router,  
			private route: ActivatedRoute, 
			private location: Location,
			private parserFormatter: NgbDateParserFormatter,
			private usuarioService: UsuarioService
			,private rolService: RolService
){
  	 this.filterInputUsuario.valueChanges.subscribe(busquedaUsuario => {
     	this.busquedaUsuario = busquedaUsuario;
     });
     
	this.filterInputRol.valueChanges.subscribe(busquedaRol => {
		     this.busquedaRol = busquedaRol;
		   });
}

    ngOnInit() {
		this.usuarioService.clear();
        this.usuario = new Usuario;

		//this.loadUsuario();
		this.loadRol();
    } 

save(){

	if (
		this.usuario.nombreclave ==="" || this.usuario.nombreclave ===null || 
		this.usuario.password ==="" || this.usuario.password ===null || 
		this.usuario.activo ===null || 
		this.usuario.rolId ===null ||
		this.usuario.usuarioId !== null 
	){
		return;
	}else{
	   this.usuarioService.saveUsuario(this.usuario).subscribe(res => {
	     if (res.status == 201 || res.status == 200){
	        swal('Success...', 'Usuario save successfully.', 'success');
	        this.router.navigate([ '../manageusuario' ], { relativeTo: this.route })
	     }else if (res.status == 403){
	        swal('Error...', 'Usuario no tiene permiso para guardar usuario.', 'error');
	     }else{
	       swal('Error...', 'usuario save unsuccessfully.', 'error');
	     }
	   } );
   }
}

loadusuario(){
  		this.usuarioService.getAllUsuario().subscribe(data => {
    	if (data) {
			this.usuarioList = data;
    	}
  		}, error => {
    	swal('Error...', 'An error occurred while calling the Usuarios.', 'error');
  		});
}

setClickedRowUsuario(index,usuario){	      
		  usuario.checked = !usuario.checked;
		  if (usuario.checked){
		  this.usuarioService.setUsuario(usuario);
		  this.usuario.usuarioId = usuario.usuarioId;
		  this.usuario.usuarioItem = usuario.nombreClave;
	    	}else{
            this.usuarioService.clear();
			this.usuario.usuarioId = null;
		    this.usuario.usuarioItem = "";
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
	 		  this.usuario.rolId = rol.rolId;
	 		  this.usuario.rolItem = rol.nombre;
	 	    	}else{
	             this.rolService.clear();
	 			this.usuario.rolId = null;
	 		    this.usuario.rolItem = "";
	 		}
	  }
 

  return(usuario){
      this.location.back();
  }
}

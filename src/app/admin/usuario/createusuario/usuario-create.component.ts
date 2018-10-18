import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';
import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CustomNgbDateParserFormatter } from '../../../dateformat';

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
datePipe = new DatePipe('en-US');

public rolList: Rol [];
public rol: Rol;
public rolAux: Rol;

public busquedaRol='';
filterInputRol = new FormControl();

constructor(private router: Router,  
			private route: ActivatedRoute, 
			private location: Location,
			private parseFormat: CustomNgbDateParserFormatter,
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
	this.loadRol();
} 

save(){
	if (
	this.usuario.nombreclave ==="" || this.usuario.nombreclave ===null || 
	this.usuario.password ==="" || this.usuario.password ===null || 
	this.usuario.activo ===null || 
	this.usuario.rolId === null ||
		this.usuario.usuarioId === null 
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
this.usuario.rolId = "";
this.usuario.rolItem = "";
 	   }
 }

isNumber(value: any): boolean {
	return !isNaN(this.toInteger(value));
}

toInteger(value: any): number {
	return parseInt(`${value}`, 10);
}

parse(value: string): string {
    if (value) {
        const dateParts = value.trim().split('/');
        if (dateParts.length === 3 && this.isNumber(dateParts[0]) && this.isNumber(dateParts[1]) && this.isNumber(dateParts[2])) {
			return this.datePipe.transform(new Date(this.toInteger(dateParts[2]), this.toInteger(dateParts[1]), this.toInteger(dateParts[0])), 'yyyy-MM-dd');
        }
    }
    return null;
}

}

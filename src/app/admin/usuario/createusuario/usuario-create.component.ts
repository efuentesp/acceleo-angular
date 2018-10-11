import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
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
    public usuario: Usuario;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;
	public datePipe = new DatePipe('en-US');

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
  	 this.filterInputRol.valueChanges.subscribe(busquedaRol => {
     this.busquedaRol = busquedaRol;
   });
	}

    ngOnInit() {
		this.usuarioService.clear();
        this.usuario = new Usuario;

		this.loadRols();
       
    } 

save(){


   this.usuarioService.saveUsuario(this.usuario).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Usuario save successfully.', 'success');
        this.router.navigate([ '../manageusuario' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Usuario.', 'error');
     }else{
       swal('Error...', 'Usuario save unsuccessfully.', 'error');
     }
   } );
}


	loadRols(){
  		this.rolService.getAllRol().subscribe(data => {
    	if (data) {
      	
		this.rolList = data;
// Cambios por cada modal
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
		  this.usuario.rolItem = rol.
						nombre+ "";
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

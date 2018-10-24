import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute, Params}                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';

import { UsuarioService }                                  from '../../usuario/usuario.component.service';
import { Usuario }                                         from '../../usuario/usuario.component.model';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { RolService }                                  from '../../rol/rol.component.service';
import { Rol }                                         from '../../rol/rol.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './usuario-manage.component.html',
	styleUrls: ['./usuario-manage.component.css']
})

export class UsuarioManageComponent implements OnInit {

    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

    public title = 'Manage Usuario';
    public usuarioList: Usuario [];
    public usuario: Usuario;

  	public busquedaUsuario='';
    public filterInputUsuario = new FormControl();
    datePipe = new DatePipe('en-US');

 	public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));

	public rolList: Rol [];
	public rol: Rol;
	public rolAux: Rol;
	
	public busquedaRol='';
	filterInputRol = new FormControl();

    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;
    

// data  
public link: string = '';
public rolId: string = '';

    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private usuarioService:UsuarioService
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
      
	  // Get data user
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.valueName = this.user.username;
      this.token = this.user.token;

      this.usuarioService.setEdit(false);
      this.usuarioService.setDelete(false);
    
      this.habilita();
      this.getParams();

    }   
    
loadUsuario(){
    this.usuarioService.getAllUsuario().subscribe(data => {
        if (data) {
            this.usuarioList = data;
        }
    }, error => {
    swal('Error...', 'An error occurred while calling the usuarios.', 'error');
    });
}


add(){
	this.usuarioService.clear();
	this.router.navigate([ '../createusuario' ], { relativeTo: this.route })
}


editar(usuario){
	this.usuarioService.setUsuario(usuario);
	this.usuarioService.setEdit(true);
	this.usuarioService.setDelete(false);
	this.router.navigate([ '../editusuario' ], { relativeTo: this.route })
}


eliminar(usuario){
	this.usuarioService.setUsuario(usuario);
	this.usuarioService.setEdit(false);
	this.usuarioService.setDelete(true);
	this.router.navigate([ '../editusuario' ], { relativeTo: this.route })
}

  // Select row
  setClickedRowUsuario(index, usuario){
    this.usuarioService.setUsuario(usuario);
    this.usuarioService.setEdit(true);
    this.usuarioService.setDelete(false);
    this.router.navigate([ '../editusuario' ], { relativeTo: this.route })
  }
  
  habilita(){
    this.userAdmin.authorities.forEach(element => {
if (element.authority == 'ROLE_USUARIODELETE'){
	this.deleteActive = true;
}
if (element.authority == 'ROLE_USUARIOCREATE'){
this.createActive = true;
}
if (element.authority == 'ROLE_USUARIOUPDATE'){
	this.updateActive = true;
}
if (element.authority == 'ROLE_USUARIOSEARCH'){
	this.searchActive = true;
}

 // Children with one to many
	
}); 

}

  // Parse to NgbDateStruct
    isNumber(value: any): boolean {
      return !isNaN(this.toInteger(value));
  }
 
  toInteger(value: any): number {
      return parseInt(`${value}`, 10);
  }
  parse(value: string): NgbDateStruct {
    if (value) {
        const dateParts = value.trim().split('-');
        if (dateParts.length === 1 && this.isNumber(dateParts[0])) {
            return {day: this.toInteger(dateParts[0]), month: null, year: null};
        } else if (dateParts.length === 2 && this.isNumber(dateParts[0]) && this.isNumber(dateParts[1])) {
            return {day: this.toInteger(dateParts[1]), month: this.toInteger(dateParts[0]), year: null};
        } else if (dateParts.length === 3 && this.isNumber(dateParts[0]) && this.isNumber(dateParts[1]) && this.isNumber(dateParts[2])) {
            return {day: this.toInteger(dateParts[2]), month: this.toInteger(dateParts[1]), year: this.toInteger(dateParts[0])};
        }
    }
    return null;
  }
  
  	
  	  getParams(){
  	    this.route.params.subscribe((params: Params) => {
  	        this.link = params['link'];
  	        
          	this.rolId = params['rolId'];
  	
  	        if (!this.link){
  	            this.loadUsuario();
  	        }else{
  	        	
          	if (this.rolId){
          	    this.loadUsuarioByRol(this.rolId);
          	}
  	        }
  	        
  	    });
  	  }
  	  
  	loadUsuarioByRol(rolId){
  	    this.usuarioService.getAllUsuarioByRol(rolId).subscribe(data => {
  	        if (data) {
  	            this.usuarioList = data;
  	        }    
  	    }, error => {
  	    swal('Error...', 'An error occurred while calling the usuarios.', 'error');
  	    });    
  	}
  	
}

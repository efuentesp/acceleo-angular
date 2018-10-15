import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';

import { UsuarioService }                                  from '../../usuario/usuario.component.service';
import { Usuario }                                         from '../../usuario/usuario.component.model';

import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

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

  	public busquedausuario='';
    public filterInputusuario = new FormControl();

 	public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));

    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;

    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private usuarioService:UsuarioService
){
	
	
}

    ngOnInit() {
      
	  // Get data user
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.valueName = this.user.username;
      this.token = this.user.token;

      this.usuarioService.setEdit(false);
      this.usuarioService.setDelete(false);

      this.loadUsuario();
      this.habilita();

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
if (element.authority == 'ROLE_ORDENSIMPLIFICADASEARCH'){
	this.searchActive = true;
}
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

}

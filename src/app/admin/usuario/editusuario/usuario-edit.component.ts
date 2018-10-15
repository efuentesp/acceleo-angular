import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { UsuarioService }                                  from '../../usuario/usuario.component.service';
import { Usuario }                                         from '../../usuario/usuario.component.model';

import { RolService }                                  from '../../rol/rol.component.service';
import { Rol }                                         from '../../rol/rol.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './usuario-edit.component.html',
	styleUrls: ['./usuario-edit.component.css']
})

export class UsuarioEditComponent implements OnInit {

	public title = 'Editar Usuario';
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public flag: boolean;
    public flagDelete: boolean;

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
        
        this.flag = this.usuarioService.getEdit();
        this.usuario = this.usuarioService.getUsuario();
        this.flagDelete = this.usuarioService.getDelete();
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

delete(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this usuario!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!"
  }).then((isConfirm) => {
    if (isConfirm.value) {
      this.usuarioService.deleteUsuario(this.usuario).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Usuario item has been deleted successfully.', 'success');
          this.router.navigate([ '../manageusuario' ], { relativeTo: this.route })
        }else if (res.status == 403){
          swal('Error...', 'Usuario no tiene permiso para guardar Usuario.', 'error');
        }else{
          swal('Error...', 'Usuario deleted unsuccessfully.', 'error');
        }
      },error =>{
        if (error.status == 500){
          swal('Warning...', 'Usuario no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
        }
      }
	);
    } else {
      //swal("Cancelled", "Usuario deleted unsuccessfully", "error");
    }
  });
}

return(usuario){
  this.location.back();
}
 
}


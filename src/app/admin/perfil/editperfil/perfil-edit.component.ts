import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';

import { PerfilService }                                  from '../../perfil/perfil.component.service';
import { Perfil }                                         from '../../perfil/perfil.component.model';

import { SocioService }                                  from '../../socio/socio.component.service';
import { Socio }                                         from '../../socio/socio.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './perfil-edit.component.html',
	styleUrls: ['./perfil-edit.component.css']
})

export class PerfilEditComponent implements OnInit {

	public title = 'Editar Perfil';
    public perfil: Perfil;
 	public perfilList: Perfil;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public flag: boolean;
    public flagDelete: boolean;

	public deList: Socio;
    public de: Socio;

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
        
        this.flag = this.perfilService.getEdit();
        this.perfil = this.perfilService.getPerfil();
        this.flagDelete = this.perfilService.getDelete();
        
		this.loadDes();
		this.loadItemDe(this.perfil);

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

delete(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this perfil!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!"
  }).then((isConfirm) => {
    if (isConfirm.value) {
      this.perfilService.deletePerfil(this.perfil).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Perfil item has been deleted successfully.', 'success');
          this.router.navigate([ '../manageperfil' ], { relativeTo: this.route })
        }else if (res.status == 403){
          swal('Error...', 'Usuario no tiene permiso para guardar Perfil.', 'error');
        }else{
          swal('Error...', 'Perfil deleted unsuccessfully.', 'error');
        }
      },error =>{
        if (error.status == 500){
          swal('Warning...', 'Perfil no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
        }
      }
	);
    } else {
      //swal("Cancelled", "Perfil deleted unsuccessfully", "error");
    }
  });
}

	loadDes(){
  		this.deService.getAllSocio().subscribe(data => {
    	if (data) {
      	this.deList = data;
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
		  //this.perfil.deItem = de.Iem;
	    	}else{
            this.deService.clear();
			this.perfil.deId = null;
		    this.perfil.deItem = "";
		}
}

loadItemDe(perfil){
  this.deService.getSocioById(perfil.deId).subscribe(data => {
    if (data) {
      this.de = data;
      //this.perfil.deItem = this.de.Item;
    }
    }, error => {
    swal('Error...', 'An error occurred while calling the des.', 'error');
  });

}



return(perfil){
  this.location.back();
}
 
}

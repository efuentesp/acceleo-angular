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
import { DepartamentoService } from '../../departamento/departamento.component.service';
import { PlantaService } from '../../planta/planta.component.service';
import { Planta } from '../../planta/planta.component.model';
import { Departamento } from '../../departamento/departamento.component.model';

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

	public socioList: Socio;
    public socio: Socio;

	public busquedaSocio='';
  filterInputSocio = new FormControl();
  
  public departamentoList: Departamento [];
  public departamento: Departamento;
  public departamentoAux: Departamento;
  
  public plantaList: Planta [];
  public planta: Planta;
  public plantaAux: Planta;

    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
        private perfilService: PerfilService
        ,private departamentoService: DepartamentoService
        ,private plantaService: PlantaService
	,private socioService: SocioService
){

 	 this.filterInputSocio.valueChanges.subscribe(busquedaSocio => {
     this.busquedaSocio = busquedaSocio;
   });

	}	

    ngOnInit() {
        
        this.flag = this.perfilService.getEdit();
        this.perfil = this.perfilService.getPerfil();
        this.flagDelete = this.perfilService.getDelete();
        
		this.loadSocios();
		this.loadItemSocio(this.perfil);

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

	loadSocios(){
  		this.socioService.getAllSocio().subscribe(data => {
    	if (data) {
        this.socioList = data;
        
        this.socioList.forEach(element => {
          this.departamentoService.getDepartamentoById(element.departamentoId).subscribe(dataAux => {
              if (dataAux) {
                  this.departamentoAux = dataAux;
                  element.departamentoItem = this.departamentoAux.nombredepto;


    if (element.generoId == 'mas'){
        element.generoItem = 'Masculino';
    }
    if (element.generoId == 'fem'){
        element.generoItem = 'Femenino';
    }

    if (element.tipoempleadoId == 'p'){
        element.tipoempleadoItem = 'Planta';
    }
    if (element.tipoempleadoId == 'c'){
        element.tipoempleadoItem = 'Confianza';
    }
    if (element.tipoempleadoId == 't'){
        element.tipoempleadoItem = 'Temporal';
    }
    if (element.tipoempleadoId == 'b'){
        element.tipoempleadoItem = 'Becario';
    }

          }	
      });	

      this.socioList.forEach(element => {
          this.plantaService.getPlantaById(element.plantaId).subscribe(dataAux => {
              if (dataAux) {
                  this.plantaAux = dataAux;
                  element.plantaItem = this.plantaAux.nombreplanta;

    if (element.generoId == 'mas'){
        element.generoItem = 'Masculino';
    }
    if (element.generoId == 'fem'){
        element.generoItem = 'Femenino';
    }

    if (element.tipoempleadoId == 'p'){
        element.tipoempleadoItem = 'Planta';
    }
    if (element.tipoempleadoId == 'c'){
        element.tipoempleadoItem = 'Confianza';
    }
    if (element.tipoempleadoId == 't'){
        element.tipoempleadoItem = 'Temporal';
    }
    if (element.tipoempleadoId == 'b'){
        element.tipoempleadoItem = 'Becario';
    }
          }	
      });	
  });

    	}
  		}, error => {
    	swal('Error...', 'An error occurred while calling the Socios.', 'error');
  	});
}

 setClickedRowSocio(index,socio){
	      
		  socio.checked = !socio.checked;

		  if (socio.checked){
		  this.socioService.setSocio(socio);
		  this.perfil.socioId = socio.socioId;
		  this.perfil.socioItem = socio.numero+"";
	    	}else{
            this.socioService.clear();
			this.perfil.socioId = null;
		    this.perfil.socioItem = "";
		}
}

loadItemSocio(perfil){
  this.socioService.getSocioById(perfil.socioId).subscribe(data => {
    if (data) {
      this.socio = data;
      this.perfil.socioItem = this.socio.numero+"";
    }
    }, error => {
    swal('Error...', 'An error occurred while calling the socios.', 'error');
  });

}



return(perfil){
  this.location.back();
}
 
}

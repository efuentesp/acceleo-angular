import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';

import { PlantaService }                                  from '../../planta/planta.component.service';
import { Planta }                                         from '../../planta/planta.component.model';

import { EmpresaService }                                  from '../../empresa/empresa.component.service';
import { Empresa }                                         from '../../empresa/empresa.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './planta-edit.component.html',
	styleUrls: ['./planta-edit.component.css']
})

export class PlantaEditComponent implements OnInit {

	public title = 'Editar Planta';
    public planta: Planta;
 	public plantaList: Planta;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public flag: boolean;
    public flagDelete: boolean;

	public empresaList: Empresa;
    public empresa: Empresa;

	public busquedaEmpresa='';
	filterInputEmpresa = new FormControl();

    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private plantaService: PlantaService
	,private empresaService: EmpresaService
){

 	 this.filterInputEmpresa.valueChanges.subscribe(busquedaEmpresa => {
     this.busquedaEmpresa = busquedaEmpresa;
   });

	}	

    ngOnInit() {
        
        this.flag = this.plantaService.getEdit();
        this.planta = this.plantaService.getPlanta();
        this.flagDelete = this.plantaService.getDelete();
        
		this.loadEmpresas();
		this.loadItemEmpresa(this.planta);

    }  

save(){
   this.plantaService.savePlanta(this.planta).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Planta save successfully.', 'success');
        this.router.navigate([ '../manageplanta' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Planta.', 'error');
     }else{
       swal('Error...', 'Planta save unsuccessfully.', 'error');
     }
   } );
}

delete(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this planta!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!"
  }).then((isConfirm) => {
    if (isConfirm.value) {
      this.plantaService.deletePlanta(this.planta).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Planta item has been deleted successfully.', 'success');
          this.router.navigate([ '../manageplanta' ], { relativeTo: this.route })
        }else if (res.status == 403){
          swal('Error...', 'Usuario no tiene permiso para guardar Planta.', 'error');
        }else{
          swal('Error...', 'Planta deleted unsuccessfully.', 'error');
        }
      },error =>{
        if (error.status == 500){
          swal('Warning...', 'Planta no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
        }
      }
	);
    } else {
      //swal("Cancelled", "Planta deleted unsuccessfully", "error");
    }
  });
}

	loadEmpresas(){
  		this.empresaService.getAllEmpresa().subscribe(data => {
    	if (data) {
      	this.empresaList = data;
    	}
  		}, error => {
    	swal('Error...', 'An error occurred while calling the Empresas.', 'error');
  	});
}

 setClickedRowEmpresa(index,empresa){
	      
		  empresa.checked = !empresa.checked;

		  if (empresa.checked){
		  this.empresaService.setEmpresa(empresa);
		  this.planta.empresaId = empresa.empresaId;
		  this.planta.empresaItem = empresa.clave;

	    	}else{
            this.empresaService.clear();
			this.planta.empresaId = null;
		    this.planta.empresaItem = "";
		}
}

loadItemEmpresa(planta){
  this.empresaService.getEmpresaById(planta.empresaId).subscribe(data => {
    if (data) {
      this.empresa = data;
      this.planta.empresaItem = this.empresa.clave;

    }
    }, error => {
    swal('Error...', 'An error occurred while calling the empresas.', 'error');
  });

}



return(planta){
  this.location.back();
}
 
}
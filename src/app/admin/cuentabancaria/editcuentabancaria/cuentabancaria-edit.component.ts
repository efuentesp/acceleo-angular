import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';

import { CuentabancariaService }                                  from '../../cuentabancaria/cuentabancaria.component.service';
import { Cuentabancaria }                                         from '../../cuentabancaria/cuentabancaria.component.model';

import { SocioService }                                  from '../../socio/socio.component.service';
import { Socio }                                         from '../../socio/socio.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './cuentabancaria-edit.component.html',
	styleUrls: ['./cuentabancaria-edit.component.css']
})

export class CuentabancariaEditComponent implements OnInit {

	public title = 'Editar Cuentabancaria';
    public cuentabancaria: Cuentabancaria;
 	public cuentabancariaList: Cuentabancaria;
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
				private cuentabancariaService: CuentabancariaService
	,private deService: SocioService
){

 	 this.filterInputSocio.valueChanges.subscribe(busquedaSocio => {
     this.busquedaSocio = busquedaSocio;
   });

	}	

    ngOnInit() {
        
        this.flag = this.cuentabancariaService.getEdit();
        this.cuentabancaria = this.cuentabancariaService.getCuentabancaria();
        this.flagDelete = this.cuentabancariaService.getDelete();
        
		this.loadDes();
		this.loadItemDe(this.cuentabancaria);

    }  

save(){
   this.cuentabancariaService.saveCuentabancaria(this.cuentabancaria).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Cuentabancaria save successfully.', 'success');
        this.router.navigate([ '../managecuentabancaria' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Cuentabancaria.', 'error');
     }else{
       swal('Error...', 'Cuentabancaria save unsuccessfully.', 'error');
     }
   } );
}

delete(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this cuentabancaria!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!"
  }).then((isConfirm) => {
    if (isConfirm.value) {
      this.cuentabancariaService.deleteCuentabancaria(this.cuentabancaria).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Cuentabancaria item has been deleted successfully.', 'success');
          this.router.navigate([ '../managecuentabancaria' ], { relativeTo: this.route })
        }else if (res.status == 403){
          swal('Error...', 'Usuario no tiene permiso para guardar Cuentabancaria.', 'error');
        }else{
          swal('Error...', 'Cuentabancaria deleted unsuccessfully.', 'error');
        }
      },error =>{
        if (error.status == 500){
          swal('Warning...', 'Cuentabancaria no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
        }
      }
	);
    } else {
      //swal("Cancelled", "Cuentabancaria deleted unsuccessfully", "error");
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
		  this.cuentabancaria.deId = de.deId;
		  //this.cuentabancaria.deItem = de.Iem;
	    	}else{
            this.deService.clear();
			this.cuentabancaria.deId = null;
		    this.cuentabancaria.deItem = "";
		}
}

loadItemDe(cuentabancaria){
  this.deService.getSocioById(cuentabancaria.deId).subscribe(data => {
    if (data) {
      this.de = data;
      //this.cuentabancaria.deItem = this.de.Item;
    }
    }, error => {
    swal('Error...', 'An error occurred while calling the des.', 'error');
  });

}



return(cuentabancaria){
  this.location.back();
}
 
}

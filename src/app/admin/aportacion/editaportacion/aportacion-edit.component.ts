import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Location, DatePipe } from '@angular/common';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { User } from '../../user/user.component.model';

import { AportacionService }                                  from '../../aportacion/aportacion.component.service';
import { Aportacion }                                         from '../../aportacion/aportacion.component.model';

import { CuentadeahorroService }                                  from '../../cuentadeahorro/cuentadeahorro.component.service';
import { Cuentadeahorro }                                         from '../../cuentadeahorro/cuentadeahorro.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './aportacion-edit.component.html',
	styleUrls: ['./aportacion-edit.component.css']
})

export class AportacionEditComponent implements OnInit {

	public title = 'Editar Aportacion';
    public aportacion: Aportacion;
 	public aportacionList: Aportacion;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public flag: boolean;
    public flagDelete: boolean;

	public cuentadeahorroList: Cuentadeahorro;
    public cuentadeahorro: Cuentadeahorro;

	public busquedaCuentadeahorro='';
	filterInputCuentadeahorro = new FormControl();

    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private aportacionService: AportacionService
  ,private cuentadeahorroService: CuentadeahorroService
  ,private parserFormatter: NgbDateParserFormatter
){

 	 this.filterInputCuentadeahorro.valueChanges.subscribe(busquedaCuentadeahorro => {
     this.busquedaCuentadeahorro = busquedaCuentadeahorro;
   });

	}	

    ngOnInit() {
        
        this.flag = this.aportacionService.getEdit();
        this.aportacion = this.aportacionService.getAportacion();
        this.flagDelete = this.aportacionService.getDelete();
        
		this.loadCuentadeahorros();
		this.loadItemCuentadeahorro(this.aportacion);

    }  

save(){

   this.aportacion.fecha = this.parserFormatter.format(this.aportacion.fechaAux);
   this.aportacionService.saveAportacion(this.aportacion).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Aportacion save successfully.', 'success');
        this.router.navigate([ '../manageaportacion' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Aportacion.', 'error');
     }else{
       swal('Error...', 'Aportacion save unsuccessfully.', 'error');
     }
   } );
}

delete(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this aportacion!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!"
  }).then((isConfirm) => {
    if (isConfirm.value) {
      this.aportacionService.deleteAportacion(this.aportacion).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Aportacion item has been deleted successfully.', 'success');
          this.router.navigate([ '../manageaportacion' ], { relativeTo: this.route })
        }else if (res.status == 403){
          swal('Error...', 'Usuario no tiene permiso para guardar Aportacion.', 'error');
        }else{
          swal('Error...', 'Aportacion deleted unsuccessfully.', 'error');
        }
      },error =>{
        if (error.status == 500){
          swal('Warning...', 'Aportacion no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
        }
      }
	);
    } else {
      //swal("Cancelled", "Aportacion deleted unsuccessfully", "error");
    }
  });
}

	loadCuentadeahorros(){
  		this.cuentadeahorroService.getAllCuentadeahorro().subscribe(data => {
    	if (data) {
      	this.cuentadeahorroList = data;
    	}
  		}, error => {
    	swal('Error...', 'An error occurred while calling the Cuentadeahorros.', 'error');
  	});
}

 setClickedRowCuentadeahorro(index,cuentadeahorro){
	      
		  cuentadeahorro.checked = !cuentadeahorro.checked;

		  if (cuentadeahorro.checked){
		  this.cuentadeahorroService.setCuentadeahorro(cuentadeahorro);
		  this.aportacion.cuentadeahorroId = cuentadeahorro.cuentadeahorroId;
		  this.aportacion.cuentadeahorroItem = cuentadeahorro.numero;

	    	}else{
            this.cuentadeahorroService.clear();
			this.aportacion.cuentadeahorroId = null;
		    this.aportacion.cuentadeahorroItem = "";
		}
}

loadItemCuentadeahorro(aportacion){
  this.cuentadeahorroService.getCuentadeahorroById(aportacion.cuentadeahorroId).subscribe(data => {
    if (data) {
      this.cuentadeahorro = data;
      this.aportacion.cuentadeahorroItem = this.cuentadeahorro.numero+"";

    }
    }, error => {
    swal('Error...', 'An error occurred while calling the cuentadeahorros.', 'error');
  });

}



return(aportacion){
  this.location.back();
}
 
}

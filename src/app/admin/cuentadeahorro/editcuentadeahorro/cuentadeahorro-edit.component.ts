import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { CuentadeahorroService }                                  from '../../cuentadeahorro/cuentadeahorro.component.service';
import { Cuentadeahorro }                                         from '../../cuentadeahorro/cuentadeahorro.component.model';

import { SocioService }                                  from '../../socio/socio.component.service';
import { Socio }                                         from '../../socio/socio.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './cuentadeahorro-edit.component.html',
	styleUrls: ['./cuentadeahorro-edit.component.css']
})

export class CuentadeahorroEditComponent implements OnInit {

	public title = 'Editar Cuentadeahorro';
    public cuentadeahorro: Cuentadeahorro;
 	public cuentadeahorroList: Cuentadeahorro;
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

    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private parserFormatter: NgbDateParserFormatter,
				private cuentadeahorroService: CuentadeahorroService
	,private socioService: SocioService
){

 	 this.filterInputSocio.valueChanges.subscribe(busquedaSocio => {
     this.busquedaSocio = busquedaSocio;
   });

	}	

    ngOnInit() {
        
        this.flag = this.cuentadeahorroService.getEdit();
        this.cuentadeahorro = this.cuentadeahorroService.getCuentadeahorro();
        this.flagDelete = this.cuentadeahorroService.getDelete();
        
		this.loadSocios();
		this.loadItemSocio(this.cuentadeahorro);

    }  

save(){
	
	this.cuentadeahorro.fechacontratacion = this.parserFormatter.format(this.cuentadeahorro.fechacontratacionAux);
	this.cuentadeahorro.fechavencimiento = this.parserFormatter.format(this.cuentadeahorro.fechavencimientoAux);
	this.cuentadeahorro.fechadisponibilidad = this.parserFormatter.format(this.cuentadeahorro.fechadisponibilidadAux);

   this.cuentadeahorroService.saveCuentadeahorro(this.cuentadeahorro).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Cuentadeahorro save successfully.', 'success');
        this.router.navigate([ '../managecuentadeahorro' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Cuentadeahorro.', 'error');
     }else{
       swal('Error...', 'Cuentadeahorro save unsuccessfully.', 'error');
     }
   } );
}

delete(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this cuentadeahorro!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!"
  }).then((isConfirm) => {
    if (isConfirm.value) {
      this.cuentadeahorroService.deleteCuentadeahorro(this.cuentadeahorro).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Cuentadeahorro item has been deleted successfully.', 'success');
          this.router.navigate([ '../managecuentadeahorro' ], { relativeTo: this.route })
        }else if (res.status == 403){
          swal('Error...', 'Usuario no tiene permiso para guardar Cuentadeahorro.', 'error');
        }else{
          swal('Error...', 'Cuentadeahorro deleted unsuccessfully.', 'error');
        }
      },error =>{
        if (error.status == 500){
          swal('Warning...', 'Cuentadeahorro no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
        }
      }
	);
    } else {
      //swal("Cancelled", "Cuentadeahorro deleted unsuccessfully", "error");
    }
  });
}

	loadSocios(){
  		this.socioService.getAllSocio().subscribe(data => {
    	if (data) {
      	this.socioList = data;
    	}
  		}, error => {
    	swal('Error...', 'An error occurred while calling the Socios.', 'error');
  	});
}

 setClickedRowSocio(index,socio){
	      
		  socio.checked = !socio.checked;

		  if (socio.checked){
		  this.socioService.setSocio(socio);
		  this.cuentadeahorro.socioId = socio.socioId;
		  this.cuentadeahorro.socioItem = socio.
	    	}else{
            this.socioService.clear();
			this.cuentadeahorro.socioId = null;
		    this.cuentadeahorro.socioItem = "";
		}
}

loadItemSocio(cuentadeahorro){
  this.socioService.getSocioById(cuentadeahorro.socioId).subscribe(data => {
    if (data) {
      this.socio = data;
      this.cuentadeahorro.socioItem = this.socio.
    }
    }, error => {
    swal('Error...', 'An error occurred while calling the socios.', 'error');
  });

}



return(cuentadeahorro){
  this.location.back();
}
 
}

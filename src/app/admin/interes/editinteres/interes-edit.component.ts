import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

import { InteresService }                                  from '../../interes/interes.component.service';
import { Interes }                                         from '../../interes/interes.component.model';

import { CuentadeahorroService }                                  from '../../cuentadeahorro/cuentadeahorro.component.service';
import { Cuentadeahorro }                                         from '../../cuentadeahorro/cuentadeahorro.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './interes-edit.component.html',
	styleUrls: ['./interes-edit.component.css']
})

export class InteresEditComponent implements OnInit {

	public title = 'Editar Interes';
    public interes: Interes;
 	public interesList: Interes;
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
        private parserFormatter: NgbDateParserFormatter,
				private interesService: InteresService
	,private cuentadeahorroService: CuentadeahorroService
){

 	 this.filterInputCuentadeahorro.valueChanges.subscribe(busquedaCuentadeahorro => {
     this.busquedaCuentadeahorro = busquedaCuentadeahorro;
   });

	}	

    ngOnInit() {
        
        this.flag = this.interesService.getEdit();
        this.interes = this.interesService.getInteres();
        this.flagDelete = this.interesService.getDelete();
        
		this.loadCuentadeahorros();
		this.loadItemCuentadeahorro(this.interes);

    }  

save(){

   this.interes.fecha = this.parserFormatter.format(this.interes.fechaAux);

   this.interesService.saveInteres(this.interes).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Interes save successfully.', 'success');
        this.router.navigate([ '../manageinteres' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Interes.', 'error');
     }else{
       swal('Error...', 'Interes save unsuccessfully.', 'error');
     }
   } );
}

delete(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this interes!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!"
  }).then((isConfirm) => {
    if (isConfirm.value) {
      this.interesService.deleteInteres(this.interes).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Interes item has been deleted successfully.', 'success');
          this.router.navigate([ '../manageinteres' ], { relativeTo: this.route })
        }else if (res.status == 403){
          swal('Error...', 'Usuario no tiene permiso para guardar Interes.', 'error');
        }else{
          swal('Error...', 'Interes deleted unsuccessfully.', 'error');
        }
      },error =>{
        if (error.status == 500){
          swal('Warning...', 'Interes no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
        }
      }
	);
    } else {
      //swal("Cancelled", "Interes deleted unsuccessfully", "error");
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
		  this.interes.cuentadeahorroId = cuentadeahorro.cuentadeahorroId;
		  this.interes.cuentadeahorroItem = cuentadeahorro.numero+"";
	    	}else{
            this.cuentadeahorroService.clear();
			this.interes.cuentadeahorroId = null;
		    this.interes.cuentadeahorroItem = "";
		}
}

loadItemCuentadeahorro(interes){
  this.cuentadeahorroService.getCuentadeahorroById(interes.cuentadeahorroId).subscribe(data => {
    if (data) {
      this.cuentadeahorro = data;
      this.interes.cuentadeahorroItem = this.cuentadeahorro.numero+"";
    }
    }, error => {
    swal('Error...', 'An error occurred while calling the cuentadeahorros.', 'error');
  });

}



return(interes){
  this.location.back();
}
 
}

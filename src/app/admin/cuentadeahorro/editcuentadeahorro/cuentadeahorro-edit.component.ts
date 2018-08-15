import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';

import { CuentadeahorroService }                                  from '../../cuentadeahorro/cuentadeahorro.component.service';
import { Cuentadeahorro }                                         from '../../cuentadeahorro/cuentadeahorro.component.model';


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


    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private cuentadeahorroService: CuentadeahorroService
){


	}	

    ngOnInit() {
        
        this.flag = this.cuentadeahorroService.getEdit();
        this.cuentadeahorro = this.cuentadeahorroService.getCuentadeahorro();
        this.flagDelete = this.cuentadeahorroService.getDelete();
        

    }  

save(){
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



return(cuentadeahorro){
  this.location.back();
}
 
}

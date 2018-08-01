import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';

import { AlgorithmtypeService }                                  from '../../algorithmtype/algorithmtype.component.service';
import { Algorithmtype }                                         from '../../algorithmtype/algorithmtype.component.model';



@Component ({
    selector: 'app-view',
    templateUrl: './algorithmtype-edit.component.html',
	styleUrls: ['./algorithmtype-edit.component.css']
})

export class AlgorithmtypeEditComponent implements OnInit {

	public title = 'Editar Algorithmtype';
    public algorithmtype: Algorithmtype;
 	public algorithmtypeList: Algorithmtype;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public flag: boolean;
    public flagDelete: boolean;



    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private algorithmtypeService: AlgorithmtypeService
){


	}	

    ngOnInit() {
        

        this.flag = this.algorithmtypeService.getEdit();
        this.algorithmtype = this.algorithmtypeService.getAlgorithmtype();
        this.flagDelete = this.algorithmtypeService.getDelete();
        

    }  

save(){
   this.algorithmtypeService.saveAlgorithmtype(this.algorithmtype).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Algorithmtype save successfully.', 'success');
        this.router.navigate([ '../managealgorithmtype' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Algorithmtype.', 'error');
     }else{
       swal('Error...', 'Algorithmtype save unsuccessfully.', 'error');
     }
   } );
}

delete(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this algorithmtype!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!"
  }).then((isConfirm) => {
    if (isConfirm.value) {
      this.algorithmtypeService.deleteAlgorithmtype(this.algorithmtype).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Algorithmtype item has been deleted successfully.', 'success');
          this.router.navigate([ '../managealgorithmtype' ], { relativeTo: this.route })
        }else if (res.status == 403){
          swal('Error...', 'Usuario no tiene permiso para guardar Algorithmtype.', 'error');
        }else{
          swal('Error...', 'Algorithmtype deleted unsuccessfully.', 'error');
        }
      },error =>{
        if (error.status == 500){
          swal('Warning...', 'Algorithmtype no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
        }
      }
	);
    } else {
      //swal("Cancelled", "Algorithmtype deleted unsuccessfully", "error");
    }
  });
}



return(algorithmtype){
  this.location.back();
}
 
}

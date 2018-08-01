import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';

import { ComplexityService }                                  from '../../complexity/complexity.component.service';
import { Complexity }                                         from '../../complexity/complexity.component.model';



@Component ({
    selector: 'app-view',
    templateUrl: './complexity-edit.component.html',
	styleUrls: ['./complexity-edit.component.css']
})

export class ComplexityEditComponent implements OnInit {

	public title = 'Editar Complexity';
    public complexity: Complexity;
 	public complexityList: Complexity;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public flag: boolean;
    public flagDelete: boolean;



    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private complexityService: ComplexityService
){


	}	

    ngOnInit() {
        

        this.flag = this.complexityService.getEdit();
        this.complexity = this.complexityService.getComplexity();
        this.flagDelete = this.complexityService.getDelete();
        

    }  

save(){
   this.complexityService.saveComplexity(this.complexity).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Complexity save successfully.', 'success');
        this.router.navigate([ '../managecomplexity' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Complexity.', 'error');
     }else{
       swal('Error...', 'Complexity save unsuccessfully.', 'error');
     }
   } );
}

delete(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this complexity!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!"
  }).then((isConfirm) => {
    if (isConfirm.value) {
      this.complexityService.deleteComplexity(this.complexity).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Complexity item has been deleted successfully.', 'success');
          this.router.navigate([ '../managecomplexity' ], { relativeTo: this.route })
        }else if (res.status == 403){
          swal('Error...', 'Usuario no tiene permiso para guardar Complexity.', 'error');
        }else{
          swal('Error...', 'Complexity deleted unsuccessfully.', 'error');
        }
      },error =>{
        if (error.status == 500){
          swal('Warning...', 'Complexity no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
        }
      }
	);
    } else {
      //swal("Cancelled", "Complexity deleted unsuccessfully", "error");
    }
  });
}



return(complexity){
  this.location.back();
}
 
}

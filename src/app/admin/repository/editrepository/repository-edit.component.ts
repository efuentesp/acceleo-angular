import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';

import { RepositoryService }                                  from '../../repository/repository.component.service';
import { Repository }                                         from '../../repository/repository.component.model';



@Component ({
    selector: 'app-view',
    templateUrl: './repository-edit.component.html',
	styleUrls: ['./repository-edit.component.css']
})

export class RepositoryEditComponent implements OnInit {

	public title = 'Editar Repository';
    public repository: Repository;
 	public repositoryList: Repository;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public flag: boolean;
    public flagDelete: boolean;



    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private repositoryService: RepositoryService
){


	}	

    ngOnInit() {
        

        this.flag = this.repositoryService.getEdit();
        this.repository = this.repositoryService.getRepository();
        this.flagDelete = this.repositoryService.getDelete();
        

    }  

save(){
   this.repositoryService.saveRepository(this.repository).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Repository save successfully.', 'success');
        this.router.navigate([ '../managerepository' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Repository.', 'error');
     }else{
       swal('Error...', 'Repository save unsuccessfully.', 'error');
     }
   } );
}

delete(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this repository!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!"
  }).then((isConfirm) => {
    if (isConfirm.value) {
      this.repositoryService.deleteRepository(this.repository).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Repository item has been deleted successfully.', 'success');
          this.router.navigate([ '../managerepository' ], { relativeTo: this.route })
        }else if (res.status == 403){
          swal('Error...', 'Usuario no tiene permiso para guardar Repository.', 'error');
        }else{
          swal('Error...', 'Repository deleted unsuccessfully.', 'error');
        }
      },error =>{
        if (error.status == 500){
          swal('Warning...', 'Repository no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
        }
      }
	);
    } else {
      //swal("Cancelled", "Repository deleted unsuccessfully", "error");
    }
  });
}



return(repository){
  this.location.back();
}
 
}

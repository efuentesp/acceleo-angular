import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';

import { RepositoryService }                                  from '../../repository/repository.component.service';
import { Repository }                                         from '../../repository/repository.component.model';


@Component ({
    selector: 'app-view',
    templateUrl: './repository-create.component.html',
	styleUrls: ['./repository-create.component.css']
})

export class RepositoryCreateComponent implements OnInit {

    public title = 'Nuevo Repository';
    public repository: Repository;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;



    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private repositoryService: RepositoryService
){


	}

    ngOnInit() {
		this.repositoryService.clear();
        this.repository = new Repository;

       
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


  return(repository){
      this.location.back();
  }

  
}

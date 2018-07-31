import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';

import { ComplexityService }                                  from '../../complexity/complexity.component.service';
import { Complexity }                                         from '../../complexity/complexity.component.model';


@Component ({
    selector: 'app-view',
    templateUrl: './complexity-create.component.html',
	styleUrls: ['./complexity-create.component.css']
})

export class ComplexityCreateComponent implements OnInit {

    public title = 'Nuevo Complexity';
    public complexity: Complexity;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;



    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private complexityService: ComplexityService
){


	}

    ngOnInit() {
		this.complexityService.clear();
        this.complexity = new Complexity;

       
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


  return(complexity){
      this.location.back();
  }

  
}

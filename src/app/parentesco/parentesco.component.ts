import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { ParentescoService }                                  from '../parentesco/parentesco.component.service';
import { Parentesco }                                         from '../parentesco/parentesco.component.model';





@Component ({
    selector: 'app-view',
    templateUrl: './parentesco.component.html'
})

export class ParentescoComponent implements OnInit {

    title = 'Nuevo Parentesco';
    parentescoList: Parentesco;
    parentesco: Parentesco;
    form: any;









    constructor(private router: Router, 
				private parentescoService: ParentescoService

) {
		


	}

    ngOnInit() {
        this.parentesco = this.parentescoService.getParentesco();
        this.loadParentescos();


    }

	loadParentescos(){
      this.parentescoService.getAllParentesco().subscribe(data => {
        if (data) {
          this.parentescoList = data;
        }
      }, error => {
        swal('Error...', 'An error occurred while calling the parentescos.', 'error');
      });
    }



    save(parentesco){
      this.parentescoService.saveParentesco(this.parentesco).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Parentesco save successfully.', 'success');
		  this.router.navigate(['/parentesco_mgmnt']);
        }else{
          swal('Error...', 'Parentesco save unsuccessfully.', 'error');
        }
      } );
    }
	
	


	return(parentesco){
      this.router.navigate(['/parentesco_mgmnt']);
    }

	
}


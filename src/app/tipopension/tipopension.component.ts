import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { TipopensionService }                                  from '../tipopension/tipopension.component.service';
import { Tipopension }                                         from '../tipopension/tipopension.component.model';





@Component ({
    selector: 'app-view',
    templateUrl: './tipopension.component.html'
})

export class TipopensionComponent implements OnInit {

    title = 'Nuevo Tipopension';
    tipopensionList: Tipopension;
    tipopension: Tipopension;
    form: any;









    constructor(private router: Router, 
				private tipopensionService: TipopensionService

) {
		


	}

    ngOnInit() {
        this.tipopension = this.tipopensionService.getTipopension();
        this.loadTipopensions();


    }

	loadTipopensions(){
      this.tipopensionService.getAllTipopension().subscribe(data => {
        if (data) {
          this.tipopensionList = data;
        }
      }, error => {
        swal('Error...', 'An error occurred while calling the tipopensions.', 'error');
      });
    }



    save(tipopension){
      this.tipopensionService.saveTipopension(this.tipopension).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Tipopension save successfully.', 'success');
		  this.router.navigate(['/tipopension_mgmnt']);
        }else{
          swal('Error...', 'Tipopension save unsuccessfully.', 'error');
        }
      } );
    }
	
	


	return(tipopension){
      this.router.navigate(['/tipopension_mgmnt']);
    }

	
}


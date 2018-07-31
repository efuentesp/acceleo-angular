import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';

import { ReusabilityService }                                  from '../../reusability/reusability.component.service';
import { Reusability }                                         from '../../reusability/reusability.component.model';


@Component ({
    selector: 'app-view',
    templateUrl: './reusability-create.component.html',
	styleUrls: ['./reusability-create.component.css']
})

export class ReusabilityCreateComponent implements OnInit {

    public title = 'Nuevo Reusability';
    public reusability: Reusability;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;



    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private reusabilityService: ReusabilityService
){


	}

    ngOnInit() {
		this.reusabilityService.clear();
        this.reusability = new Reusability;

       
    } 

save(){
   this.reusabilityService.saveReusability(this.reusability).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Reusability save successfully.', 'success');
        this.router.navigate([ '../managereusability' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Reusability.', 'error');
     }else{
       swal('Error...', 'Reusability save unsuccessfully.', 'error');
     }
   } );
}


  return(reusability){
      this.location.back();
  }

  
}

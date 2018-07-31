import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';

import { ReusabilityService }                                  from '../../reusability/reusability.component.service';
import { Reusability }                                         from '../../reusability/reusability.component.model';



@Component ({
    selector: 'app-view',
    templateUrl: './reusability-edit.component.html',
	styleUrls: ['./reusability-edit.component.css']
})

export class ReusabilityEditComponent implements OnInit {

	public title = 'Editar Reusability';
    public reusability: Reusability;
 	public reusabilityList: Reusability;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public flag: boolean;
    public flagDelete: boolean;



    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private reusabilityService: ReusabilityService
){


	}	

    ngOnInit() {
        

        this.flag = this.reusabilityService.getEdit();
        this.reusability = this.reusabilityService.getReusability();
        this.flagDelete = this.reusabilityService.getDelete();
        

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

delete(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this reusability!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!"
  }).then((isConfirm) => {
    if (isConfirm.value) {
      this.reusabilityService.deleteReusability(this.reusability).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Reusability item has been deleted successfully.', 'success');
          this.router.navigate([ '../managereusability' ], { relativeTo: this.route })
        }else if (res.status == 403){
          swal('Error...', 'Usuario no tiene permiso para guardar Reusability.', 'error');
        }else{
          swal('Error...', 'Reusability deleted unsuccessfully.', 'error');
        }
      });
    } else {
      //swal("Cancelled", "Reusability deleted unsuccessfully", "error");
    }
  });
}



return(reusability){
  this.location.back();
}
 
}

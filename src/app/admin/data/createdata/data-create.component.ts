import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';

import { DataService }                                  from '../../data/data.component.service';
import { Data }                                         from '../../data/data.component.model';


@Component ({
    selector: 'app-view',
    templateUrl: './data-create.component.html',
	styleUrls: ['./data-create.component.css']
})

export class DataCreateComponent implements OnInit {

    public title = 'Nuevo Data';
    public data: Data;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;



    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private dataService: DataService
){


	}

    ngOnInit() {
		this.dataService.clear();
        this.data = new Data;

       
    } 

save(){
   this.dataService.saveData(this.data).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Data save successfully.', 'success');
        this.router.navigate([ '../managedata' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Data.', 'error');
     }else{
       swal('Error...', 'Data save unsuccessfully.', 'error');
     }
   } );
}


  return(data){
      this.location.back();
  }

  
}

import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';

import { AlgorithmtypeService }                                  from '../../algorithmtype/algorithmtype.component.service';
import { Algorithmtype }                                         from '../../algorithmtype/algorithmtype.component.model';


@Component ({
    selector: 'app-view',
    templateUrl: './algorithmtype-create.component.html',
	styleUrls: ['./algorithmtype-create.component.css']
})

export class AlgorithmtypeCreateComponent implements OnInit {

    public title = 'Nuevo Algorithmtype';
    public algorithmtype: Algorithmtype;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;



    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private algorithmtypeService: AlgorithmtypeService
){


	}

    ngOnInit() {
		this.algorithmtypeService.clear();
        this.algorithmtype = new Algorithmtype;

       
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


  return(algorithmtype){
      this.location.back();
  }

  
}

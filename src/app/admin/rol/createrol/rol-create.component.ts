import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { RolService }                                  from '../../rol/rol.component.service';
import { Rol }                                         from '../../rol/rol.component.model';


@Component ({
    selector: 'app-view',
    templateUrl: './rol-create.component.html',
	styleUrls: ['./rol-create.component.css']
})

export class RolCreateComponent implements OnInit {

    public title = 'Nuevo Rol';
    public rol: Rol;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;
	public datePipe = new DatePipe('en-US');


    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private parserFormatter: NgbDateParserFormatter,
				private rolService: RolService
){
	}

    ngOnInit() {
		this.rolService.clear();
        this.rol = new Rol;

       
    } 

save(){


   this.rolService.saveRol(this.rol).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Rol save successfully.', 'success');
        this.router.navigate([ '../managerol' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Rol.', 'error');
     }else{
       swal('Error...', 'Rol save unsuccessfully.', 'error');
     }
   } );
}


  return(rol){
      this.location.back();
  }
}

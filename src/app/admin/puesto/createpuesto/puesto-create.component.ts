import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { PuestoService }                                  from '../../puesto/puesto.component.service';
import { Puesto }                                         from '../../puesto/puesto.component.model';


@Component ({
    selector: 'app-view',
    templateUrl: './puesto-create.component.html',
	styleUrls: ['./puesto-create.component.css']
})

export class PuestoCreateComponent implements OnInit {

    public title = 'Nuevo Puesto';
    public puesto: Puesto;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;
	public datePipe = new DatePipe('en-US');


    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private parserFormatter: NgbDateParserFormatter,
				private puestoService: PuestoService
){
	}

    ngOnInit() {
		this.puestoService.clear();
        this.puesto = new Puesto;

       
    } 

save(){


   this.puestoService.savePuesto(this.puesto).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Puesto save successfully.', 'success');
        this.router.navigate([ '../managepuesto' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Puesto.', 'error');
     }else{
       swal('Error...', 'Puesto save unsuccessfully.', 'error');
     }
   } );
}


  return(puesto){
      this.location.back();
  }
}

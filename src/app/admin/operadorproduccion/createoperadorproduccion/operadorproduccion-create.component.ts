import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { OperadorproduccionService }                                  from '../../operadorproduccion/operadorproduccion.component.service';
import { Operadorproduccion }                                         from '../../operadorproduccion/operadorproduccion.component.model';


@Component ({
    selector: 'app-view',
    templateUrl: './operadorproduccion-create.component.html',
	styleUrls: ['./operadorproduccion-create.component.css']
})

export class OperadorproduccionCreateComponent implements OnInit {

    public title = 'Nuevo Operadorproduccion';
    public operadorproduccion: Operadorproduccion;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;
	public datePipe = new DatePipe('en-US');


    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private parserFormatter: NgbDateParserFormatter,
				private operadorproduccionService: OperadorproduccionService
){
	}

    ngOnInit() {
		this.operadorproduccionService.clear();
        this.operadorproduccion = new Operadorproduccion;

       
    } 

save(){


   this.operadorproduccionService.saveOperadorproduccion(this.operadorproduccion).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Operadorproduccion save successfully.', 'success');
        this.router.navigate([ '../manageoperadorproduccion' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Operadorproduccion.', 'error');
     }else{
       swal('Error...', 'Operadorproduccion save unsuccessfully.', 'error');
     }
   } );
}


  return(operadorproduccion){
      this.location.back();
  }
}

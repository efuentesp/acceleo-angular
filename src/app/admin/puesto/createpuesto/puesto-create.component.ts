import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';
import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CustomNgbDateParserFormatter } from '../../../dateformat';

import { PuestoService }                                  from '../../puesto/puesto.component.service';
import { Puesto }                                         from '../../puesto/puesto.component.model';


@Component ({
    selector: 'app-view',
    templateUrl: './puesto-create.component.html',
	styleUrls: ['./puesto-create.component.css']
})

export class PuestoCreateComponent implements OnInit {

   public title = 'Nuevo Puesto';
   public puestoform: any;
   public user: User;
   public valueName: string;
   public token: string;

public puestoList: Puesto [];
public puesto: Puesto;
public puestoAux: Puesto;

public busquedaPuesto='';
filterInputPuesto = new FormControl();


constructor(private router: Router,  
			private route: ActivatedRoute, 
			private location: Location,
			private parseFormat: CustomNgbDateParserFormatter,
			private puestoService: PuestoService
){
  	 this.filterInputPuesto.valueChanges.subscribe(busquedaPuesto => {
  	  	this.busquedaPuesto = busquedaPuesto;
  	  });
}

ngOnInit() {
	this.puestoService.clear();
	      this.puesto = new Puesto;
} 

save(){
	if (
	this.puesto.puestosId ==="" || this.puesto.puestosId ===null || 
	this.puesto.descripcion ==="" || this.puesto.descripcion ===null || 
		this.puesto.puestoId === null 
	){
		return;
	}else{
	   this.puestoService.savePuesto(this.puesto).subscribe(res => {
	     if (res.status == 201 || res.status == 200){
	        swal('Success...', 'Puesto save successfully.', 'success');
	        this.router.navigate([ '../managepuesto' ], { relativeTo: this.route })
	     }else if (res.status == 403){
	        swal('Error...', 'Usuario no tiene permiso para guardar puesto.', 'error');
	     }else{
	       swal('Error...', 'puesto save unsuccessfully.', 'error');
	     }
	   } );
	}
}


}

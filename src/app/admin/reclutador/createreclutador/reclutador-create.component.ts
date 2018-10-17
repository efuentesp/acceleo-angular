import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';
import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CustomNgbDateParserFormatter } from '../../../dateformat';

import { ReclutadorService }                                  from '../../reclutador/reclutador.component.service';
import { Reclutador }                                         from '../../reclutador/reclutador.component.model';


@Component ({
    selector: 'app-view',
    templateUrl: './reclutador-create.component.html',
	styleUrls: ['./reclutador-create.component.css']
})

export class ReclutadorCreateComponent implements OnInit {

   public title = 'Nuevo Reclutador';
   public reclutadorform: any;
   public user: User;
   public valueName: string;
   public token: string;

public reclutadorList: Reclutador [];
public reclutador: Reclutador;
public reclutadorAux: Reclutador;

public busquedaReclutador='';
filterInputReclutador = new FormControl();


constructor(private router: Router,  
			private route: ActivatedRoute, 
			private location: Location,
			private parseFormat: CustomNgbDateParserFormatter,
			private reclutadorService: ReclutadorService
){
  	 this.filterInputReclutador.valueChanges.subscribe(busquedaReclutador => {
  	  	this.busquedaReclutador = busquedaReclutador;
  	  });
}

ngOnInit() {
	this.reclutadorService.clear();
	      this.reclutador = new Reclutador;
} 

save(){
	if (
	this.reclutador.nombre ==="" || this.reclutador.nombre ===null || 
	this.reclutador.apellidopaterno ==="" || this.reclutador.apellidopaterno ===null || 
	this.reclutador.apellidomaterno ==="" || this.reclutador.apellidomaterno ===null || 
	this.reclutador.generoId ==="" || this.reclutador.generoId ===null || 
		this.reclutador.reclutadorId === null 
	){
		return;
	}else{
	   this.reclutadorService.saveReclutador(this.reclutador).subscribe(res => {
	     if (res.status == 201 || res.status == 200){
	        swal('Success...', 'Reclutador save successfully.', 'success');
	        this.router.navigate([ '../managereclutador' ], { relativeTo: this.route })
	     }else if (res.status == 403){
	        swal('Error...', 'Usuario no tiene permiso para guardar reclutador.', 'error');
	     }else{
	       swal('Error...', 'reclutador save unsuccessfully.', 'error');
	     }
	   } );
	}
}


}

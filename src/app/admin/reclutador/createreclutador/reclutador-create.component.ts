import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { ReclutadorService }                                  from '../../reclutador/reclutador.component.service';
import { Reclutador }                                         from '../../reclutador/reclutador.component.model';


@Component ({
    selector: 'app-view',
    templateUrl: './reclutador-create.component.html',
	styleUrls: ['./reclutador-create.component.css']
})

export class ReclutadorCreateComponent implements OnInit {

    public title = 'Nuevo Reclutador';
    public reclutador: Reclutador;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;
	public datePipe = new DatePipe('en-US');


    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private parserFormatter: NgbDateParserFormatter,
				private reclutadorService: ReclutadorService
){
	}

    ngOnInit() {
		this.reclutadorService.clear();
        this.reclutador = new Reclutador;

       
    } 

save(){


   this.reclutadorService.saveReclutador(this.reclutador).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Reclutador save successfully.', 'success');
        this.router.navigate([ '../managereclutador' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Reclutador.', 'error');
     }else{
       swal('Error...', 'Reclutador save unsuccessfully.', 'error');
     }
   } );
}


  return(reclutador){
      this.location.back();
  }
}

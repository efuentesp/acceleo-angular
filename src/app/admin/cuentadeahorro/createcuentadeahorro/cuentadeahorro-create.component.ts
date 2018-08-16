import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { CuentadeahorroService }                                  from '../../cuentadeahorro/cuentadeahorro.component.service';
import { Cuentadeahorro }                                         from '../../cuentadeahorro/cuentadeahorro.component.model';


@Component ({
    selector: 'app-view',
    templateUrl: './cuentadeahorro-create.component.html',
	styleUrls: ['./cuentadeahorro-create.component.css']
})

export class CuentadeahorroCreateComponent implements OnInit {

    public title = 'Nuevo Cuentadeahorro';
    public cuentadeahorro: Cuentadeahorro;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;


    constructor(private router: Router,  
				private route: ActivatedRoute, 
                private location: Location,
                private parserFormatter: NgbDateParserFormatter,
				private cuentadeahorroService: CuentadeahorroService
){
	}

    ngOnInit() {
		this.cuentadeahorroService.clear();
        this.cuentadeahorro = new Cuentadeahorro;

       
    } 

save(){

	this.cuentadeahorro.fechacontratacion = this.parserFormatter.format(this.cuentadeahorro.fechacontratacionAux);
	this.cuentadeahorro.fechavencimiento = this.parserFormatter.format(this.cuentadeahorro.fechavencimientoAux);
    this.cuentadeahorro.fechadisponibilidad = this.parserFormatter.format(this.cuentadeahorro.fechadisponibilidadAux);
    
   this.cuentadeahorroService.saveCuentadeahorro(this.cuentadeahorro).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Cuentadeahorro save successfully.', 'success');
        this.router.navigate([ '../managecuentadeahorro' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Cuentadeahorro.', 'error');
     }else{
       swal('Error...', 'Cuentadeahorro save unsuccessfully.', 'error');
     }
   } );
}


  return(cuentadeahorro){
      this.location.back();
  }
}

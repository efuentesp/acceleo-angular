import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { BeneficiarioService }                                  from '../../beneficiario/beneficiario.component.service';
import { Beneficiario }                                         from '../../beneficiario/beneficiario.component.model';

import { CuentadeahorroService }                                  from '../../cuentadeahorro/cuentadeahorro.component.service';
import { Cuentadeahorro }                                         from '../../cuentadeahorro/cuentadeahorro.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './beneficiario-create.component.html',
	styleUrls: ['./beneficiario-create.component.css']
})

export class BeneficiarioCreateComponent implements OnInit {

    public title = 'Nuevo Beneficiario';
    public beneficiario: Beneficiario;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;
	public datePipe = new DatePipe('en-US');

	public cuentadeahorroList: Cuentadeahorro [];
    public cuentadeahorro: Cuentadeahorro;
    public cuentadeahorroAux: Cuentadeahorro;

	public busquedaCuentadeahorro='';
	filterInputCuentadeahorro = new FormControl();


    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private parserFormatter: NgbDateParserFormatter,
				private beneficiarioService: BeneficiarioService
	,private cuentadeahorroService: CuentadeahorroService
){
  	 this.filterInputCuentadeahorro.valueChanges.subscribe(busquedaCuentadeahorro => {
     this.busquedaCuentadeahorro = busquedaCuentadeahorro;
   });
	}

    ngOnInit() {
		this.beneficiarioService.clear();
        this.beneficiario = new Beneficiario;

		this.loadCuentadeahorros();
       
    } 

save(){

	this.beneficiario.fechanacimiento = this.parserFormatter.format(this.beneficiario.fechanacimientoAux);

   this.beneficiarioService.saveBeneficiario(this.beneficiario).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Beneficiario save successfully.', 'success');
        this.router.navigate([ '../managebeneficiario' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Beneficiario.', 'error');
     }else{
       swal('Error...', 'Beneficiario save unsuccessfully.', 'error');
     }
   } );
}


	loadCuentadeahorros(){
  		this.cuentadeahorroService.getAllCuentadeahorro().subscribe(data => {
    	if (data) {
      	
		this.cuentadeahorroList = data;
// Cambios por cada modal
    	}
  		}, error => {
    	swal('Error...', 'An error occurred while calling the Cuentadeahorros.', 'error');
  	});



}

 setClickedRowCuentadeahorro(index,cuentadeahorro){
	      
		  cuentadeahorro.checked = !cuentadeahorro.checked;
		  if (cuentadeahorro.checked){
		  this.cuentadeahorroService.setCuentadeahorro(cuentadeahorro);
		  this.beneficiario.cuentadeahorroId = cuentadeahorro.cuentadeahorroId;
		  this.beneficiario.cuentadeahorroItem = cuentadeahorro.
	    	}else{
            this.cuentadeahorroService.clear();
			this.beneficiario.cuentadeahorroId = null;
		    this.beneficiario.cuentadeahorroItem = "";
		}
 }

  return(beneficiario){
      this.location.back();
  }
}

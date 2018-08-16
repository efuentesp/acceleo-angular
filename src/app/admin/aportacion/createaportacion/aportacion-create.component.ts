import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';

import { AportacionService }                                  from '../../aportacion/aportacion.component.service';
import { Aportacion }                                         from '../../aportacion/aportacion.component.model';

import { CuentadeahorroService }                                  from '../../cuentadeahorro/cuentadeahorro.component.service';
import { Cuentadeahorro }                                         from '../../cuentadeahorro/cuentadeahorro.component.model';

import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component ({
    selector: 'app-view',
    templateUrl: './aportacion-create.component.html',
	styleUrls: ['./aportacion-create.component.css']
})

export class AportacionCreateComponent implements OnInit {

    public title = 'Nuevo Aportacion';
    public aportacion: Aportacion;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public cuentadeahorroList: Cuentadeahorro [];
    public cuentadeahorro: Cuentadeahorro;
    public cuentadeahorroAux: Cuentadeahorro;

	public busquedaCuentadeahorro='';
	filterInputCuentadeahorro = new FormControl();

    public datePipe = new DatePipe('en-US');

    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private aportacionService: AportacionService
    ,private cuentadeahorroService: CuentadeahorroService
    ,private parserFormatter: NgbDateParserFormatter
){
  	 this.filterInputCuentadeahorro.valueChanges.subscribe(busquedaCuentadeahorro => {
     this.busquedaCuentadeahorro = busquedaCuentadeahorro;
   });
	}

    ngOnInit() {
		this.aportacionService.clear();
        this.aportacion = new Aportacion;

		this.loadCuentadeahorros();
       
    } 

save(){

   // Dates 
   this.aportacion.fecha = this.parserFormatter.format(this.aportacion.fechaAux);

   this.aportacionService.saveAportacion(this.aportacion).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Aportacion save successfully.', 'success');
        this.router.navigate([ '../manageaportacion' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Aportacion.', 'error');
     }else{
       swal('Error...', 'Aportacion save unsuccessfully.', 'error');
     }
   } );
}

	loadCuentadeahorros(){
  		this.cuentadeahorroService.getAllCuentadeahorro().subscribe(data => {
    	if (data) {
      	
        this.cuentadeahorroList = data;
        

        this.cuentadeahorroList.forEach(element => {
            this.cuentadeahorroService.getCuentadeahorroById(element.cuentadeahorroId).subscribe(dataAux => {
        
    
                if (element.tipoahorroId == 'v'){
                    element.tipoahorroItem = 'Ahorro a la vista';
                }
                if (element.tipoahorroId == 'm1'){
                  element.tipoahorroItem = 'Plazo fijo 1 mes';
                }                
                if (element.tipoahorroId == 'm3'){
                    element.tipoahorroItem = 'Plazo fijo 3 meses';
                }
                if (element.tipoahorroId == 'm6'){
                    element.tipoahorroItem = 'Plazo fijo 6 meses';
                }
                if (element.tipoahorroId == 'fap'){
                  element.tipoahorroItem = 'Patrimonial FAP';
              }
              if (element.tipoahorroId == 'nov'){
                element.tipoahorroItem = 'Ahorro a noviembre';
            }
            if (element.tipoahorroId == 'esp1'){
              element.tipoahorroItem = 'Especial anual';
          }
          if (element.tipoahorroId == 'esp2'){
            element.tipoahorroItem = 'Especial educacion';
        }
            
          });	
        });

    	}
  		}, error => {
    	swal('Error...', 'An error occurred while calling the Cuentadeahorros.', 'error');
  	});



}

 setClickedRowCuentadeahorro(index,cuentadeahorro){
	      
		  cuentadeahorro.checked = !cuentadeahorro.checked;
		  if (cuentadeahorro.checked){
		  this.cuentadeahorroService.setCuentadeahorro(cuentadeahorro);
		  this.aportacion.cuentadeahorroId = cuentadeahorro.cuentadeahorroId;
		  this.aportacion.cuentadeahorroItem = cuentadeahorro.numero;
	    	}else{
            this.cuentadeahorroService.clear();
			this.aportacion.cuentadeahorroId = null;
		    this.aportacion.cuentadeahorroItem = "";
		}
 }

  return(aportacion){
      this.location.back();
  }
}

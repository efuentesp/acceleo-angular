import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { OrdensimplificadaService }                                  from '../../ordensimplificada/ordensimplificada.component.service';
import { Ordensimplificada }                                         from '../../ordensimplificada/ordensimplificada.component.model';

import { OperadorproduccionService }                                  from '../../operadorproduccion/operadorproduccion.component.service';
import { Operadorproduccion }                                         from '../../operadorproduccion/operadorproduccion.component.model';
import { ClienteService }                                  from '../../cliente/cliente.component.service';
import { Cliente }                                         from '../../cliente/cliente.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './ordensimplificada-create.component.html',
	styleUrls: ['./ordensimplificada-create.component.css']
})

export class OrdensimplificadaCreateComponent implements OnInit {

    public title = 'Nuevo Ordensimplificada';
    public ordensimplificada: Ordensimplificada;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;
	public datePipe = new DatePipe('en-US');

	public operadorproduccion1List: Operadorproduccion [];
    public operadorproduccion1: Operadorproduccion;
    public operadorproduccion1Aux: Operadorproduccion;

	public busquedaOperadorproduccion1='';
    public filterInputOperadorproduccion1 = new FormControl();

    public operadorproduccion2List: Operadorproduccion [];
    public operadorproduccion2: Operadorproduccion;
    public operadorproduccion2Aux: Operadorproduccion;

    public busquedaOperadorproduccion2='';
	public filterInputOperadorproduccion2 = new FormControl();

	public cliente1List: Cliente [];
    public cliente1: Cliente;
    public cliente1Aux: Cliente;

	public busquedaCliente1='';
	filterInputCliente1 = new FormControl();


    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private parserFormatter: NgbDateParserFormatter,
				private ordensimplificadaService: OrdensimplificadaService
	,private operadorproduccionService: OperadorproduccionService
	,private clienteService: ClienteService
){
  	 this.filterInputOperadorproduccion1.valueChanges.subscribe(busquedaOperadorproduccion => {
     this.busquedaOperadorproduccion1 = busquedaOperadorproduccion;
   });
  	 this.filterInputOperadorproduccion2.valueChanges.subscribe(busquedaOperadorproduccion => {
     this.busquedaOperadorproduccion2 = busquedaOperadorproduccion;
   });
  	 this.filterInputCliente1.valueChanges.subscribe(busquedaCliente => {
     this.busquedaCliente1 = busquedaCliente;
   });
	}

    ngOnInit() {
		this.ordensimplificadaService.clear();
        this.ordensimplificada = new Ordensimplificada;

		this.loadOperadorproduccion1();
		this.loadOperadorproduccion2();
		this.loadCliente1();
       
    } 

save(){

	this.ordensimplificada.fechainicial = this.parserFormatter.format(this.ordensimplificada.fechainicialAux);
	this.ordensimplificada.fechafinal = this.parserFormatter.format(this.ordensimplificada.fechafinalAux);

   this.ordensimplificadaService.saveOrdensimplificada(this.ordensimplificada).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Ordensimplificada save successfully.', 'success');
        this.router.navigate([ '../manageordensimplificada' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Ordensimplificada.', 'error');
     }else{
       swal('Error...', 'Ordensimplificada save unsuccessfully.', 'error');
     }
   } );
}


	loadOperadorproduccion1(){
  		this.operadorproduccionService.getAllOperadorproduccion().subscribe(data => {
            if (data) {
            this.operadorproduccion1List = data;
            }
  		}, error => {
    	swal('Error...', 'An error occurred while calling the Operadorproduccions.', 'error');
  	    });
    }

    loadOperadorproduccion2(){
        this.operadorproduccionService.getAllOperadorproduccion().subscribe(data => {
          if (data) {
          this.operadorproduccion2List = data;
          }
        }, error => {
      swal('Error...', 'An error occurred while calling the Operadorproduccions.', 'error');
        });
    }

//  setClickedRowOperadorproduccion(index,operadorproduccion){
	      
// 		  operadorproduccion.checked = !operadorproduccion.checked;
// 		  if (operadorproduccion.checked){
// 		  this.operadorproduccionService.setOperadorproduccion(operadorproduccion);
// 		  this.ordensimplificada.operadorproduccionId = operadorproduccion.operadorproduccionId;
// 		  this.ordensimplificada.operadorproduccionItem = operadorproduccion.numeroempleado;
// 	    	}else{
//             this.operadorproduccionService.clear();
// 			this.ordensimplificada.operadorproduccionId = null;
// 		    this.ordensimplificada.operadorproduccionItem = "";
// 		}
//  }

	loadCliente1(){
  		this.clienteService.getAllCliente().subscribe(data => {
            if (data) {
                this.cliente1List = data;
                this.cliente1List.forEach(element => {
                    if (element.cliente1Id != null){
                        this.clienteService.getClienteById(element.cliente1Id).subscribe(dataAux => {
                        if (dataAux) {
                            element.cliente1Item = dataAux.nombre;
                        }	
                    });	
                    }else{
                            element.cliente1Item = "NA";
                    }
                });
            }
  		}, error => {
        	swal('Error...', 'An error occurred while calling the Clientes.', 'error');
  	});
}

 setClickedRowCliente1(index,cliente1){
        cliente1.checked = !cliente1.checked;
        if (cliente1.checked){
            this.clienteService.setCliente(cliente1);
            this.ordensimplificada.cliente1Id = cliente1.clienteId;
            this.ordensimplificada.cliente1Item = cliente1.nombre;
        }else{
            this.clienteService.clear();
            this.ordensimplificada.cliente1Id = null;
            this.ordensimplificada.cliente1Item = "";
    }
 }

  return(ordensimplificada){
      this.location.back();
  }
}

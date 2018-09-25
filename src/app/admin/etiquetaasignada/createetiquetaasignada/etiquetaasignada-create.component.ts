import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { EtiquetaasignadaService }                                  from '../../etiquetaasignada/etiquetaasignada.component.service';
import { Etiquetaasignada }                                         from '../../etiquetaasignada/etiquetaasignada.component.model';

import { ClienteService }                                  from '../../cliente/cliente.component.service';
import { Cliente }                                         from '../../cliente/cliente.component.model';
import { OrdensimplificadaService }                                  from '../../ordensimplificada/ordensimplificada.component.service';
import { Ordensimplificada }                                         from '../../ordensimplificada/ordensimplificada.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './etiquetaasignada-create.component.html',
	styleUrls: ['./etiquetaasignada-create.component.css']
})

export class EtiquetaasignadaCreateComponent implements OnInit {

    public title = 'Nuevo Etiquetaasignada';
    public etiquetaasignada: Etiquetaasignada;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;
	public datePipe = new DatePipe('en-US');

	public cliente1List: Cliente [];
    public cliente1: Cliente;
    public cliente1Aux: Cliente;

	public busquedaCliente1='';
	filterInputCliente1 = new FormControl();

	public ordensimplificada1List: Ordensimplificada [];
    public ordensimplificada1: Ordensimplificada;
    public ordensimplificada1Aux: Ordensimplificada;

	public busquedaOrdensimplificada1='';
	filterInputOrdensimplificada1 = new FormControl();


    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private parserFormatter: NgbDateParserFormatter,
				private etiquetaasignadaService: EtiquetaasignadaService
	,private clienteService: ClienteService
	,private ordensimplificadaService: OrdensimplificadaService
){
  	 this.filterInputCliente1.valueChanges.subscribe(busquedaCliente => {
     this.busquedaCliente1 = busquedaCliente;
   });
  	 this.filterInputOrdensimplificada1.valueChanges.subscribe(busquedaOrdensimplificada => {
     this.busquedaOrdensimplificada1 = busquedaOrdensimplificada;
   });
	}

    ngOnInit() {
		this.etiquetaasignadaService.clear();
        this.etiquetaasignada = new Etiquetaasignada;

		// this.loadCliente1();
		this.loadOrdensimplificada1();
       
    } 

save(){


   this.etiquetaasignadaService.saveEtiquetaasignada(this.etiquetaasignada).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Etiquetaasignada save successfully.', 'success');
        this.router.navigate([ '../manageetiquetaasignada' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Etiquetaasignada.', 'error');
     }else{
       swal('Error...', 'Etiquetaasignada save unsuccessfully.', 'error');
     }
   } );
}


// 	loadCliente1(){
//   		this.clienteService.getAllCliente().subscribe(data => {
//     	if (data) {
// 		this.cliente1List = data;
// 		this.cliente1List.forEach(element => {

// 				if (element.cliente1Id != null){
// 					this.clienteService.getClienteById(element.cliente1Id).subscribe(dataAux => {
// 					console.log('Recupera: ', dataAux);
// 					if (dataAux) {
// 						element.cliente1Item = dataAux.nombre;
// 					}	
// 				});	
// 				}else{
// 						element.cliente1Item = "NA";
// 				}
// 			});
//     	}
//   		}, error => {
//     	swal('Error...', 'An error occurred while calling the Clientes.', 'error');
//   	});

// }

//  setClickedRowCliente1(index,cliente1){
	      
// 		  cliente1.checked = !cliente1.checked;
// 		  if (cliente1.checked){
// 		  this.clienteService.setCliente(cliente1);
// 		  this.etiquetaasignada.cliente1Id = cliente1.clienteId;
// 		  this.etiquetaasignada.cliente1Item = cliente1.nombre;
// 	    	}else{
//             this.clienteService.clear();
// 			this.etiquetaasignada.cliente1Id = null;
// 		    this.etiquetaasignada.cliente1Item = "";
// 		}
//  }

	loadOrdensimplificada1(){
  		this.ordensimplificadaService.getAllOrdensimplificada().subscribe(data => {

			console.log('Prueba: ', data);
    	if (data) {
      	
		this.ordensimplificada1List = data;

    	}
  		}, error => {
    	swal('Error...', 'An error occurred while calling the Ordensimplificadas.', 'error');
  	});



}

 setClickedRowOrdensimplificada1(index,ordensimplificada1){
	      
		  ordensimplificada1.checked = !ordensimplificada1.checked;
		  if (ordensimplificada1.checked){
				this.ordensimplificadaService.setOrdensimplificada(ordensimplificada1);
				this.etiquetaasignada.ordensimplificada1Id = ordensimplificada1.ordensimplificada1Id;
				this.etiquetaasignada.ordensimplificada1Item = ordensimplificada1.ordentrabajo;
	    	}else{
				this.ordensimplificadaService.clear();
				this.etiquetaasignada.ordensimplificada1Id = null;
				this.etiquetaasignada.ordensimplificada1Item = "";
		}
 }

  return(etiquetaasignada){
      this.location.back();
  }
}

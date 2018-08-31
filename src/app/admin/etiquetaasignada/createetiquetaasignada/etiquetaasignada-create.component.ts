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

	public clienteList: Cliente [];
    public cliente: Cliente;
    public clienteAux: Cliente;

	public busquedaCliente='';
	filterInputCliente = new FormControl();

	public ordensimplificadaList: Ordensimplificada [];
    public ordensimplificada: Ordensimplificada;
    public ordensimplificadaAux: Ordensimplificada;

	public busquedaOrdensimplificada='';
	filterInputOrdensimplificada = new FormControl();


    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private parserFormatter: NgbDateParserFormatter,
				private etiquetaasignadaService: EtiquetaasignadaService
	,private clienteService: ClienteService
	,private ordensimplificadaService: OrdensimplificadaService
){
  	 this.filterInputCliente.valueChanges.subscribe(busquedaCliente => {
     this.busquedaCliente = busquedaCliente;
   });
  	 this.filterInputOrdensimplificada.valueChanges.subscribe(busquedaOrdensimplificada => {
     this.busquedaOrdensimplificada = busquedaOrdensimplificada;
   });
	}

    ngOnInit() {
		this.etiquetaasignadaService.clear();
        this.etiquetaasignada = new Etiquetaasignada;

		this.loadClientes();
		this.loadOrdensimplificadas();
       
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


	loadClientes(){
  		this.clienteService.getAllCliente().subscribe(data => {
    	if (data) {
      	
		this.clienteList = data;
// Cambios por cada modal
    	}
  		}, error => {
    	swal('Error...', 'An error occurred while calling the Clientes.', 'error');
  	});



}

 setClickedRowCliente(index,cliente){
	      
		  cliente.checked = !cliente.checked;
		  if (cliente.checked){
		  this.clienteService.setCliente(cliente);
		  this.etiquetaasignada.clienteId = cliente.clienteId;
		  this.etiquetaasignada.clienteItem = cliente.nombre;
	    	}else{
            this.clienteService.clear();
			this.etiquetaasignada.clienteId = null;
		    this.etiquetaasignada.clienteItem = "";
		}
 }

	loadOrdensimplificadas(){
  		this.ordensimplificadaService.getAllOrdensimplificada().subscribe(data => {
    	if (data) {
      	
		this.ordensimplificadaList = data;
// Cambios por cada modal
    	}
  		}, error => {
    	swal('Error...', 'An error occurred while calling the Ordensimplificadas.', 'error');
  	});



}

 setClickedRowOrdensimplificada(index,ordensimplificada){
	      
		  ordensimplificada.checked = !ordensimplificada.checked;
		  if (ordensimplificada.checked){
		  this.ordensimplificadaService.setOrdensimplificada(ordensimplificada);
		  this.etiquetaasignada.ordensimplificadaId = ordensimplificada.ordensimplificadaId;
		  this.etiquetaasignada.ordensimplificadaItem = ordensimplificada.ordentrabajo;
	    	}else{
            this.ordensimplificadaService.clear();
			this.etiquetaasignada.ordensimplificadaId = null;
		    this.etiquetaasignada.ordensimplificadaItem = "";
		}
 }

  return(etiquetaasignada){
      this.location.back();
  }
}

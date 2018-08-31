import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { ClienteService }                                  from '../../cliente/cliente.component.service';
import { Cliente }                                         from '../../cliente/cliente.component.model';

import { EtiquetaasignadaService }                                  from '../../etiquetaasignada/etiquetaasignada.component.service';
import { Etiquetaasignada }                                         from '../../etiquetaasignada/etiquetaasignada.component.model';
import { OrdensimplificadaService }                                  from '../../ordensimplificada/ordensimplificada.component.service';
import { Ordensimplificada }                                         from '../../ordensimplificada/ordensimplificada.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './cliente-create.component.html',
	styleUrls: ['./cliente-create.component.css']
})

export class ClienteCreateComponent implements OnInit {

    public title = 'Nuevo Cliente';
    public cliente: Cliente;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;
	public datePipe = new DatePipe('en-US');

	public clienteList: Cliente [];
    public clienteAux: Cliente;

	public busquedaCliente='';
	filterInputCliente = new FormControl();

	public etiquetaasignadaList: Etiquetaasignada [];
    public etiquetaasignada: Etiquetaasignada;
    public etiquetaasignadaAux: Etiquetaasignada;

	public busquedaEtiquetaasignada='';
	filterInputEtiquetaasignada = new FormControl();

	public ordensimplificadaList: Ordensimplificada [];
    public ordensimplificada: Ordensimplificada;
    public ordensimplificadaAux: Ordensimplificada;

	public busquedaOrdensimplificada='';
	filterInputOrdensimplificada = new FormControl();


    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private parserFormatter: NgbDateParserFormatter,
				private clienteService: ClienteService
	,private etiquetaasignadaService: EtiquetaasignadaService
	,private ordensimplificadaService: OrdensimplificadaService
){
  	 this.filterInputCliente.valueChanges.subscribe(busquedaCliente => {
     this.busquedaCliente = busquedaCliente;
   });
  	 this.filterInputEtiquetaasignada.valueChanges.subscribe(busquedaEtiquetaasignada => {
     this.busquedaEtiquetaasignada = busquedaEtiquetaasignada;
   });
  	 this.filterInputOrdensimplificada.valueChanges.subscribe(busquedaOrdensimplificada => {
     this.busquedaOrdensimplificada = busquedaOrdensimplificada;
   });
	}

    ngOnInit() {
		this.clienteService.clear();
        this.cliente = new Cliente;

		this.loadClientes();
		this.loadEtiquetaasignadas();
		this.loadOrdensimplificadas();
       
    } 

save(){


   this.clienteService.saveCliente(this.cliente).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Cliente save successfully.', 'success');
        this.router.navigate([ '../managecliente' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Cliente.', 'error');
     }else{
       swal('Error...', 'Cliente save unsuccessfully.', 'error');
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
		  this.cliente.clienteId = cliente.clienteId;
		  this.cliente.clienteItem = cliente.nombre;
	    	}else{
            this.clienteService.clear();
			this.cliente.clienteId = null;
		    this.cliente.clienteItem = "";
		}
 }

	loadEtiquetaasignadas(){
  		this.etiquetaasignadaService.getAllEtiquetaasignada().subscribe(data => {
    	if (data) {
      	
		this.etiquetaasignadaList = data;
// Cambios por cada modal
    	}
  		}, error => {
    	swal('Error...', 'An error occurred while calling the Etiquetaasignadas.', 'error');
  	});



}

 setClickedRowEtiquetaasignada(index,etiquetaasignada){
	      
		  etiquetaasignada.checked = !etiquetaasignada.checked;
		  if (etiquetaasignada.checked){
		  this.etiquetaasignadaService.setEtiquetaasignada(etiquetaasignada);
		  this.cliente.etiquetaasignadaId = etiquetaasignada.etiquetaasignadaId;
		  this.cliente.etiquetaasignadaItem = etiquetaasignada.sap;
	    	}else{
            this.etiquetaasignadaService.clear();
			this.cliente.etiquetaasignadaId = null;
		    this.cliente.etiquetaasignadaItem = "";
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
		  this.cliente.ordensimplificadaId = ordensimplificada.ordensimplificadaId;
		  this.cliente.ordensimplificadaItem = ordensimplificada.sap;
	    	}else{
            this.ordensimplificadaService.clear();
			this.cliente.ordensimplificadaId = null;
		    this.cliente.ordensimplificadaItem = "";
		}
 }

  return(cliente){
      this.location.back();
  }
}

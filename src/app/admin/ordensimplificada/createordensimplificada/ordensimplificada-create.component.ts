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

	public operadorproduccionList: Operadorproduccion [];
    public operadorproduccion: Operadorproduccion;
    public operadorproduccionAux: Operadorproduccion;

	public busquedaOperadorproduccion='';
	filterInputOperadorproduccion = new FormControl();

	public clienteList: Cliente [];
    public cliente: Cliente;
    public clienteAux: Cliente;

	public busquedaCliente='';
	filterInputCliente = new FormControl();


    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private parserFormatter: NgbDateParserFormatter,
				private ordensimplificadaService: OrdensimplificadaService
	,private operadorproduccionService: OperadorproduccionService
	,private clienteService: ClienteService
){
  	 this.filterInputOperadorproduccion.valueChanges.subscribe(busquedaOperadorproduccion => {
     this.busquedaOperadorproduccion = busquedaOperadorproduccion;
   });
  	 this.filterInputOperadorproduccion.valueChanges.subscribe(busquedaOperadorproduccion => {
     this.busquedaOperadorproduccion = busquedaOperadorproduccion;
   });
  	 this.filterInputCliente.valueChanges.subscribe(busquedaCliente => {
     this.busquedaCliente = busquedaCliente;
   });
	}

    ngOnInit() {
		this.ordensimplificadaService.clear();
        this.ordensimplificada = new Ordensimplificada;

		this.loadOperadorproduccions();
		this.loadOperadorproduccions();
		this.loadClientes();
       
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


	loadOperadorproduccions(){
  		this.operadorproduccionService.getAllOperadorproduccion().subscribe(data => {
    	if (data) {
      	
		this.operadorproduccionList = data;
// Cambios por cada modal
    	}
  		}, error => {
    	swal('Error...', 'An error occurred while calling the Operadorproduccions.', 'error');
  	});



}

 setClickedRowOperadorproduccion(index,operadorproduccion){
	      
		  operadorproduccion.checked = !operadorproduccion.checked;
		  if (operadorproduccion.checked){
		  this.operadorproduccionService.setOperadorproduccion(operadorproduccion);
		  this.ordensimplificada.operadorproduccionId = operadorproduccion.operadorproduccionId;
		  this.ordensimplificada.operadorproduccionItem = operadorproduccion.numeroempleado;
	    	}else{
            this.operadorproduccionService.clear();
			this.ordensimplificada.operadorproduccionId = null;
		    this.ordensimplificada.operadorproduccionItem = "";
		}
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
		  this.ordensimplificada.clienteId = cliente.clienteId;
		  this.ordensimplificada.clienteItem = cliente.nombre;
	    	}else{
            this.clienteService.clear();
			this.ordensimplificada.clienteId = null;
		    this.ordensimplificada.clienteItem = "";
		}
 }

  return(ordensimplificada){
      this.location.back();
  }
}

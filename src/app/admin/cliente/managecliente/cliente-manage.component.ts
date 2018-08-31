import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';

import { ClienteService }                                  from '../../cliente/cliente.component.service';
import { Cliente }                                         from '../../cliente/cliente.component.model';

//import { ClienteService }                                  from '../../cliente/cliente.component.service';
//import { Cliente }                                         from '../../cliente/cliente.component.model';
import { EtiquetaasignadaService }                                  from '../../etiquetaasignada/etiquetaasignada.component.service';
import { Etiquetaasignada }                                         from '../../etiquetaasignada/etiquetaasignada.component.model';
import { OrdensimplificadaService }                                  from '../../ordensimplificada/ordensimplificada.component.service';
import { Ordensimplificada }                                         from '../../ordensimplificada/ordensimplificada.component.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component ({
    selector: 'app-view',
    templateUrl: './cliente-manage.component.html',
	styleUrls: ['./cliente-manage.component.css']
})

export class ClienteManageComponent implements OnInit {

    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

    public title = 'Manage Cliente';
    public clienteList: Cliente [];
    public cliente: Cliente;

  	public busquedacliente='';
    public filterInputcliente = new FormControl();

 	public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));

    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;

	//public clienteList: Cliente [];
  //  public cliente: Cliente;
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
				private clienteService: ClienteService
	//,private clienteService: ClienteService
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
      
	  // Get data user
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.valueName = this.user.username;
      this.token = this.user.token;

      this.clienteService.setEdit(false);
      this.clienteService.setDelete(false);

      this.loadClientes();
      this.habilita();

    }   

    loadClientes() {
      this.clienteService.getAllCliente().subscribe(data => {

		var datePipe = new DatePipe('en-US');

        if (data) {

          this.clienteList = data;

			this.clienteList.forEach(element => {

				//Atributocliente

			//let datePipe     = new DatePipe('en-US');
			//let fechaDate    = datePipe.transform(element.fecha, 'yyyy-MM-dd');
            //element.fecha    = fechaDate;
            //element.fechaAux = this.parse(fechaDate);



				this.clienteService.getClienteById(element.clienteId).subscribe(dataAux => {
					if (dataAux) {
						this.clienteAux = dataAux;
						element.clienteItem = this.clienteAux.nombre;




















				}	
			});	
		});

			this.clienteList.forEach(element => {

				//Atributoetiquetaasignada

			//let datePipe     = new DatePipe('en-US');
			//let fechaDate    = datePipe.transform(element.fecha, 'yyyy-MM-dd');
            //element.fecha    = fechaDate;
            //element.fechaAux = this.parse(fechaDate);



				this.etiquetaasignadaService.getEtiquetaasignadaById(element.etiquetaasignadaId).subscribe(dataAux => {
					if (dataAux) {
						this.etiquetaasignadaAux = dataAux;
						element.etiquetaasignadaItem = this.etiquetaasignadaAux.sap+"";




















				}	
			});	
		});

			this.clienteList.forEach(element => {

				//Atributoordensimplificada

			//let datePipe     = new DatePipe('en-US');
			//let fechaDate    = datePipe.transform(element.fecha, 'yyyy-MM-dd');
            //element.fecha    = fechaDate;
            //element.fechaAux = this.parse(fechaDate);



				this.ordensimplificadaService.getOrdensimplificadaById(element.ordensimplificadaId).subscribe(dataAux => {
					if (dataAux) {
						this.ordensimplificadaAux = dataAux;
						element.ordensimplificadaItem = this.ordensimplificadaAux.ordentrabajo+"";




















				}	
			});	
		});

        }
      }, error => {
        swal('Error...', 'An error occurred while calling the clientes.', 'error');
      });
    }

  add(){
    this.clienteService.clear();
    this.router.navigate([ '../createcliente' ], { relativeTo: this.route })
  }

  editar(cliente){
    this.clienteService.setCliente(cliente);
    this.clienteService.setEdit(true);
    this.clienteService.setDelete(false);
    this.router.navigate([ '../editcliente' ], { relativeTo: this.route })
  }

  eliminar(cliente){
    this.clienteService.setCliente(cliente);
    this.clienteService.setEdit(false);
    this.clienteService.setDelete(true);
    this.router.navigate([ '../editcliente' ], { relativeTo: this.route })
  }

  // Select row
  setClickedRowCliente(index, cliente){
    this.clienteService.setCliente(cliente);
    this.clienteService.setEdit(true);
    this.clienteService.setDelete(false);
    this.router.navigate([ '../editcliente' ], { relativeTo: this.route })
  }
  
  habilita(){
    this.userAdmin.authorities.forEach(element => {
      if (element.authority == 'ROLE_CLIENTEDELETE'){
        this.deleteActive = true;
      }
      if (element.authority == 'ROLE_CLIENTECREATE'){
        this.createActive = true;
      }
      if (element.authority == 'ROLE_CLIENTEUPDATE'){
        this.updateActive = true;
      }
      if (element.authority == 'ROLE_CLIENTESEARCH'){
        this.searchActive = true;
      }
    });
  }

  // Parse to NgbDateStruct
    isNumber(value: any): boolean {
      return !isNaN(this.toInteger(value));
  }
 
  toInteger(value: any): number {
      return parseInt(`${value}`, 10);
  }
  parse(value: string): NgbDateStruct {
    if (value) {
        const dateParts = value.trim().split('-');
        if (dateParts.length === 1 && this.isNumber(dateParts[0])) {
            return {day: this.toInteger(dateParts[0]), month: null, year: null};
        } else if (dateParts.length === 2 && this.isNumber(dateParts[0]) && this.isNumber(dateParts[1])) {
            return {day: this.toInteger(dateParts[1]), month: this.toInteger(dateParts[0]), year: null};
        } else if (dateParts.length === 3 && this.isNumber(dateParts[0]) && this.isNumber(dateParts[1]) && this.isNumber(dateParts[2])) {
            return {day: this.toInteger(dateParts[2]), month: this.toInteger(dateParts[1]), year: this.toInteger(dateParts[0])};
        }
    }
    return null;
  }

}

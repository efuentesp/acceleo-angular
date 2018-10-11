import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';

import { OrdensimplificadaService }                                  from '../../ordensimplificada/ordensimplificada.component.service';
import { Ordensimplificada }                                         from '../../ordensimplificada/ordensimplificada.component.model';

import { OperadorproduccionService }                                  from '../../operadorproduccion/operadorproduccion.component.service';
import { Operadorproduccion }                                         from '../../operadorproduccion/operadorproduccion.component.model';
//import { OperadorproduccionService }                                  from '../../operadorproduccion/operadorproduccion.component.service';
//import { Operadorproduccion }                                         from '../../operadorproduccion/operadorproduccion.component.model';
import { ClienteService }                                  from '../../cliente/cliente.component.service';
import { Cliente }                                         from '../../cliente/cliente.component.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component ({
    selector: 'app-view',
    templateUrl: './ordensimplificada-manage.component.html',
	styleUrls: ['./ordensimplificada-manage.component.css']
})

export class OrdensimplificadaManageComponent implements OnInit {

    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

    public title = 'Manage Ordensimplificada';
    public ordensimplificadaList: Ordensimplificada [];
    public ordensimplificada: Ordensimplificada;

  	public busquedaordensimplificada='';
    public filterInputordensimplificada = new FormControl();

 	public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));

    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;

	public operadorproduccionList: Operadorproduccion [];
    public operadorproduccion: Operadorproduccion;
	public operadorproduccionAux: Operadorproduccion;

	public busquedaOperadorproduccion='';
	filterInputOperadorproduccion = new FormControl();
	// public operadorproduccionList: Operadorproduccion [];
    // public operadorproduccion: Operadorproduccion;
	// public operadorproduccionAux: Operadorproduccion;

	// public busquedaOperadorproduccion='';
	// filterInputOperadorproduccion = new FormControl();
	public clienteList: Cliente [];
    public cliente: Cliente;
	public clienteAux: Cliente;

	public busquedaCliente='';
	filterInputCliente = new FormControl();

    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private ordensimplificadaService: OrdensimplificadaService
	// ,private operadorproduccionService: OperadorproduccionService
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
      
	  // Get data user
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.valueName = this.user.username;
      this.token = this.user.token;

      this.ordensimplificadaService.setEdit(false);
      this.ordensimplificadaService.setDelete(false);

    //   this.loadOrdensimplificadas();
      this.habilita();

    }   

    // loadOrdensimplificadas() {
    //   this.ordensimplificadaService.getAllOrdensimplificada().subscribe(data => {

	// 	var datePipe = new DatePipe('en-US');

    //     if (data) {

    //       this.ordensimplificadaList = data;

	// 		this.ordensimplificadaList.forEach(element => {

	// 			// Atributooperadorproduccion

	// 		//let datePipe     = new DatePipe('en-US');
	// 		//let fechaDate    = datePipe.transform(element.fecha, 'yyyy-MM-dd');
    //         //element.fecha    = fechaDate;
    //         //element.fechaAux = this.parse(fechaDate);



	// 			this.operadorproduccionService.getOperadorproduccionById(element.operadorproduccionId).subscribe(dataAux => {
	// 				if (dataAux) {
	// 					this.operadorproduccionAux = dataAux;
	// 					element.operadorproduccionItem = this.operadorproduccionAux.numeroempleado+"";





	//       if (element.lineaId == 'a'){
	//           element.lineaItem = '1';
	//       }
	//       if (element.lineaId == 'b'){
	//           element.lineaItem = '2';
	//       }
	//       if (element.lineaId == 'c'){
	//           element.lineaItem = '3';
	//       }
	//       if (element.lineaId == 'd'){
	//           element.lineaItem = '4';
	//       }
	//       if (element.lineaId == 'e'){
	//           element.lineaItem = '5';
	//       }
	//       if (element.lineaId == 'f'){
	//           element.lineaItem = '6';
	//       }
	//       if (element.lineaId == 'g'){
	//           element.lineaItem = '7';
	//       }










	//       if (element.destinoId == 'xx'){
	//           element.destinoItem = 'N/A';
	//       }
	//       if (element.destinoId == 'd1'){
	//           element.destinoItem = 'USA';
	//       }
	//       if (element.destinoId == 'd2'){
	//           element.destinoItem = 'Canada';
	//       }


	//       if (element.estadoordenId == 'xx'){
	//           element.estadoordenItem = 'Pendiente';
	//       }
	//       if (element.estadoordenId == 'e1'){
	//           element.estadoordenItem = 'En proceso';
	//       }
	//       if (element.estadoordenId == 'e2'){
	//           element.estadoordenItem = 'Pausada';
	//       }
	//       if (element.estadoordenId == 'e3'){
	//           element.estadoordenItem = 'Finalizada';
	//       }
	//       if (element.estadoordenId == 'e4'){
	//           element.estadoordenItem = 'Cancelada';
	//       }


	//       if (element.estadoordenId == 'xx'){
	//           element.estadoordenItem = 'Pendiente';
	//       }
	//       if (element.estadoordenId == 'e1'){
	//           element.estadoordenItem = 'En proceso';
	//       }
	//       if (element.estadoordenId == 'e2'){
	//           element.estadoordenItem = 'Pausada';
	//       }
	//       if (element.estadoordenId == 'e3'){
	//           element.estadoordenItem = 'Finalizada';
	//       }
	//       if (element.estadoordenId == 'e4'){
	//           element.estadoordenItem = 'Cancelada';
	//       }



















	// 			}	
	// 		});	
	// 	});

	// 		this.ordensimplificadaList.forEach(element => {

	// 			//Atributooperadorproduccion

	// 		//let datePipe     = new DatePipe('en-US');
	// 		//let fechaDate    = datePipe.transform(element.fecha, 'yyyy-MM-dd');
    //         //element.fecha    = fechaDate;
    //         //element.fechaAux = this.parse(fechaDate);



	// 			this.operadorproduccionService.getOperadorproduccionById(element.operadorproduccionId).subscribe(dataAux => {
	// 				if (dataAux) {
	// 					this.operadorproduccionAux = dataAux;
	// 					element.operadorproduccionItem = this.operadorproduccionAux.numeroempleado+"";





	//       if (element.lineaId == 'a'){
	//           element.lineaItem = '1';
	//       }
	//       if (element.lineaId == 'b'){
	//           element.lineaItem = '2';
	//       }
	//       if (element.lineaId == 'c'){
	//           element.lineaItem = '3';
	//       }
	//       if (element.lineaId == 'd'){
	//           element.lineaItem = '4';
	//       }
	//       if (element.lineaId == 'e'){
	//           element.lineaItem = '5';
	//       }
	//       if (element.lineaId == 'f'){
	//           element.lineaItem = '6';
	//       }
	//       if (element.lineaId == 'g'){
	//           element.lineaItem = '7';
	//       }










	//       if (element.destinoId == 'xx'){
	//           element.destinoItem = 'N/A';
	//       }
	//       if (element.destinoId == 'd1'){
	//           element.destinoItem = 'USA';
	//       }
	//       if (element.destinoId == 'd2'){
	//           element.destinoItem = 'Canada';
	//       }


	//       if (element.estadoordenId == 'xx'){
	//           element.estadoordenItem = 'Pendiente';
	//       }
	//       if (element.estadoordenId == 'e1'){
	//           element.estadoordenItem = 'En proceso';
	//       }
	//       if (element.estadoordenId == 'e2'){
	//           element.estadoordenItem = 'Pausada';
	//       }
	//       if (element.estadoordenId == 'e3'){
	//           element.estadoordenItem = 'Finalizada';
	//       }
	//       if (element.estadoordenId == 'e4'){
	//           element.estadoordenItem = 'Cancelada';
	//       }


	//       if (element.estadoordenId == 'xx'){
	//           element.estadoordenItem = 'Pendiente';
	//       }
	//       if (element.estadoordenId == 'e1'){
	//           element.estadoordenItem = 'En proceso';
	//       }
	//       if (element.estadoordenId == 'e2'){
	//           element.estadoordenItem = 'Pausada';
	//       }
	//       if (element.estadoordenId == 'e3'){
	//           element.estadoordenItem = 'Finalizada';
	//       }
	//       if (element.estadoordenId == 'e4'){
	//           element.estadoordenItem = 'Cancelada';
	//       }



















	// 			}	
	// 		});	
	// 	});

	// 		this.ordensimplificadaList.forEach(element => {

	// 			//Atributocliente

	// 		//let datePipe     = new DatePipe('en-US');
	// 		//let fechaDate    = datePipe.transform(element.fecha, 'yyyy-MM-dd');
    //         //element.fecha    = fechaDate;
    //         //element.fechaAux = this.parse(fechaDate);



	// 			this.clienteService.getClienteById(element.clienteId).subscribe(dataAux => {
	// 				if (dataAux) {
	// 					this.clienteAux = dataAux;
	// 					element.clienteItem = this.clienteAux.nombre;





	//       if (element.lineaId == 'a'){
	//           element.lineaItem = '1';
	//       }
	//       if (element.lineaId == 'b'){
	//           element.lineaItem = '2';
	//       }
	//       if (element.lineaId == 'c'){
	//           element.lineaItem = '3';
	//       }
	//       if (element.lineaId == 'd'){
	//           element.lineaItem = '4';
	//       }
	//       if (element.lineaId == 'e'){
	//           element.lineaItem = '5';
	//       }
	//       if (element.lineaId == 'f'){
	//           element.lineaItem = '6';
	//       }
	//       if (element.lineaId == 'g'){
	//           element.lineaItem = '7';
	//       }










	//       if (element.destinoId == 'xx'){
	//           element.destinoItem = 'N/A';
	//       }
	//       if (element.destinoId == 'd1'){
	//           element.destinoItem = 'USA';
	//       }
	//       if (element.destinoId == 'd2'){
	//           element.destinoItem = 'Canada';
	//       }


	//       if (element.estadoordenId == 'xx'){
	//           element.estadoordenItem = 'Pendiente';
	//       }
	//       if (element.estadoordenId == 'e1'){
	//           element.estadoordenItem = 'En proceso';
	//       }
	//       if (element.estadoordenId == 'e2'){
	//           element.estadoordenItem = 'Pausada';
	//       }
	//       if (element.estadoordenId == 'e3'){
	//           element.estadoordenItem = 'Finalizada';
	//       }
	//       if (element.estadoordenId == 'e4'){
	//           element.estadoordenItem = 'Cancelada';
	//       }


	//       if (element.estadoordenId == 'xx'){
	//           element.estadoordenItem = 'Pendiente';
	//       }
	//       if (element.estadoordenId == 'e1'){
	//           element.estadoordenItem = 'En proceso';
	//       }
	//       if (element.estadoordenId == 'e2'){
	//           element.estadoordenItem = 'Pausada';
	//       }
	//       if (element.estadoordenId == 'e3'){
	//           element.estadoordenItem = 'Finalizada';
	//       }
	//       if (element.estadoordenId == 'e4'){
	//           element.estadoordenItem = 'Cancelada';
	//       }



















	// 			}	
	// 		});	
	// 	});

    //     }
    //   }, error => {
    //     swal('Error...', 'An error occurred while calling the ordensimplificadas.', 'error');
    //   });
    // }

  add(){
    this.ordensimplificadaService.clear();
    this.router.navigate([ '../createordensimplificada' ], { relativeTo: this.route })
  }

  editar(ordensimplificada){
    this.ordensimplificadaService.setOrdensimplificada(ordensimplificada);
    this.ordensimplificadaService.setEdit(true);
    this.ordensimplificadaService.setDelete(false);
    this.router.navigate([ '../editordensimplificada' ], { relativeTo: this.route })
  }

  eliminar(ordensimplificada){
    this.ordensimplificadaService.setOrdensimplificada(ordensimplificada);
    this.ordensimplificadaService.setEdit(false);
    this.ordensimplificadaService.setDelete(true);
    this.router.navigate([ '../editordensimplificada' ], { relativeTo: this.route })
  }

  // Select row
  setClickedRowOrdensimplificada(index, ordensimplificada){
    this.ordensimplificadaService.setOrdensimplificada(ordensimplificada);
    this.ordensimplificadaService.setEdit(true);
    this.ordensimplificadaService.setDelete(false);
    this.router.navigate([ '../editordensimplificada' ], { relativeTo: this.route })
  }
  
  habilita(){
    this.userAdmin.authorities.forEach(element => {
      if (element.authority == 'ROLE_ORDENSIMPLIFICADADELETE'){
        this.deleteActive = true;
      }
      if (element.authority == 'ROLE_ORDENSIMPLIFICADACREATE'){
        this.createActive = true;
      }
      if (element.authority == 'ROLE_ORDENSIMPLIFICADAUPDATE'){
        this.updateActive = true;
      }
      if (element.authority == 'ROLE_ORDENSIMPLIFICADASEARCH'){
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

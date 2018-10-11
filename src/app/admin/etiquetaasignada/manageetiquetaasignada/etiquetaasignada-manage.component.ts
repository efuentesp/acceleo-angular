import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';

import { EtiquetaasignadaService }                                  from '../../etiquetaasignada/etiquetaasignada.component.service';
import { Etiquetaasignada }                                         from '../../etiquetaasignada/etiquetaasignada.component.model';

import { ClienteService }                                  from '../../cliente/cliente.component.service';
import { Cliente }                                         from '../../cliente/cliente.component.model';
import { OrdensimplificadaService }                                  from '../../ordensimplificada/ordensimplificada.component.service';
import { Ordensimplificada }                                         from '../../ordensimplificada/ordensimplificada.component.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component ({
    selector: 'app-view',
    templateUrl: './etiquetaasignada-manage.component.html',
	styleUrls: ['./etiquetaasignada-manage.component.css']
})

export class EtiquetaasignadaManageComponent implements OnInit {

    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

    public title = 'Manage Etiquetaasignada';
    public etiquetaasignadaList: Etiquetaasignada [];
    public etiquetaasignada: Etiquetaasignada;

  	public busquedaetiquetaasignada='';
    public filterInputetiquetaasignada = new FormControl();

 	public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));

    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;

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
      
	    // Get data user
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.valueName = this.user.username;
      this.token = this.user.token;

      this.etiquetaasignadaService.setEdit(false);
      this.etiquetaasignadaService.setDelete(false);

      this.loadEtiquetaasignadas();
      this.habilita();

    }   

    loadEtiquetaasignadas() {
      this.etiquetaasignadaService.getAllEtiquetaasignada().subscribe(data => {

        if (data) {

          this.etiquetaasignadaList = data;

          this.etiquetaasignadaList.forEach(element => {

            this.clienteService.getClienteById(element.cliente1Id).subscribe(dataAux => {
              if (dataAux) {
                element.cliente1Id = dataAux.clienteId;
                element.cliente1Item = dataAux.nombre;
              }	
            });	
          
            this.ordensimplificadaService.getOrdensimplificadaById(element.ordensimplificada1Id).subscribe(dataAux => {
              if (dataAux) {
                this.ordensimplificada1Aux = dataAux;
                element.ordensimplificada1Id = this.ordensimplificada1Aux.ordensimplificadaId;
                element.ordensimplificada1Item = this.ordensimplificada1Aux.ordentrabajo+"";
              }	
            });	

            });
        }
      }, error => {
        swal('Error...', 'An error occurred while calling the etiquetaasignadas.', 'error');
    });
  }

  add(){
    this.etiquetaasignadaService.clear();
    this.router.navigate([ '../createetiquetaasignada' ], { relativeTo: this.route })
  }

  editar(etiquetaasignada){
    this.etiquetaasignadaService.setEtiquetaasignada(etiquetaasignada);
    this.etiquetaasignadaService.setEdit(true);
    this.etiquetaasignadaService.setDelete(false);
    this.router.navigate([ '../editetiquetaasignada' ], { relativeTo: this.route })
  }

  eliminar(etiquetaasignada){
    this.etiquetaasignadaService.setEtiquetaasignada(etiquetaasignada);
    this.etiquetaasignadaService.setEdit(false);
    this.etiquetaasignadaService.setDelete(true);
    this.router.navigate([ '../editetiquetaasignada' ], { relativeTo: this.route })
  }

  // Select row
  setClickedRowEtiquetaasignada(index, etiquetaasignada){
    this.etiquetaasignadaService.setEtiquetaasignada(etiquetaasignada);
    this.etiquetaasignadaService.setEdit(true);
    this.etiquetaasignadaService.setDelete(false);
    this.router.navigate([ '../editetiquetaasignada' ], { relativeTo: this.route })
  }
  
  habilita(){
    this.userAdmin.authorities.forEach(element => {
      if (element.authority == 'ROLE_ETIQUETAASIGNADADELETE'){
        this.deleteActive = true;
      }
      if (element.authority == 'ROLE_ETIQUETAASIGNADACREATE'){
        this.createActive = true;
      }
      if (element.authority == 'ROLE_ETIQUETAASIGNADAUPDATE'){
        this.updateActive = true;
      }
      if (element.authority == 'ROLE_ETIQUETAASIGNADASEARCH'){
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

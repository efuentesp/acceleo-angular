import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';

import { CuentadeahorroService }                                  from '../../cuentadeahorro/cuentadeahorro.component.service';
import { Cuentadeahorro }                                         from '../../cuentadeahorro/cuentadeahorro.component.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


@Component ({
    selector: 'app-view',
    templateUrl: './cuentadeahorro-manage.component.html',
	styleUrls: ['./cuentadeahorro-manage.component.css']
})

export class CuentadeahorroManageComponent implements OnInit {

    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

    public title = 'Manage Cuentadeahorro';
    public cuentadeahorroList: Cuentadeahorro [];
    public cuentadeahorro: Cuentadeahorro;

  	public busquedacuentadeahorro='';
    public filterInputcuentadeahorro = new FormControl();

 	public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));

    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;


    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private cuentadeahorroService: CuentadeahorroService
){



	}

    ngOnInit() {
      
	  // Get data user
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.valueName = this.user.username;
      this.token = this.user.token;

      this.cuentadeahorroService.setEdit(false);
      this.cuentadeahorroService.setDelete(false);

      this.loadCuentadeahorros();
      this.habilita();

    }   

    loadCuentadeahorros() {
      this.cuentadeahorroService.getAllCuentadeahorro().subscribe(data => {
        if (data) {

          this.cuentadeahorroList = data;

          this.cuentadeahorroList.forEach(element => {

            let datePipe     = new DatePipe('en-US');
            let fechacontratacionDate       = datePipe.transform(element.fechacontratacion,    'yyyy-MM-dd');
            let fechadisponibilidadaDate    = datePipe.transform(element.fechadisponibilidad,  'yyyy-MM-dd');
            let fechavencimientoDate        = datePipe.transform(element.fechavencimiento,     'yyyy-MM-dd');
           
            element.fechacontratacion      = fechacontratacionDate;
            element.fechacontratacionAux   = this.parse(fechacontratacionDate);
            element.fechadisponibilidad    = fechadisponibilidadaDate;
            element.fechadisponibilidadAux = this.parse(fechadisponibilidadaDate);
            element.fechavencimiento       = fechavencimientoDate;
            element.fechavencimientoAux    = this.parse(fechavencimientoDate);

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
        swal('Error...', 'An error occurred while calling the cuentadeahorros.', 'error');
      });
    }

  add(){
    this.cuentadeahorroService.clear();
    this.router.navigate([ '../createcuentadeahorro' ], { relativeTo: this.route })
  }

  editar(cuentadeahorro){
    this.cuentadeahorroService.setCuentadeahorro(cuentadeahorro);
    this.cuentadeahorroService.setEdit(true);
    this.cuentadeahorroService.setDelete(false);
    this.router.navigate([ '../editcuentadeahorro' ], { relativeTo: this.route })
  }

  eliminar(cuentadeahorro){
    this.cuentadeahorroService.setCuentadeahorro(cuentadeahorro);
    this.cuentadeahorroService.setEdit(false);
    this.cuentadeahorroService.setDelete(true);
    this.router.navigate([ '../editcuentadeahorro' ], { relativeTo: this.route })
  }

  // Select row
  setClickedRowCuentadeahorro(index, cuentadeahorro){

    var datePipe = new DatePipe('en-US');
    
    var fechacontratacionDate = datePipe.transform(cuentadeahorro.fechacontratacion, 'yyyy-MM-dd');
    var fechavencimientoDate  = datePipe.transform(cuentadeahorro.fechavencimiento, 'yyyy-MM-dd');
    var fechadisponibilidadDate = datePipe.transform(cuentadeahorro.fechadisponibilidad, 'yyyy-MM-dd');

    cuentadeahorro.fechacontratacion = fechacontratacionDate;
    cuentadeahorro.fechavencimiento = fechavencimientoDate;
    cuentadeahorro.fechadisponibilidad = fechadisponibilidadDate;

    this.cuentadeahorroService.setCuentadeahorro(cuentadeahorro);
    this.cuentadeahorroService.setEdit(true);
    this.cuentadeahorroService.setDelete(false);
    this.router.navigate([ '../editcuentadeahorro' ], { relativeTo: this.route })
  }
  
  habilita(){
    this.userAdmin.authorities.forEach(element => {
      if (element.authority == 'ROLE_CUENTADEAHORRODELETE'){
        this.deleteActive = true;
      }
      if (element.authority == 'ROLE_CUENTADEAHORROCREATE'){
        this.createActive = true;
      }
      if (element.authority == 'ROLE_CUENTADEAHORROUPDATE'){
        this.updateActive = true;
      }
      if (element.authority == 'ROLE_CUENTADEAHORROSEARCH'){
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

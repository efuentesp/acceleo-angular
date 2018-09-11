import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';

import { BeneficiarioService }                                  from '../../beneficiario/beneficiario.component.service';
import { Beneficiario }                                         from '../../beneficiario/beneficiario.component.model';

import { CuentadeahorroService }                                  from '../../cuentadeahorro/cuentadeahorro.component.service';
import { Cuentadeahorro }                                         from '../../cuentadeahorro/cuentadeahorro.component.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component ({
    selector: 'app-view',
    templateUrl: './beneficiario-manage.component.html',
	styleUrls: ['./beneficiario-manage.component.css']
})

export class BeneficiarioManageComponent implements OnInit {

    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

    public title = 'Manage Beneficiario';
    public beneficiarioList: Beneficiario [];
    public beneficiario: Beneficiario;

  	public busquedabeneficiario='';
    public filterInputbeneficiario = new FormControl();

 	public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));

    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;

	public cuentadeahorroList: Cuentadeahorro [];
    public cuentadeahorro: Cuentadeahorro;
	public cuentadeahorroAux: Cuentadeahorro;

	public busquedaCuentadeahorro='';
	filterInputCuentadeahorro = new FormControl();

    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private beneficiarioService: BeneficiarioService
	,private cuentadeahorroService: CuentadeahorroService
){


  	 this.filterInputCuentadeahorro.valueChanges.subscribe(busquedaCuentadeahorro => {
     this.busquedaCuentadeahorro = busquedaCuentadeahorro;
	   });

	}

    ngOnInit() {
      
	  // Get data user
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.valueName = this.user.username;
      this.token = this.user.token;

      this.beneficiarioService.setEdit(false);
      this.beneficiarioService.setDelete(false);

      this.loadBeneficiarios();
      this.habilita();

    }   

    loadBeneficiarios() {
      this.beneficiarioService.getAllBeneficiario().subscribe(data => {

		var datePipe = new DatePipe('en-US');

        if (data) {

          this.beneficiarioList = data;

			this.beneficiarioList.forEach(element => {

				Atributocuentadeahorro

			//let datePipe     = new DatePipe('en-US');
			//let fechaDate    = datePipe.transform(element.fecha, 'yyyy-MM-dd');
            //element.fecha    = fechaDate;
            //element.fechaAux = this.parse(fechaDate);



				this.cuentadeahorroService.getCuentadeahorroById(element.cuentadeahorroId).subscribe(dataAux => {
					if (dataAux) {
						this.cuentadeahorroAux = dataAux;
						element.cuentadeahorroItem = this.cuentadeahorroAux.











	      if (element.generoId == 'mas'){
	          element.generoItem = 'Masculino';
	      }
	      if (element.generoId == 'fem'){
	          element.generoItem = 'Femenino';
	      }


	      if (element.parentescoId == 'cy'){
	          element.parentescoItem = 'Conyuge';
	      }
	      if (element.parentescoId == 'hj1'){
	          element.parentescoItem = 'Hijo';
	      }
	      if (element.parentescoId == 'hj2'){
	          element.parentescoItem = 'Hija';
	      }
	      if (element.parentescoId == 'pa'){
	          element.parentescoItem = 'Padre';
	      }
	      if (element.parentescoId == 'ma'){
	          element.parentescoItem = 'Madre';
	      }
	      if (element.parentescoId == 'h1'){
	          element.parentescoItem = 'Hermano';
	      }
	      if (element.parentescoId == 'h2'){
	          element.parentescoItem = 'Hermana';
	      }











				}	
			});	
		});

        }
      }, error => {
        swal('Error...', 'An error occurred while calling the beneficiarios.', 'error');
      });
    }

  add(){
    this.beneficiarioService.clear();
    this.router.navigate([ '../createbeneficiario' ], { relativeTo: this.route })
  }

  editar(beneficiario){
    this.beneficiarioService.setBeneficiario(beneficiario);
    this.beneficiarioService.setEdit(true);
    this.beneficiarioService.setDelete(false);
    this.router.navigate([ '../editbeneficiario' ], { relativeTo: this.route })
  }

  eliminar(beneficiario){
    this.beneficiarioService.setBeneficiario(beneficiario);
    this.beneficiarioService.setEdit(false);
    this.beneficiarioService.setDelete(true);
    this.router.navigate([ '../editbeneficiario' ], { relativeTo: this.route })
  }

  // Select row
  setClickedRowBeneficiario(index, beneficiario){
    this.beneficiarioService.setBeneficiario(beneficiario);
    this.beneficiarioService.setEdit(true);
    this.beneficiarioService.setDelete(false);
    this.router.navigate([ '../editbeneficiario' ], { relativeTo: this.route })
  }
  
  habilita(){
    this.userAdmin.authorities.forEach(element => {
      if (element.authority == 'ROLE_BENEFICIARIODELETE'){
        this.deleteActive = true;
      }
      if (element.authority == 'ROLE_BENEFICIARIOCREATE'){
        this.createActive = true;
      }
      if (element.authority == 'ROLE_BENEFICIARIOUPDATE'){
        this.updateActive = true;
      }
      if (element.authority == 'ROLE_BENEFICIARIOSEARCH'){
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

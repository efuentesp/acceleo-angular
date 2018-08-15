import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';

import { AportacionService }                                  from '../../aportacion/aportacion.component.service';
import { Aportacion }                                         from '../../aportacion/aportacion.component.model';

import { CuentadeahorroService }                                  from '../../cuentadeahorro/cuentadeahorro.component.service';
import { Cuentadeahorro }                                         from '../../cuentadeahorro/cuentadeahorro.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './aportacion-manage.component.html',
	styleUrls: ['./aportacion-manage.component.css']
})

export class AportacionManageComponent implements OnInit {

    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

    public title = 'Manage Aportacion';
    public aportacionList: Aportacion [];
    public aportacion: Aportacion;

  	public busquedaaportacion='';
    public filterInputaportacion = new FormControl();

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
				private aportacionService: AportacionService
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

      this.aportacionService.setEdit(false);
      this.aportacionService.setDelete(false);

      this.loadAportacions();
      this.habilita();

    }   

    loadAportacions() {
      this.aportacionService.getAllAportacion().subscribe(data => {

        var datePipe = new DatePipe('en-US');

        if (data) {

          this.aportacionList = data;

			this.aportacionList.forEach(element => {

        

        var fechaDate = datePipe.transform(element.fecha, 'yyyy-MM-dd');
    
        element.fecha = fechaDate;


				this.cuentadeahorroService.getCuentadeahorroById(element.cuentadeahorroId).subscribe(dataAux => {
					if (dataAux) {
            this.cuentadeahorroAux = dataAux;
            
           
						element.cuentadeahorroItem = this.cuentadeahorroAux.numero+"";

            console.log ("Valores",element.cuentadeahorroItem);
            
			      if (element.tipoaportacionId == 'cf'){
			          element.tipoaportacionItem = 'Cuota fija quincenal';
			      }
			      if (element.tipoaportacionId == 'fa'){
			          element.tipoaportacionItem = 'Especial fondo de ahorro';
			      }
			      if (element.tipoaportacionId == 'ut'){
			          element.tipoaportacionItem = 'Especial utilidades';
			      }
			      if (element.tipoaportacionId == 'ag'){
			          element.tipoaportacionItem = 'Especial aguinaldo';
			      }
		

		

		

		

		

		

		
				}	
			});	
		});

        }
      }, error => {
        swal('Error...', 'An error occurred while calling the aportacions.', 'error');
      });
    }

  add(){
    this.aportacionService.clear();
    this.router.navigate([ '../createaportacion' ], { relativeTo: this.route })
  }

  editar(aportacion){
    this.aportacionService.setAportacion(aportacion);
    this.aportacionService.setEdit(true);
    this.aportacionService.setDelete(false);
    this.router.navigate([ '../editaportacion' ], { relativeTo: this.route })
  }

  eliminar(aportacion){
    this.aportacionService.setAportacion(aportacion);
    this.aportacionService.setEdit(false);
    this.aportacionService.setDelete(true);
    this.router.navigate([ '../editaportacion' ], { relativeTo: this.route })
  }

  // Select row
  setClickedRowAportacion(index, aportacion){

    this.aportacionService.setAportacion(aportacion);
    this.aportacionService.setEdit(true);
    this.aportacionService.setDelete(false);
    this.router.navigate([ '../editaportacion' ], { relativeTo: this.route })
  }
  
  habilita(){
    this.userAdmin.authorities.forEach(element => {
      if (element.authority == 'ROLE_APORTACIONDELETE'){
        this.deleteActive = true;
      }
      if (element.authority == 'ROLE_APORTACIONCREATE'){
        this.createActive = true;
      }
      if (element.authority == 'ROLE_APORTACIONUPDATE'){
        this.updateActive = true;
      }
      if (element.authority == 'ROLE_APORTACIONSEARCH'){
        this.searchActive = true;
      }
    });
  }

}

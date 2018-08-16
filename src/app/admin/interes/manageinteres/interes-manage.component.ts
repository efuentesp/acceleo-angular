import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';

import { InteresService }                                  from '../../interes/interes.component.service';
import { Interes }                                         from '../../interes/interes.component.model';

import { CuentadeahorroService }                                  from '../../cuentadeahorro/cuentadeahorro.component.service';
import { Cuentadeahorro }                                         from '../../cuentadeahorro/cuentadeahorro.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './interes-manage.component.html',
	styleUrls: ['./interes-manage.component.css']
})

export class InteresManageComponent implements OnInit {

    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

    public title = 'Manage Interes';
    public interesList: Interes [];
    public interes: Interes;

  	public busquedainteres='';
    public filterInputinteres = new FormControl();

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
				private interesService: InteresService
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

      this.interesService.setEdit(false);
      this.interesService.setDelete(false);

      this.loadInteress();
      this.habilita();

    }   

    loadInteress() {
      this.interesService.getAllInteres().subscribe(data => {
        if (data) {

          var datePipe = new DatePipe('en-US');
          this.interesList = data;

			this.interesList.forEach(element => {
        
        var fechaDate = datePipe.transform(element.fecha, 'yyyy-MM-dd');
    
        element.fecha = fechaDate;


				this.cuentadeahorroService.getCuentadeahorroById(element.cuentadeahorroId).subscribe(dataAux => {
					if (dataAux) {
            this.cuentadeahorroAux = dataAux;
            
            console.log ("Numero de Cuenta: ", this.cuentadeahorroAux.numero+"");
						element.cuentadeahorroItem = this.cuentadeahorroAux.numero+"";

				}	
			});	
		});

        }
      }, error => {
        swal('Error...', 'An error occurred while calling the interess.', 'error');
      });
    }

  add(){
    this.interesService.clear();
    this.router.navigate([ '../createinteres' ], { relativeTo: this.route })
  }

  editar(interes){
    this.interesService.setInteres(interes);
    this.interesService.setEdit(true);
    this.interesService.setDelete(false);
    this.router.navigate([ '../editinteres' ], { relativeTo: this.route })
  }

  eliminar(interes){
    this.interesService.setInteres(interes);
    this.interesService.setEdit(false);
    this.interesService.setDelete(true);
    this.router.navigate([ '../editinteres' ], { relativeTo: this.route })
  }

  // Select row
  setClickedRowInteres(index, interes){
    console.log('El valor seleccionado: ', interes.cuentadeahorroItem);
    this.interesService.setInteres(interes);
    this.interesService.setEdit(true);
    this.interesService.setDelete(false);
    this.router.navigate([ '../editinteres' ], { relativeTo: this.route })
  }
  
  habilita(){
    this.userAdmin.authorities.forEach(element => {
      if (element.authority == 'ROLE_INTERESDELETE'){
        this.deleteActive = true;
      }
      if (element.authority == 'ROLE_INTERESCREATE'){
        this.createActive = true;
      }
      if (element.authority == 'ROLE_INTERESUPDATE'){
        this.updateActive = true;
      }
      if (element.authority == 'ROLE_INTERESSEARCH'){
        this.searchActive = true;
      }
    });
  }

}

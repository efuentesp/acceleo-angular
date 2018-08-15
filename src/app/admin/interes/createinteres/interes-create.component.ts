import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';

import { InteresService }                                  from '../../interes/interes.component.service';
import { Interes }                                         from '../../interes/interes.component.model';

import { CuentadeahorroService }                                  from '../../cuentadeahorro/cuentadeahorro.component.service';
import { Cuentadeahorro }                                         from '../../cuentadeahorro/cuentadeahorro.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './interes-create.component.html',
	styleUrls: ['./interes-create.component.css']
})

export class InteresCreateComponent implements OnInit {

    public title = 'Nuevo Interes';
    public interes: Interes;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public paraList: Cuentadeahorro [];
    public para: Cuentadeahorro;
    public paraAux: Cuentadeahorro;

	public busquedaCuentadeahorro='';
	filterInputCuentadeahorro = new FormControl();


    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private interesService: InteresService
	,private paraService: CuentadeahorroService
){
  	 this.filterInputCuentadeahorro.valueChanges.subscribe(busquedaCuentadeahorro => {
     this.busquedaCuentadeahorro = busquedaCuentadeahorro;
   });
	}

    ngOnInit() {
		this.interesService.clear();
        this.interes = new Interes;

		this.loadParas();
       
    } 

save(){
   this.interesService.saveInteres(this.interes).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Interes save successfully.', 'success');
        this.router.navigate([ '../manageinteres' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Interes.', 'error');
     }else{
       swal('Error...', 'Interes save unsuccessfully.', 'error');
     }
   } );
}


	loadParas(){
  		this.paraService.getAllCuentadeahorro().subscribe(data => {
    	if (data) {
      	
		this.paraList = data;
// Cambios por cada modal
    	}
  		}, error => {
    	swal('Error...', 'An error occurred while calling the Cuentadeahorros.', 'error');
  	});
}

 setClickedRowPara(index,para){
	      
		  para.checked = !para.checked;
		  if (para.checked){
		  this.paraService.setCuentadeahorro(para);
		  this.interes.paraId = para.paraId;
		  //this.interes.paraItem = para.Item;

	    	}else{
            this.paraService.clear();
			this.interes.paraId = null;
		    this.interes.paraItem = "";
		}
 }

  return(interes){
      this.location.back();
  }
}

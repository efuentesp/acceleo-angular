import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';
import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { FilialService }                                  from '../../filial/filial.component.service';
import { Filial }                                         from '../../filial/filial.component.model';


@Component ({
    selector: 'app-view',
    templateUrl: './filial-create.component.html',
	styleUrls: ['./filial-create.component.css']
})

export class FilialCreateComponent implements OnInit {

    public title = 'Nuevo Filial';
    public filialform: any;
    public user: User;
    public valueName: string;
    public token: string;

public filialList: Filial [];
public filial: Filial;
    public filialAux: Filial;

public busquedaFilial='';
filterInputFilial = new FormControl();


constructor(private router: Router,  
			private route: ActivatedRoute, 
			private location: Location,
			private parserFormatter: NgbDateParserFormatter,
			private filialService: FilialService
){
  	 this.filterInputFilial.valueChanges.subscribe(busquedaFilial => {
     	this.busquedaFilial = busquedaFilial;
     });
     
}

    ngOnInit() {
		this.filialService.clear();
        this.filial = new Filial;

		//this.loadFilial();
    } 

save(){

	if (
		this.filial.nombre ==="" || this.filial.nombre ===null || 
		this.filial.ubicacion ==="" || this.filial.ubicacion ===null || 
		this.filial.ciudad ==="" || this.filial.ciudad ===null || 
		this.filial.estado ==="" || this.filial.estado ===null || 
		this.filial.telefono ==="" || this.filial.telefono ===null || 
		this.filial.sitio ==="" || this.filial.sitio ===null || 
		this.filial.contacto ==="" || this.filial.contacto ===null || 
		this.filial.filialId !== null 
	){
		return;
	}else{
	   this.filialService.saveFilial(this.filial).subscribe(res => {
	     if (res.status == 201 || res.status == 200){
	        swal('Success...', 'Filial save successfully.', 'success');
	        this.router.navigate([ '../managefilial' ], { relativeTo: this.route })
	     }else if (res.status == 403){
	        swal('Error...', 'Usuario no tiene permiso para guardar filial.', 'error');
	     }else{
	       swal('Error...', 'filial save unsuccessfully.', 'error');
	     }
	   } );
   }
}

loadfilial(){
  		this.filialService.getAllFilial().subscribe(data => {
    	if (data) {
			this.filialList = data;
    	}
  		}, error => {
    	swal('Error...', 'An error occurred while calling the Filials.', 'error');
  		});
}

setClickedRowFilial(index,filial){	      
		  filial.checked = !filial.checked;
		  if (filial.checked){
		  this.filialService.setFilial(filial);
		  this.filial.filialId = filial.filialId;
		  this.filial.filialItem = filial.nombre;
	    	}else{
            this.filialService.clear();
			this.filial.filialId = null;
		    this.filial.filialItem = "";
		}
 }
 
 

  return(filial){
      this.location.back();
  }
}

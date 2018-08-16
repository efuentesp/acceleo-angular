import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';

import { BeneficiarioService }                                  from '../../beneficiario/beneficiario.component.service';
import { Beneficiario }                                         from '../../beneficiario/beneficiario.component.model';

import { CuentadeahorroService }                                  from '../../cuentadeahorro/cuentadeahorro.component.service';
import { Cuentadeahorro }                                         from '../../cuentadeahorro/cuentadeahorro.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './beneficiario-edit.component.html',
	styleUrls: ['./beneficiario-edit.component.css']
})

export class BeneficiarioEditComponent implements OnInit {

	public title = 'Editar Beneficiario';
    public beneficiario: Beneficiario;
 	public beneficiarioList: Beneficiario;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

	public flag: boolean;
    public flagDelete: boolean;

	public cuentadeahorroList: Cuentadeahorro [];
    public cuentadeahorro: Cuentadeahorro;

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
        
        this.flag = this.beneficiarioService.getEdit();
        this.beneficiario = this.beneficiarioService.getBeneficiario();
        this.flagDelete = this.beneficiarioService.getDelete();
        
		this.loadCuentadeahorros();
		this.loadItemCuentadeahorro(this.beneficiario);

    }  

save(){
   this.beneficiarioService.saveBeneficiario(this.beneficiario).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Beneficiario save successfully.', 'success');
        this.router.navigate([ '../managebeneficiario' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Beneficiario.', 'error');
     }else{
       swal('Error...', 'Beneficiario save unsuccessfully.', 'error');
     }
   } );
}

delete(){
  swal({
    title: "Are you sure?",
    text: "You will not be able to recover this beneficiario!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!"
  }).then((isConfirm) => {
    if (isConfirm.value) {
      this.beneficiarioService.deleteBeneficiario(this.beneficiario).subscribe(res => {
        if (res.status == 201 || res.status == 200){
          swal('Success...', 'Beneficiario item has been deleted successfully.', 'success');
          this.router.navigate([ '../managebeneficiario' ], { relativeTo: this.route })
        }else if (res.status == 403){
          swal('Error...', 'Usuario no tiene permiso para guardar Beneficiario.', 'error');
        }else{
          swal('Error...', 'Beneficiario deleted unsuccessfully.', 'error');
        }
      },error =>{
        if (error.status == 500){
          swal('Warning...', 'Beneficiario no se puede eliminar debido a que esta asociado con otra entidad.', 'warning');
        }
      }
	);
    } else {
      //swal("Cancelled", "Beneficiario deleted unsuccessfully", "error");
    }
  });
}

	loadCuentadeahorros(){
  		this.cuentadeahorroService.getAllCuentadeahorro().subscribe(data => {
    	if (data) {
        
        this.cuentadeahorroList = data;
      
        this.cuentadeahorroList.forEach(element => {

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
    	swal('Error...', 'An error occurred while calling the Cuentadeahorros.', 'error');
  	});
}

 setClickedRowCuentadeahorro(index,cuentadeahorro){
	      
		  cuentadeahorro.checked = !cuentadeahorro.checked;

		  if (cuentadeahorro.checked){
		  this.cuentadeahorroService.setCuentadeahorro(cuentadeahorro);
		  this.beneficiario.cuentadeahorroId = cuentadeahorro.cuentadeahorroId;
		  this.beneficiario.cuentadeahorroItem = cuentadeahorro.numero;
	    	}else{
            this.cuentadeahorroService.clear();
			this.beneficiario.cuentadeahorroId = null;
		    this.beneficiario.cuentadeahorroItem = "";
		}
}

loadItemCuentadeahorro(beneficiario){
  this.cuentadeahorroService.getCuentadeahorroById(beneficiario.cuentadeahorroId).subscribe(data => {
    if (data) {
      this.cuentadeahorro = data;
      this.beneficiario.cuentadeahorroItem = this.cuentadeahorro.numero+"";
    }
    }, error => {
    swal('Error...', 'An error occurred while calling the cuentadeahorros.', 'error');
  });

}



return(beneficiario){
  this.location.back();
}
 
}

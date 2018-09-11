import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { EmpresaService }                                  from '../../empresa/empresa.component.service';
import { Empresa }                                         from '../../empresa/empresa.component.model';


@Component ({
    selector: 'app-view',
    templateUrl: './empresa-create.component.html',
	styleUrls: ['./empresa-create.component.css']
})

export class EmpresaCreateComponent implements OnInit {

    public title = 'Nuevo Empresa';
    public empresa: Empresa;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;
	public datePipe = new DatePipe('en-US');


    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private parserFormatter: NgbDateParserFormatter,
				private empresaService: EmpresaService
){
	}

    ngOnInit() {
		this.empresaService.clear();
        this.empresa = new Empresa;

       
    } 

save(){


   this.empresaService.saveEmpresa(this.empresa).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Empresa save successfully.', 'success');
        this.router.navigate([ '../manageempresa' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Empresa.', 'error');
     }else{
       swal('Error...', 'Empresa save unsuccessfully.', 'error');
     }
   } );
}


  return(empresa){
      this.location.back();
  }
}

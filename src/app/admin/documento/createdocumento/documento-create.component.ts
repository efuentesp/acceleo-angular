import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
import { User } from '../../user/user.component.model';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { DocumentoService }                                  from '../../documento/documento.component.service';
import { Documento }                                         from '../../documento/documento.component.model';


@Component ({
    selector: 'app-view',
    templateUrl: './documento-create.component.html',
	styleUrls: ['./documento-create.component.css']
})

export class DocumentoCreateComponent implements OnInit {

    public title = 'Nuevo Documento';
    public documento: Documento;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;
	public datePipe = new DatePipe('en-US');


    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private parserFormatter: NgbDateParserFormatter,
				private documentoService: DocumentoService
){
	}

    ngOnInit() {
		this.documentoService.clear();
        this.documento = new Documento;

       
    } 

save(){


   this.documentoService.saveDocumento(this.documento).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Documento save successfully.', 'success');
        this.router.navigate([ '../managedocumento' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Documento.', 'error');
     }else{
       swal('Error...', 'Documento save unsuccessfully.', 'error');
     }
   } );
}


  return(documento){
      this.location.back();
  }
}

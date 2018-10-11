import { Component, OnInit, ViewChild}                                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl }                 from '@angular/forms';
import swal from 'sweetalert2';

import { Location, DatePipe } from '@angular/common';
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
    public filial: Filial;
    public form: any;
    public user: User;
    public valueName: string;
    public token: string;
	public datePipe = new DatePipe('en-US');


    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private parserFormatter: NgbDateParserFormatter,
				private filialService: FilialService
){
	}

    ngOnInit() {
		this.filialService.clear();
        this.filial = new Filial;

       
    } 

save(){


   this.filialService.saveFilial(this.filial).subscribe(res => {
     if (res.status == 201 || res.status == 200){
        swal('Success...', 'Filial save successfully.', 'success');
        this.router.navigate([ '../managefilial' ], { relativeTo: this.route })
     }else if (res.status == 403){
        swal('Error...', 'Usuario no tiene permiso para guardar Filial.', 'error');
     }else{
       swal('Error...', 'Filial save unsuccessfully.', 'error');
     }
   } );
}


  return(filial){
      this.location.back();
  }
}

import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { ParentescoService }                                  from '../parentesco/parentesco.component.service';
import { Parentesco }                                         from '../parentesco/parentesco.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './parentesco_mgmnt.component.html'
})

export class ParentescoMngComponent implements OnInit {

    title = 'Nuevo Parentesco';
    parentescoList: Parentesco;
    parentesco: Parentesco;
    form: any;

  	public busquedaParentesco='';
	filterInputParentesco = new FormControl();

    constructor(private router: Router, private parentescoService: ParentescoService) {
	   	   this.filterInputParentesco.valueChanges.subscribe(busquedaParentesco => {
	         this.busquedaParentesco = busquedaParentesco;
	       });
	}

    ngOnInit() {

        this.loadParentescos();

    }

    loadParentescos() {
      this.parentescoService.getAllParentesco().subscribe(data => {
        if (data) {
          this.parentescoList = data;
        }
      }, error => {
        swal('Error...', 'An error occurred while calling the parentescos.', 'error');
      });
    }
    save(parentesco){
      this.parentescoService.saveParentesco(this.parentesco).subscribe(res => {
        if (res.status == 201){
          swal('Success...', 'Parentesco save successfully.', 'success');
        }else{
          swal('Error...', 'Parentesco save unsuccessfully.', 'error');
        }

      } );
    }
	

  add(){
    this.router.navigate(['/parentesco']);
  }

  setClickedRowparentesco(index, parentesco){
	this.parentescoService.setParentesco(parentesco);
    this.router.navigate(['/parentesco']);
  }

}


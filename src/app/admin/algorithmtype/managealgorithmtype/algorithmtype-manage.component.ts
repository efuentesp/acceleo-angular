import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { Location } from '@angular/common';
import { User } from '../../user/user.component.model';

import { AlgorithmtypeService }                                  from '../../algorithmtype/algorithmtype.component.service';
import { Algorithmtype }                                         from '../../algorithmtype/algorithmtype.component.model';


@Component ({
    selector: 'app-view',
    templateUrl: './algorithmtype-manage.component.html',
	styleUrls: ['./algorithmtype-manage.component.css']
})

export class AlgorithmtypeManageComponent implements OnInit {

    public form: any;
    public user: User;
    public valueName: string;
    public token: string;

    public title = 'Manage Algorithmtype';
    public algorithmtypeList: Algorithmtype;
    public algorithmtype: Algorithmtype;

  	public busquedaalgorithmtype='';
    public filterInputalgorithmtype = new FormControl();

 	public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));

    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;





    constructor(private router: Router,  
				private route: ActivatedRoute, 
				private location: Location,
				private algorithmtypeService: AlgorithmtypeService
){



	}

    ngOnInit() {
      
	  // Get data user
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.valueName = this.user.username;
      this.token = this.user.token;

      this.algorithmtypeService.setEdit(false);
      this.algorithmtypeService.setDelete(false);

      this.loadAlgorithmtypes();
      this.habilita();

    }   

    loadAlgorithmtypes() {
      this.algorithmtypeService.getAllAlgorithmtype().subscribe(data => {
        if (data) {
          this.algorithmtypeList = data;
        }
      }, error => {
        swal('Error...', 'An error occurred while calling the algorithmtypes.', 'error');
      });
    }

  add(){
    this.algorithmtypeService.clear();
    this.router.navigate([ '../createalgorithmtype' ], { relativeTo: this.route })
  }

  editar(algorithmtype){
    this.algorithmtypeService.setAlgorithmtype(algorithmtype);
    this.algorithmtypeService.setEdit(true);
    this.algorithmtypeService.setDelete(false);
    this.router.navigate([ '../editalgorithmtype' ], { relativeTo: this.route })
  }

  eliminar(algorithmtype){
    this.algorithmtypeService.setAlgorithmtype(algorithmtype);
    this.algorithmtypeService.setEdit(false);
    this.algorithmtypeService.setDelete(true);
    this.router.navigate([ '../editalgorithmtype' ], { relativeTo: this.route })
  }

  // Select row
  setClickedRowAlgorithmtype(index, algorithmtype){
    this.algorithmtypeService.setAlgorithmtype(algorithmtype);
    this.algorithmtypeService.setEdit(true);
    this.algorithmtypeService.setDelete(false);
    this.router.navigate([ '../editalgorithmtype' ], { relativeTo: this.route })
  }
  
  habilita(){
    this.userAdmin.authorities.forEach(element => {
      if (element.authority == 'ROLE_ALGORITHMTYPEDELETE'){
        this.deleteActive = true;
      }
      if (element.authority == 'ROLE_ALGORITHMTYPECREATE'){
        this.createActive = true;
      }
      if (element.authority == 'ROLE_ALGORITHMTYPEUPDATE'){
        this.updateActive = true;
      }
      if (element.authority == 'ROLE_ALGORITHMTYPESEARCH'){
        this.searchActive = true;
      }
    });
  }

}

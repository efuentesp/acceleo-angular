import { Component, OnInit, ViewChild}                     from '@angular/core';
import { ActivatedRoute, Router }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { AuthorityService }                                  from '../../authority/authority.component.service';
import { Authority }                                         from '../../authority/authority.component.model';
import { SearchAuthorityPipe }                               from "../../pipe/authority.filter.pipe";
import { User } from '../../user/user.component.model';

//import { SearchAuthorityPipe }                               from "../pipe/authority.filter.pipe";
@Component ({
    selector: 'app-view',
    templateUrl: './manage-authority.component.html'
})

export class AuthorityManageComponent implements OnInit {

    public title = 'Authority';
    public authorityList: Authority;
    public authority: Authority;
    public form: any;
    public flag: boolean = false;
    public busquedaAuthority='';
    public user: User;
    public valueName: string;
    public token: string;
    public filterInputAuthority = new FormControl();

    public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));
    
    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;

      constructor(
                  private authorityService: AuthorityService, 
                  private route: ActivatedRoute,
                  private router: Router) {

            this.filterInputAuthority.valueChanges.subscribe(busquedaAuthority => {
            this.busquedaAuthority = busquedaAuthority;
          });
    }

    ngOnInit() {

      // Get data user
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.valueName = this.user.username;
      this.token = this.user.token;

      // Manage buttons table
      this.authorityService.setEdit(false);
      this.authorityService.setDelete(false);

      // Load data
      this.loadAuthoritysCatalog();
      this.habilita();
    }

    loadAuthoritysCatalog() {
       this.authorityService.getAllAuthorityCatalog().subscribe(data => {
         if (data) {
           this.authorityList = data;
         }
       }, error => {
         swal('Error...', 'An error occurred while calling the authoritys.', 'error');
       });
    }
	
  add(){
    this.authorityService.setEdit(false);
    this.authorityService.setDelete(false);
    this.authorityService.clear();
    this.router.navigate([ '../createAuthority' ], { relativeTo: this.route })  
  }

  editar(){
    this.authorityService.setEdit(true);
    this.authorityService.setDelete(false);
  }

  eliminar(){
    this.authorityService.setEdit(false);
    this.authorityService.setDelete(true);
  }

  // Select row
  setClickedRowAuthority(index, authority){
     this.authorityService.setAuthority(authority);
     console.log("Radio:", authority);
     this.authorityService.setEdit(true);
    this.router.navigate([ '../editAuthority' ], { relativeTo: this.route })
  }

  habilita(){
    this.userAdmin.authorities.forEach(element => {
      if (element.authority == 'ROLE_AUTHORITYDELETE'){
        this.deleteActive = true;
      }
      if (element.authority == 'ROLE_AUTHORITYCREATE'){
        this.createActive = true;
      }
      if (element.authority == 'ROLE_AUTHORITYUPDATE'){
        this.updateActive = true;
      }
      if (element.authority == 'ROLE_AUTHORITYSEARCH'){
        this.searchActive = true;
      }
    });
  }

}


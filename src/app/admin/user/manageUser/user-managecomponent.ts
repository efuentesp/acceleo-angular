import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router, ActivatedRoute }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { UserService }                                  from '../../user/user.component.service';

import { User }                                         from '../../user/user.component.model';
import { SearchUserPipe }                               from "../../pipe/user.filter.pipe";

import { AuthorityService } from '../../authority/authority.component.service';
import { Authority } from '../../authority/authority.component.model';

@Component ({
    selector: 'app-view',
    templateUrl: './user-manage.component.html'
})

export class UserManageComponent implements OnInit {

    public title = 'Nuevo User';
    public userList: User;
    public user: User;
    public form: any;
    public flag: boolean = false;
    public flagDelete: boolean = false;
    public valueName: string;
    public token: string;
    public authorityList: Authority;
    public authority: Authority;
  	public busquedaUser='';
    public filterInputUser = new FormControl();
    
    public userAdmin: User = JSON.parse(localStorage.getItem('currentUser'));
    
    // Buttons 
    private searchActive: boolean = false;
    private updateActive: boolean = false;
    private createActive: boolean = false;
    private deleteActive: boolean = false;

    constructor(private router: Router, 
                private userService: UserService, 
                private route: ActivatedRoute,
                private authorityService: AuthorityService
                
               
              ) {
          
           this.filterInputUser.valueChanges.subscribe(busquedaUser => {

            console.log('Busqueda: ', busquedaUser);

	         this.busquedaUser = busquedaUser;
	       });
	  }

    ngOnInit() {

     
        this.userService.setEdit(false);
        this.userService.setDelete(false);

        this.loadAuthority();
        this.loadUsers();
        this.habilita();
        
    }

    loadUsers() {
      this.userService.getAllUser().subscribe(data => {
        if (data) {
          this.userList = data;
        }
      }, error => {
        swal('Error...', 'An error occurred while calling the users.', 'error');
      });
    }

  add(){
    this.userService.setEdit(false);
    this.userService.setDelete(false);
    this.userService.clear();
    this.router.navigate([ '../createUser' ], { relativeTo: this.route })
  }

  editar(){
    this.userService.setEdit(true);
    this.userService.setDelete(false);
  }

  eliminar(){
    this.userService.setEdit(false);
    this.userService.setDelete(true);
  }

  setClickedRowUser(index, user){

    let userName = user.userName;

    let userAux = new User();

    userAux.authorities = user.authorities;
    userAux.email = user.email;
    userAux.enabled = user.enabled;
    userAux.firstname = user.firstname;
    userAux.lastname = user.lastname;
    userAux.password = user.password;
    userAux.token = user.token;
    userAux.username = user.userName;
    userAux.idUser = user.idUser;

    this.userService.setUser(userAux);
    this.userService.setEdit(true);
    this.router.navigate([ '../editUser' ], { relativeTo: this.route })
  }

  habilita(){
    this.userAdmin.authorities.forEach(element => {
      if (element.authority == 'ROLE_USERDELETE'){
        this.deleteActive = true;
      }
      if (element.authority == 'ROLE_USERCREATE'){
        this.createActive = true;
      }
      if (element.authority == 'ROLE_USERUPDATE'){
        this.updateActive = true;
      }
      if (element.authority == 'ROLE_USERSEARCH'){
        this.searchActive = true;
      }
    });
  }

  loadAuthority(){
    this.authorityService.getAllAuthority().subscribe( data => {
      if (data) {
        this.authorityList = data;
      }}, error => {
        swal('Error...', 'An error occurred while calling the beneficiarios.', 'error');
      });
  }
}
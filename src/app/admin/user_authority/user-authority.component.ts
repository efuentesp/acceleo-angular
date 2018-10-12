import { Component, OnInit, ViewChild}                     from '@angular/core';
import { Router }                                          from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';

import { UserService }                                  from '../user/user.component.service';
import { User }                                         from '../user/user.component.model';

//import { SearchAfiliadoPipe }                               from "../pipe/afiliado.filter.pipe";
@Component ({
    selector: 'app-view',
    templateUrl: './user-authority.component.html'
})

export class UserAuthorityComponent implements OnInit {

    title = 'User Authority';
    userList: User;
    user: User;
    form: any;

  	public busquedaUser='';
	filterInputUser = new FormControl();

    constructor(private router: Router, private userService: UserService) {
	   	   this.filterInputUser.valueChanges.subscribe(busquedaUser => {
	         this.busquedaUser = busquedaUser;
	       });
	}

    ngOnInit() {

        this.loadUsers();

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
    this.router.navigate(['/user']);
  }

  setClickedRowuser(index, user){
	this.userService.setUser(user);
    this.router.navigate(['/user']);
  }

}

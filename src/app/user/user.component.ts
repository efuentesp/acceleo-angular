import {Component, OnInit} from '@angular/core';
import {User} from './user.component.model';
import {UserService} from '../user/user.component.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root'
})
export class UserComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) {
  }
  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      data => {
        //this.dataSource.data = data;
      }
    );
  }
}
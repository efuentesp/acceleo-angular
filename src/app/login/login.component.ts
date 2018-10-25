import { Component }        from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { User } from '../user/user.component.model';
import { AuthenticationService } from '../authentication.component.service';

@Component({
  templateUrl:'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {
  message: string;
  loading = false;
  private user = new User();
  error = '';
  version : string = '';

  constructor(public authenticationService: AuthenticationService, public router: Router) {
  
  }

  ngOnInit() {
    this.authenticationService.logout();
    this.version = "Versión 1.0.0.2";
  }

  login() {

    this.message = 'Trying to log in ...';
   
    this.authenticationService.login(this.user).subscribe(result => {

        if (result){

          this.router.navigate(['admin']); 
          this.loading = true;

        }else{
          this.error = 'Username or password is incorrect';
          this.loading = false;
      }
  }, error => {
      this.error = 'Username or password is incorrect';
      this.loading = false;
  });
      
}


}




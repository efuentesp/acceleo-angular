import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Router } from '@angular/router';

import { AppComponent }            from './app.component';
import { AppRoutingModule }        from './app-routing.module';

import { ComposeMessageComponent } from './compose-message.component';
import { PageNotFoundComponent }   from './not-found.component';

import { DialogService }               from './dialog.service';
import { HttpModule, Http }            from '@angular/http';  
import { NgxPaginationModule}          from 'ngx-pagination'; 
import { HttpClientModule}             from '@angular/common/http';
import { LoadingModule }               from 'ngx-loading';
import { LoginRoutingModule }          from './login/login-routing.module';
import { LoginComponent }              from './login/login.component';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';
import { AuthenticationService }       from './authentication.component.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    LoginRoutingModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppRoutingModule,
	NgxPaginationModule,
    HttpModule,
    HttpClientModule,
    LoadingModule
  ],
  declarations: [
    AppComponent,
    ComposeMessageComponent,
    LoginComponent,
    PageNotFoundComponent
  ],
  providers: [
    DialogService,
    SelectivePreloadingStrategy, 
    AuthenticationService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}

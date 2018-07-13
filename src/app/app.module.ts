import { NgModule }           from '@angular/core';
import { BrowserModule }      from '@angular/platform-browser';
import { FormsModule }        from '@angular/forms';
import { HttpModule, Http }   from '@angular/http';

/* App Root */
import { AppComponent }                         from './app.component';

/* Begin Components */
import { BaseComponent }              			from './base/base.component';


import { TipopensionMngComponent}    from './tipopension_mgmnt/tipopension_mgmnt.component';
import { TipopensionComponent}       from './tipopension/tipopension.component';
import { TipopensionService }        from './tipopension/tipopension.component.service';
import { SearchTipopensionPipe }     from './pipe/tipopension.filter.pipe';


import { SolicitudpensionMngComponent}    from './solicitudpension_mgmnt/solicitudpension_mgmnt.component';
import { SolicitudpensionComponent}       from './solicitudpension/solicitudpension.component';
import { SolicitudpensionService }        from './solicitudpension/solicitudpension.component.service';
import { SearchSolicitudpensionPipe }     from './pipe/solicitudpension.filter.pipe';


import { AfiliadoMngComponent}    from './afiliado_mgmnt/afiliado_mgmnt.component';
import { AfiliadoComponent}       from './afiliado/afiliado.component';
import { AfiliadoService }        from './afiliado/afiliado.component.service';
import { SearchAfiliadoPipe }     from './pipe/afiliado.filter.pipe';

import { GeneroService }        from './genero/genero.component.service';	

import { BeneficiarioMngComponent}    from './beneficiario_mgmnt/beneficiario_mgmnt.component';
import { BeneficiarioComponent}       from './beneficiario/beneficiario.component';
import { BeneficiarioService }        from './beneficiario/beneficiario.component.service';
import { SearchBeneficiarioPipe }     from './pipe/beneficiario.filter.pipe';

import { ParentescoService }        from './parentesco/parentesco.component.service';	


/* Routing Module */
import { AppRoutingModule }    from './app-routing.module';
import { NgxPaginationModule}  from 'ngx-pagination';

@NgModule({
    imports:      [ BrowserModule,
                    FormsModule,
                    AppRoutingModule,
					NgxPaginationModule,
                    HttpModule
                  ],
    providers:    [
				{ provide: TipopensionService,   useClass: TipopensionService },
				{ provide: SolicitudpensionService,   useClass: SolicitudpensionService },
				{ provide: AfiliadoService,   useClass: AfiliadoService },
				{ provide: GeneroService,   useClass: GeneroService },
				{ provide: BeneficiarioService,   useClass: BeneficiarioService },
				{ provide: ParentescoService,   useClass: ParentescoService },
        

                  ],
    declarations: [ 		
				TipopensionMngComponent,
				TipopensionComponent,
				SearchTipopensionPipe,
				SolicitudpensionMngComponent,
				SolicitudpensionComponent,
				SearchSolicitudpensionPipe,
				AfiliadoMngComponent,
				AfiliadoComponent,
				SearchAfiliadoPipe,
				BeneficiarioMngComponent,
				BeneficiarioComponent,
				SearchBeneficiarioPipe,
				BaseComponent,
				AppComponent
				  ],
    bootstrap:    [ AppComponent ]
})

export class AppModule {}


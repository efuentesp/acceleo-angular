import { NgModule }                     from '@angular/core';
import { Routes, RouterModule }         from '@angular/router';
import { BaseComponent}                 from './base/base.component';

import { TipopensionMngComponent}       from './tipopension_mgmnt/tipopension_mgmnt.component';
import { TipopensionComponent}       from './tipopension/tipopension.component';
import { SolicitudpensionMngComponent}       from './solicitudpension_mgmnt/solicitudpension_mgmnt.component';
import { SolicitudpensionComponent}       from './solicitudpension/solicitudpension.component';
import { AfiliadoMngComponent}       from './afiliado_mgmnt/afiliado_mgmnt.component';
import { AfiliadoComponent}       from './afiliado/afiliado.component';
import { BeneficiarioMngComponent}       from './beneficiario_mgmnt/beneficiario_mgmnt.component';
import { BeneficiarioComponent}       from './beneficiario/beneficiario.component';
		

export const appRoutes: Routes = [


	{ path: 'tipopension_mgmnt',  component: TipopensionMngComponent},  
	{ path: 'tipopension',  component: TipopensionComponent},  
	{ path: 'solicitudpension_mgmnt',  component: SolicitudpensionMngComponent},  
	{ path: 'solicitudpension',  component: SolicitudpensionComponent},  
	{ path: 'afiliado_mgmnt',  component: AfiliadoMngComponent},  
	{ path: 'afiliado',  component: AfiliadoComponent},  
	{ path: 'beneficiario_mgmnt',  component: BeneficiarioMngComponent},  
	{ path: 'beneficiario',  component: BeneficiarioComponent},  
    { path: '**', component: BaseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true} )],
  exports: [RouterModule],
})

export class AppRoutingModule {}


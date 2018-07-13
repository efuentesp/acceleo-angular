import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterBeneficiario',
    pure: false
})

@Injectable()
export class SearchBeneficiarioPipe implements PipeTransform {
      transform(items: any[], busquedaBeneficiario): any {
        return busquedaBeneficiario && items ? items.filter(item =>
	(item.apellido_materno.indexOf(busquedaBeneficiario) !== -1) 
||	(item.curp.indexOf(busquedaBeneficiario) !== -1) 
||	(item.fecha_nacimiento.indexOf(busquedaBeneficiario) !== -1) 
||	(item.parentescoId.indexOf(busquedaBeneficiario) !== -1)
||	(item.nombre.indexOf(busquedaBeneficiario) !== -1) 
||	(item.apellido_paterno.indexOf(busquedaBeneficiario) !== -1) 
        ): items;
    }
}

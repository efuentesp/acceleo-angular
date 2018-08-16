import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterBeneficiario',
    pure: false
})

@Injectable()
export class SearchBeneficiarioPipe implements PipeTransform {
      transform(items: any[], busquedaBeneficiario): any {
        return busquedaBeneficiario && items ? items.filter(item =>
			((item.paraItem+"").toString().indexOf(busquedaBeneficiario) !== -1)
||			((item.nombre+"").toLowerCase().indexOf((busquedaBeneficiario+"").toLowerCase()) !== -1) 
||			((item.apellidopaterno+"").toLowerCase().indexOf((busquedaBeneficiario+"").toLowerCase()) !== -1) 
||			((item.apellidomaterno+"").toLowerCase().indexOf((busquedaBeneficiario+"").toLowerCase()) !== -1) 
||			((item.fechanacimiento+"").toLowerCase().indexOf((busquedaBeneficiario+"").toLowerCase()) !== -1) 
||			((item.esId+"").toString().indexOf(busquedaBeneficiario) !== -1)
||			((item.deId+"").toString().indexOf(busquedaBeneficiario) !== -1)
        ): items;
    }
}

import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterEmpresa',
    pure: false
})

@Injectable()
export class SearchEmpresaPipe implements PipeTransform {
      transform(items: any[], busquedaEmpresa): any {
        return busquedaEmpresa && items ? items.filter(item =>
			((item.clave+"").toLowerCase().indexOf((busquedaEmpresa+"").toLowerCase()) !== -1) 
||			((item.razonsocial+"").toLowerCase().indexOf((busquedaEmpresa+"").toLowerCase()) !== -1) 
||			((item.nombrecorto+"").toLowerCase().indexOf((busquedaEmpresa+"").toLowerCase()) !== -1) 
        ): items;
    }
}

import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterRol',
    pure: false
})

@Injectable()
export class SearchRolPipe implements PipeTransform {
      transform(items: any[], busquedaRol): any {
        return busquedaRol && items ? items.filter(item =>
			((item.clave+"").toLowerCase().indexOf((busquedaRol+"").toLowerCase()) !== -1) 
||			((item.nombre+"").toLowerCase().indexOf((busquedaRol+"").toLowerCase()) !== -1) 
||			((item.activo+"").toLowerCase().indexOf((busquedaRol+"").toLowerCase()) !== -1) 
        ): items;
    }
}

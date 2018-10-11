import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterPermiso',
    pure: false
})

@Injectable()
export class SearchPermisoPipe implements PipeTransform {
      transform(items: any[], busquedaPermiso): any {
        return busquedaPermiso && items ? items.filter(item =>
			((item.rolItem+"").toString().indexOf(busquedaPermiso) !== -1)
||			((item.funcion+"").toLowerCase().indexOf((busquedaPermiso+"").toLowerCase()) !== -1) 
||			((item.ruta+"").toLowerCase().indexOf((busquedaPermiso+"").toLowerCase()) !== -1) 
||			((item.nivelpermiso+"").toLowerCase().indexOf((busquedaPermiso+"").toLowerCase()) !== -1) 
        ): items;
    }
}

import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterOperadorproduccion',
    pure: false
})

@Injectable()
export class SearchOperadorproduccionPipe implements PipeTransform {
      transform(items: any[], busquedaOperadorproduccion): any {
        return busquedaOperadorproduccion && items ? items.filter(item =>
			((item.numeroempleado+"").toLowerCase().indexOf((busquedaOperadorproduccion+"").toLowerCase()) !== -1) 
||			((item.nombre+"").toLowerCase().indexOf((busquedaOperadorproduccion+"").toLowerCase()) !== -1) 
        ): items;
    }
}

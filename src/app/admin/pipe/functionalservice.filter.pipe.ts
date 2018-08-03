import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterFunctionalservice',
    pure: false
})

@Injectable()
export class SearchFunctionalservicePipe implements PipeTransform {
      transform(items: any[], busquedaFunctionalservice): any {
        return busquedaFunctionalservice && items ? items.filter(item =>
			((item.menuItem+"").toString().indexOf(busquedaFunctionalservice) !== -1)
||			((item.code+"").toLowerCase().indexOf((busquedaFunctionalservice+"").toLowerCase()) !== -1) 
||			((item.name+"").toLowerCase().indexOf((busquedaFunctionalservice+"").toLowerCase()) !== -1) 
||			((item.complexityId+"").toString().indexOf(busquedaFunctionalservice) !== -1)
        ): items;
    }
}

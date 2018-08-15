import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterPlanta',
    pure: false
})

@Injectable()
export class SearchPlantaPipe implements PipeTransform {
      transform(items: any[], busquedaPlanta): any {
        return busquedaPlanta && items ? items.filter(item =>
			((item.empresaItem+"").toString().indexOf(busquedaPlanta) !== -1)
||			((item.nombreplanta+"").toLowerCase().indexOf((busquedaPlanta+"").toLowerCase()) !== -1) 
        ): items;
    }
}

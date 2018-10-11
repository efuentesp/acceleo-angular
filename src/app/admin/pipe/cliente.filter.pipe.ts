import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterCliente',
    pure: false
})

@Injectable()
export class SearchClientePipe implements PipeTransform {
      transform(items: any[], busquedaCliente): any {
        return busquedaCliente && items ? items.filter(item =>
			((item.clave+"").toLowerCase().indexOf((busquedaCliente+"").toLowerCase()) !== -1) 
||			((item.nombre+"").toLowerCase().indexOf((busquedaCliente+"").toLowerCase()) !== -1) 
||			((item.sociedadItem+"").toString().indexOf(busquedaCliente) !== -1)
        ): items;
    }
}

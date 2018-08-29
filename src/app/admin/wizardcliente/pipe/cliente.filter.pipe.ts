import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false
})

@Injectable()
export class SearchClientePipe implements PipeTransform {
      transform(items: any[], busquedaCliente): any {
        return busquedaCliente && items ? items.filter(item =>
          (item.nombre.indexOf(busquedaCliente) !== -1) ||
          (item.apellido_paterno.indexOf(busquedaCliente) !== -1)  ||
          (item.apellido_materno.indexOf(busquedaCliente) !== -1)
        ): items;
    }
}

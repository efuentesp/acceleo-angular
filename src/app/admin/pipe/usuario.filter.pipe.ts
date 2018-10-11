import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterUsuario',
    pure: false
})

@Injectable()
export class SearchUsuarioPipe implements PipeTransform {
      transform(items: any[], busquedaUsuario): any {
        return busquedaUsuario && items ? items.filter(item =>
			((item.nombreclave+"").toLowerCase().indexOf((busquedaUsuario+"").toLowerCase()) !== -1) 
||			((item.activo+"").toLowerCase().indexOf((busquedaUsuario+"").toLowerCase()) !== -1) 
||			((item.rolItem+"").toString().indexOf(busquedaUsuario) !== -1)
        ): items;
    }
}

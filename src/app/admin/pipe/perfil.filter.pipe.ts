import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterPerfil',
    pure: false
})

@Injectable()
export class SearchPerfilPipe implements PipeTransform {
      transform(items: any[], busquedaPerfil): any {
        return busquedaPerfil && items ? items.filter(item =>
			((item.deItem+"").toString().indexOf(busquedaPerfil) !== -1)
||			((item.usuario+"").toLowerCase().indexOf((busquedaPerfil+"").toLowerCase()) !== -1) 
        ): items;
    }
}

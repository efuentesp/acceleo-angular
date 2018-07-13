import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterTipopension',
    pure: false
})

@Injectable()
export class SearchTipopensionPipe implements PipeTransform {
      transform(items: any[], busquedaTipopension): any {
        return busquedaTipopension && items ? items.filter(item =>
	(item.nombre.indexOf(busquedaTipopension) !== -1) 
||	((item.tipopensionId+"").indexOf(busquedaTipopension) !== -1) 
||	(item.clave.indexOf(busquedaTipopension) !== -1) 
        ): items;
    }
}

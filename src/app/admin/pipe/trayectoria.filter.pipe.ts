import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterTrayectoria',
    pure: false
})

@Injectable()
export class SearchTrayectoriaPipe implements PipeTransform {
      transform(items: any[], busquedaTrayectoria): any {
        return busquedaTrayectoria && items ? items.filter(item =>
        
			((item.tipotrayectoriaItem+"").toString().indexOf((busquedaTrayectoria+"").toLowerCase()) !== -1)
			||
			((item.clave+"").toLowerCase().indexOf((busquedaTrayectoria+"").toLowerCase()) !== -1)
        ): items;
    }
}

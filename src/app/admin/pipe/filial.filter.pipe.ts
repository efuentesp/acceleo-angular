import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterFilial',
    pure: false
})

@Injectable()
export class SearchFilialPipe implements PipeTransform {
      transform(items: any[], busquedaFilial): any {
        return busquedaFilial && items ? items.filter(item =>
        
			((item.nombre+"").toLowerCase().indexOf((busquedaFilial+"").toLowerCase()) !== -1)
			||
			((item.ciudad+"").toLowerCase().indexOf((busquedaFilial+"").toLowerCase()) !== -1)
			||
			((item.estado+"").toLowerCase().indexOf((busquedaFilial+"").toLowerCase()) !== -1)
        ): items;
    }
}

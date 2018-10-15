import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterDireccion',
    pure: false
})

@Injectable()
export class SearchDireccionPipe implements PipeTransform {
      transform(items: any[], busquedaDireccion): any {
        return busquedaDireccion && items ? items.filter(item =>
        
			((item.cp+"").toLowerCase().indexOf((busquedaDireccion+"").toLowerCase()) !== -1)
			||
			((item.ciudad+"").toLowerCase().indexOf((busquedaDireccion+"").toLowerCase()) !== -1)
			||
			((item.estado+"").toLowerCase().indexOf((busquedaDireccion+"").toLowerCase()) !== -1)
        ): items;
    }
}

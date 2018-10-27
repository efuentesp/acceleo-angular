import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterPuesto',
    pure: false
})

@Injectable()
export class SearchPuestoPipe implements PipeTransform {
      transform(items: any[], busquedaPuesto): any {
        return busquedaPuesto && items ? items.filter(item =>
        
			((item.puestosItem+"").toString().toLowerCase().indexOf((busquedaPuesto+"").toLowerCase()) !== -1)
			||
			((item.descripcion+"").toLowerCase().indexOf((busquedaPuesto+"").toLowerCase()) !== -1)
        ): items;
    }
}

import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterCuentabancaria',
    pure: false
})

@Injectable()
export class SearchCuentabancariaPipe implements PipeTransform {
      transform(items: any[], busquedaCuentabancaria): any {
        return busquedaCuentabancaria && items ? items.filter(item =>
			((item.deItem+"").toString().indexOf(busquedaCuentabancaria) !== -1)
||			((item.cuenta+"").toLowerCase().indexOf((busquedaCuentabancaria+"").toLowerCase()) !== -1) 
||			((item.emitidaporId+"").toString().indexOf(busquedaCuentabancaria) !== -1)
        ): items;
    }
}

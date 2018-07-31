import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterApplication',
    pure: false
})

@Injectable()
export class SearchApplicationPipe implements PipeTransform {
      transform(items: any[], busquedaApplication): any {
        return busquedaApplication && items ? items.filter(item =>
			((item.code+"").toLowerCase().indexOf((busquedaApplication+"").toLowerCase()) !== -1) 
||			((item.name+"").toLowerCase().indexOf((busquedaApplication+"").toLowerCase()) !== -1) 
        ): items;
    }
}

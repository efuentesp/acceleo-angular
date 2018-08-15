import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterInteres',
    pure: false
})

@Injectable()
export class SearchInteresPipe implements PipeTransform {
      transform(items: any[], busquedaInteres): any {
        return busquedaInteres && items ? items.filter(item =>
			((item.paraItem+"").toString().indexOf(busquedaInteres) !== -1)
||			((item.fecha+"").toLowerCase().indexOf((busquedaInteres+"").toLowerCase()) !== -1) 
        ): items;
    }
}

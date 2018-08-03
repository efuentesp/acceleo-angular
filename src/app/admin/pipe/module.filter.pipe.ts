import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterModule',
    pure: false
})

@Injectable()
export class SearchModulePipe implements PipeTransform {
      transform(items: any[], busquedaModule): any {
        return busquedaModule && items ? items.filter(item =>
			((item.applicationItem+"").toString().indexOf(busquedaModule) !== -1)
||			((item.code+"").toLowerCase().indexOf((busquedaModule+"").toLowerCase()) !== -1) 
||			((item.name+"").toLowerCase().indexOf((busquedaModule+"").toLowerCase()) !== -1) 
        ): items;
    }
}

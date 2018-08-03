import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterMenu',
    pure: false
})

@Injectable()
export class SearchMenuPipe implements PipeTransform {
      transform(items: any[], busquedaMenu): any {
        return busquedaMenu && items ? items.filter(item =>
			((item.moduleItem+"").toString().indexOf(busquedaMenu) !== -1)
||			((item.code+"").toLowerCase().indexOf((busquedaMenu+"").toLowerCase()) !== -1) 
||			((item.path+"").toLowerCase().indexOf((busquedaMenu+"").toLowerCase()) !== -1) 
        ): items;
    }
}

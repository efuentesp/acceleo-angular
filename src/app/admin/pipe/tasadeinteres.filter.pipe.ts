import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterTasadeinteres',
    pure: false
})

@Injectable()
export class SearchTasadeinteresPipe implements PipeTransform {
      transform(items: any[], busquedaTasadeinteres): any {
        return busquedaTasadeinteres && items ? items.filter(item =>
			((item.empresaItem+"").toString().indexOf(busquedaTasadeinteres) !== -1)
        ): items;
    }
}

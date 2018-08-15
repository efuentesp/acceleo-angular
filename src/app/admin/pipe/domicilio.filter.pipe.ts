import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterDomicilio',
    pure: false
})

@Injectable()
export class SearchDomicilioPipe implements PipeTransform {
      transform(items: any[], busquedaDomicilio): any {
        return busquedaDomicilio && items ? items.filter(item =>
			((item.deItem+"").toString().indexOf(busquedaDomicilio) !== -1)
||			((item.cp+"").toLowerCase().indexOf((busquedaDomicilio+"").toLowerCase()) !== -1) 
||			((item.ciudad+"").toLowerCase().indexOf((busquedaDomicilio+"").toLowerCase()) !== -1) 
||			((item.estado+"").toLowerCase().indexOf((busquedaDomicilio+"").toLowerCase()) !== -1) 
        ): items;
    }
}

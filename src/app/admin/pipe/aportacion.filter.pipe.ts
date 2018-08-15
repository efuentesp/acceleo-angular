import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterAportacion',
    pure: false
})

@Injectable()
export class SearchAportacionPipe implements PipeTransform {
      transform(items: any[], busquedaAportacion): any {
        return busquedaAportacion && items ? items.filter(item =>
			((item.cuentadeahorroItem+"").toString().indexOf(busquedaAportacion) !== -1)
||			((item.fecha+"").toLowerCase().indexOf((busquedaAportacion+"").toLowerCase()) !== -1) 
||			((item.tipoaportacionId+"").toString().indexOf(busquedaAportacion) !== -1)
        ): items;
    }
}

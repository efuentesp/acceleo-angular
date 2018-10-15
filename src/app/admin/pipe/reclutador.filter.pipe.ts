import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterReclutador',
    pure: false
})

@Injectable()
export class SearchReclutadorPipe implements PipeTransform {
      transform(items: any[], busquedaReclutador): any {
        return busquedaReclutador && items ? items.filter(item =>
        
			((item.nombre+"").toLowerCase().indexOf((busquedaReclutador+"").toLowerCase()) !== -1)
			||
			((item.apellidopaterno+"").toLowerCase().indexOf((busquedaReclutador+"").toLowerCase()) !== -1)
			||
			((item.apellidomaterno+"").toLowerCase().indexOf((busquedaReclutador+"").toLowerCase()) !== -1)
			||
			((item.generoItem+"").toString().indexOf((busquedaReclutador+"").toLowerCase()) !== -1)
        ): items;
    }
}

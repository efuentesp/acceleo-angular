import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterEvento',
    pure: false
})

@Injectable()
export class SearchEventoPipe implements PipeTransform {
      transform(items: any[], busquedaEvento): any {
        return busquedaEvento && items ? items.filter(item =>
        
			((item.tipoeventoItem+"").toString().indexOf((busquedaEvento+"").toLowerCase()) !== -1)
			||
			((item.nombre+"").toLowerCase().indexOf((busquedaEvento+"").toLowerCase()) !== -1)
			||
			((item.posicionItem+"").toString().indexOf((busquedaEvento+"").toLowerCase()) !== -1)
			||
			((item.candidatoItem+"").toString().indexOf((busquedaEvento+"").toLowerCase()) !== -1)
			||
			((item.fecha+"").toLowerCase().indexOf((busquedaEvento+"").toLowerCase()) !== -1)
			||
			((item.responsable+"").toLowerCase().indexOf((busquedaEvento+"").toLowerCase()) !== -1)
			||
			((item.estatuseventoItem+"").toString().indexOf((busquedaEvento+"").toLowerCase()) !== -1)
        ): items;
    }
}

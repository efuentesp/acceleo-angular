import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterOrdensimplificada',
    pure: false
})

@Injectable()
export class SearchOrdensimplificadaPipe implements PipeTransform {
      transform(items: any[], busquedaOrdensimplificada): any {
        return busquedaOrdensimplificada && items ? items.filter(item =>
			((item.ordentrabajo+"").toLowerCase().indexOf((busquedaOrdensimplificada+"").toLowerCase()) !== -1) 
||			((item.sap+"").toLowerCase().indexOf((busquedaOrdensimplificada+"").toLowerCase()) !== -1) 
||			((item.linea1Item+"").toString().indexOf(busquedaOrdensimplificada) !== -1)
||			((item.destinomercancia1Item+"").toString().indexOf(busquedaOrdensimplificada) !== -1)
||			((item.estado1Item+"").toString().indexOf(busquedaOrdensimplificada) !== -1)
||			((item.estado2Item+"").toString().indexOf(busquedaOrdensimplificada) !== -1)
||			((item.operadorproduccion1Item+"").toString().indexOf(busquedaOrdensimplificada) !== -1)
||			((item.operadorproduccion2Item+"").toString().indexOf(busquedaOrdensimplificada) !== -1)
        ): items;
    }
}

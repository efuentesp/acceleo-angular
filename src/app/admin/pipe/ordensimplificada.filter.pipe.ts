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
||			((item.lineaId+"").toString().indexOf(busquedaOrdensimplificada) !== -1)
||			((item.destinomercanciaId+"").toString().indexOf(busquedaOrdensimplificada) !== -1)
||			((item.estadoId+"").toString().indexOf(busquedaOrdensimplificada) !== -1)
||			((item.estado2Id+"").toString().indexOf(busquedaOrdensimplificada) !== -1)
||			((item.supervisorItem+"").toString().indexOf(busquedaOrdensimplificada) !== -1)
||			((item.operadorItem+"").toString().indexOf(busquedaOrdensimplificada) !== -1)
        ): items;
    }
}

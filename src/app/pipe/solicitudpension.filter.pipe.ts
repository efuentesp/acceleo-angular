import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterSolicitudpension',
    pure: false
})

@Injectable()
export class SearchSolicitudpensionPipe implements PipeTransform {
      transform(items: any[], busquedaSolicitudpension): any {
        return busquedaSolicitudpension && items ? items.filter(item =>
	(item.numero.indexOf(busquedaSolicitudpension) !== -1) 
||	((item.afiliadoId+"").toString().indexOf(busquedaSolicitudpension) !== -1)
||	((item.tipopensionId+"").toString().indexOf(busquedaSolicitudpension) !== -1)
||	(item.observaciones.indexOf(busquedaSolicitudpension) !== -1) 
||	((item.solicitudpensionId+"").indexOf(busquedaSolicitudpension) !== -1) 
||	(item.fecha_solicitud.indexOf(busquedaSolicitudpension) !== -1) 
        ): items;
    }
}

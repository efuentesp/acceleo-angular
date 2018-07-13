import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterAfiliado',
    pure: false
})

@Injectable()
export class SearchAfiliadoPipe implements PipeTransform {
      transform(items: any[], busquedaAfiliado): any {
        return busquedaAfiliado && items ? items.filter(item =>
	((item.beneficiarioId+"").toString().indexOf(busquedaAfiliado) !== -1)
||	(item.fecha_afiliacion.indexOf(busquedaAfiliado) !== -1) 
||	(item.foto.indexOf(busquedaAfiliado) !== -1) 
||	(item.correo.indexOf(busquedaAfiliado) !== -1) 
||	(item.apellido_materno.indexOf(busquedaAfiliado) !== -1) 
||	(item.acta_nacimiento.indexOf(busquedaAfiliado) !== -1) 
||	(item.monto_pension.indexOf(busquedaAfiliado) !== -1) 
||	(item.apellido_paterno.indexOf(busquedaAfiliado) !== -1) 
||	(item.observaciones.indexOf(busquedaAfiliado) !== -1) 
||	(item.nombre.indexOf(busquedaAfiliado) !== -1) 
||	(item.generoId.indexOf(busquedaAfiliado) !== -1)
||	(item.semanas_cotizadas.indexOf(busquedaAfiliado) !== -1) 
||	(item.nss.indexOf(busquedaAfiliado) !== -1) 
        ): items;
    }
}

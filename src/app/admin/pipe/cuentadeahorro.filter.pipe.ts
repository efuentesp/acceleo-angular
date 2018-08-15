import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterCuentadeahorro',
    pure: false
})

@Injectable()
export class SearchCuentadeahorroPipe implements PipeTransform {
      transform(items: any[], busquedaCuentadeahorro): any {
        return busquedaCuentadeahorro && items ? items.filter(item =>
			((item.numero+"").toLowerCase().indexOf((busquedaCuentadeahorro+"").toLowerCase()) !== -1) 
||			((item.tipoahorroId+"").toString().indexOf(busquedaCuentadeahorro) !== -1)
||			((item.fechacontratacion+"").toLowerCase().indexOf((busquedaCuentadeahorro+"").toLowerCase()) !== -1) 
||			((item.fechavencimiento+"").toLowerCase().indexOf((busquedaCuentadeahorro+"").toLowerCase()) !== -1) 
||			((item.fechadisponibilidad+"").toLowerCase().indexOf((busquedaCuentadeahorro+"").toLowerCase()) !== -1) 
        ): items;
    }
}

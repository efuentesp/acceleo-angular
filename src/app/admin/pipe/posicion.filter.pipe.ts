import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filterPosicion',
    pure: false
})

@Injectable()
export class SearchPosicionPipe implements PipeTransform {
      transform(items: any[], busquedaPosicion): any {
        return busquedaPosicion && items ? items.filter(item =>
        
			((item.filialItem+"").toString().indexOf((busquedaPosicion+"").toLowerCase()) !== -1)
			||
			((item.puestoItem+"").toString().indexOf((busquedaPosicion+"").toLowerCase()) !== -1)
			||
			((item.nombre+"").toLowerCase().indexOf((busquedaPosicion+"").toLowerCase()) !== -1)
			||
			((item.contacto+"").toLowerCase().indexOf((busquedaPosicion+"").toLowerCase()) !== -1)
			||
			((item.tiponominaItem+"").toString().indexOf((busquedaPosicion+"").toLowerCase()) !== -1)
			||
			((item.estatusposicionItem+"").toString().indexOf((busquedaPosicion+"").toLowerCase()) !== -1)
        ): items;
    }
}

const moment = require('moment');
moment().format(); 

const Tarea = require('./tarea');

class Tareas {
    _listado = {};

    //Transformar objeto a arreglo
    get listArr() {
        const listado = [];
        Object.keys(this._listado).forEach( key => { //Recorrer tareas por su key
            const tarea = this._listado[key]; //Obtener tarea
            listado.push(tarea);
        });


        return listado;
    }

    constructor() {
        this._listado = {};
    };

    loadTareasFromArr( tareas = [] ){
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });
    };

    crearTarea( desc = '' ) {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    };

    listadoCompleto() {
        console.log();
        this.listArr.forEach( (tarea, i) => {

            const idx = `${i + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn ) 
                                ? 'Completada'.green
                                : 'Pendiente'.red;

            console.log(`${ idx } ${ desc } :: ${ estado }`);

        });    
    };

    listarPendientesCompletadas( completadas = true ) {
        console.log();
        let contador = 0;
        
        this.listArr.forEach( (tarea) => {
            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn ) 
                                ? 'Completada'.green
                                : 'Pendiente'.red;
            if( completadas && completadoEn) {
                contador += 1;
                console.log(`${ (contador + '.').green } ${ desc } :: ${ completadoEn.green }`);
            }
            else if(!completadas && !completadoEn){
                contador += 1;
                console.log(`${ (contador + '.').green } ${ desc } :: ${ estado }`);
            }
        });
    }

    borrarTarea( id = ''){

        if ( this._listado[id] ){
            delete this._listado[id];
        }

    }

    toggleCompletadas( ids = [] ){
        ids.forEach( id => {
            const tarea = this._listado[id];
            if ( !tarea.completadoEn ) {
                tarea.completadoEn = moment().format('MMMM Do YYYY');
            }
        })

        this.listArr.forEach( tarea => {
            if( !ids.includes( tarea.id ) ) {
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }

    

}

module.exports = Tareas;
require('colors');

//const { showMenu, pause } = require('./helpers/mensajes');
const { 
    inquirerMenu, 
    pause, 
    readInput,
    listTaskDelete,
    confirm,
    showListChecklist
} = require('./helpers/inquirer');
const { saveDB, readDB } = require('./helpers/saveFile');
const Tareas = require('./models/tareas');


const main = async() => {
    
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = readDB();
   

    if( tareasDB ) {
        // Cargar las tareas
        tareas.loadTareasFromArr( tareasDB );
    }

    do {
        //Mostrar menú
        opt = await inquirerMenu();

        //Opciones del menú
        switch(opt){
            case '1':
                const desc = await readInput('Descripcion: ');
                tareas.crearTarea( desc );
            break;
            case '2':
                tareas.listadoCompleto();
            break;
            case '3': //Tareas pendientes completadas
                tareas.listarPendientesCompletadas(true);
            break;
            case '4': //Tareas pendientes sin completar
                tareas.listarPendientesCompletadas(false);
            break;
            case '5':
                const ids = await showListChecklist( tareas.listArr );
                tareas.toggleCompletadas( ids );
            break;
            case '6':
                const id = await listTaskDelete( tareas.listArr );
                if ( id !== '0' ){
                    const ok = await confirm('¿Está seguro?');
                    if ( ok ) {
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada');
                    }
                }
            break;
        }

        saveDB(tareas.listArr);

        await pause();

    } while( opt !=='0' );

}


main();
require('colors');

//const { showMenu, pause } = require('./helpers/mensajes');
const { 
    inquirerMenu, 
    pause, 
    readInput 
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
            case '3':
                tareas.listarPendientesCompletadas();
            break;
            case '4':
                tareas.listarPendientesCompletadas(false);
            break;
        }

        saveDB(tareas.listArr);

        await pause();

    } while( opt !=='0' );

}


main();
import {guardar,listar} from '../dao/memoria.js'
import os from 'os';

const cpuCount = os.cpus().length;
const puerto = process.argv[3]

const infoProcess = {
    argumentosDeEntrada: process.argv.slice(2),
    nombreDeSistemaOperativo: process.platform,
    vercionDeNode: process.version,
    memoriaTotalReservada: process.memoryUsage(),
    pathDeEjecucion: process.execPath,
    processID: process.pid,
    carpetaDeProyecto: process.cwd(),
    cantidadDeCpus: cpuCount
}

const guardarProductos = (datos) => {
    guardar(datos)
   
}

const getProductos = ()=>{ 
    return listar()
};

export {
    infoProcess,
    getProductos,
    guardarProductos

}
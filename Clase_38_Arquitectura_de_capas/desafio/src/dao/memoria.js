const productos = [];

const guardar=(dato)=>{
    productos.push(dato)
}

const listar=()=>{
    return productos
}


export { 
    guardar,
    listar
}
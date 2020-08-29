registrarUsuario = (nombre, pais = 'no especificado', correo, telefono) =>{
    return `nombre: ${nombre} pais: ${pais} correo: ${correo} telefono: ${telefono}`;
}

console.log(registrarUsuario('alvaro', undefined , 'alvaro@correo.com', 5888025))
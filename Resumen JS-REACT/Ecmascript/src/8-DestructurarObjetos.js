/*

//EJEMPLO SIN DESTRUCTURAR:
const usuario = {
    nombre: 'alvaro',
    correo: 'alvaro@gmail.com',
    edad: 25,
    pais: 'colombia',
    profesion: 'desarrolador web'
}

console.log(usuario.nombre);
//EJEMPLO CON DESTRUCTURACION:
const usuario2 = {
    nombre: 'alvaro',
    correo: 'alvaro@gmail.com',
    edad: 25,
    pais: 'colombia',
    profesion: 'desarrolador web'
}

const {nombre, correo, profesion} = usuario2;            //se destructura igual que los arrays solo que con llaves {}

console.log(nombre, edad);

//EN EL ANTERIOR EJEMPLO NO DESTRUCTURAMOS NI LA EDAD NI EL PAIS, Y NO ES NECESARIO PÓNER LAS COMAS COMO EN LA DESTRUCTURACION DE ARRAYS POR QUE LOS OBJETOS YA TIENEN NOMBRES ASIGNADOS A LAS VARIABLES

*/
//Destructuracion en un objeto en una funcion:

const usuario3 = {
  nombre: "alvaro",
  correo: "alvaro@gmail.com",
  edad: 25,
  pais: "colombia",
  profesion: "desarrolador web",
};

const mostrarInfo = ({ nombre, edad, profesion } = usuario3) =>
  console.log(`${nombre} tiene ${edad} años y es ${profesion}`);

mostrarInfo();

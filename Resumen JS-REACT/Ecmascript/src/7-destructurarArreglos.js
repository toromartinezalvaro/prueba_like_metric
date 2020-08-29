const persona = ['alvaro', 23, 'colombia', 'desarrollador web'];

//console.log(persona[0, 1, 2, 3]);

//para destructurar
const persona2 = ['alvaro', 23, 'colombia', 'desarrollador web'];

const [nombre, edad, pais, profesion] = persona2;

///console.log(pais);

//ejemplo con una funcion:

const mostrarInfo = ( [nombre, , pais] = persona2 ) => {         //al poner primero [] y asignarselo al array lo estariamos destructurando en la funcion
    console.log(nombre, pais);
}

mostrarInfo(persona2);

//Una forma de axcrotar la funcion es la siguiente:

const mostrarInfo2 = ([nombre, , pais = 'no especificado'] = persona2) => console.log(nombre, pais);

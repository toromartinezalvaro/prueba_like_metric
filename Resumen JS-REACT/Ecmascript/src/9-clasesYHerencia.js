/*
class usuario {
    constructor(){
        this.nombre = 'carlos arturo',
        this.edad = 23;
    }
}
        //dentro de la clase lo primero que debemos hacer es asignarlas, para eso usamos el metodo constructor(){} (es una funcion que se ejecuta una vez se haga una instancia de usuario)

//Como crear una nueva instancia:
const carlos = new usuario();               //aqui se dice que carlos va a tener las propiedades de usuario

document.write(carlos.nombre);              //aqui se llama a nueva clase carlos con su propiedad nombre


const alejandro = new usuario();

//como crear una clase sin propiedades estaticas (propiedades dinamicas):

class usuario2 {
    constructor(nombre, edad, profesion){                              //los valores que se van a recibir van dentro de los parentesis
        this.nombre = nombre,
        this.edad = edad,
        this.profesion = profesion
    }
}

const alvaro = new usuario2('Alvaro', 25, 'desarrollador web');         //se asignan las propiedades provenientes de la funcion

document.write(`mi nombre es ${alvaro.nombre} y tengo ${alvaro.edad} años`);                                          //se llaman la propiedades requeridas

let alejandro = new usuario2('alejandro', 30, 'ingeniero'); 



//METODOS DENTRO DE UNA CLASE una funcion y un metodo son lo mismo pero cuando esta dentro de una clase se llama metodo. el metodo va fuera del constructor ejemplo:

class usuario{
    constructor(nombre, edad, correo){
        this.nombre = nombre,
        this.edad = edad,
        this.correo = correo
    }

    //nuevo metodo que recibe y retorna los parametros del constructor de arriba
    mostrarInfo(){
        return `
            <b>nombre:</b> ${this.nombre} <br/>            
            <b>edad:</b> ${this.edad} <br/>
            <b>correo:</b> ${this.correo} <br/>
            <hr>
        `;
    }
}


let alvaro = new usuario('alvaro', 25);             //Se le asignan los parametros a la nueva herencia de la clase
document.write(`Mi nombre es ${alvaro.nombre} y tengo ${alvaro.edad} años <br/> <hr>`);         //se muestra en pantalla usando el nombre asignado, un punto y la propiedad que se quiere mostrar


const carlos = new usuario('carlos arturo', 29 , 'correo@correo.com');          //Se asignan los parametros de la nueva clase
document.write(carlos.mostrarInfo());                                           //se llama el metodo que está dentro de la clase


const alvaro2 = new usuario('Alvaro', 25 , 'correo@correo.com');          //Se asignan los parametros de la nueva clase
document.write(alvaro2.mostrarInfo());                                           //se llama el metodo que está dentro de la clase

*/




//HERENCIA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        

        //ESTA ES LA CLASE MADRE
class usuario{
    constructor(nombre, edad, correo){
        this.nombre = nombre,
        this.edad = edad,
        this.correo = correo
    }

    //nuevo metodo que recibe y retorna los parametros del constructor de arriba
    mostrarInfo(){
        return `
            <b>nombre:</b> ${this.nombre} <br/>            
            <b>edad:</b> ${this.edad} <br/>
            <b>correo:</b> ${this.correo} <br/>
            <hr>
        `;
    }
}


        //ESTA ES LA CLASE QUE HEREDA
class estudiante extends usuario {
    constructor(nombre, edad, correo, carrera){                                               //se deben poner los parametros que se quieren usar de la clase madre
        super(nombre, edad, carrera);                      //super ejecuta el constructor de la clase madre
        this.carrera = carrera;                                         //
    }

    mostrarInfo(){                                  //debo sobreescribir el metodo de la clase madre (no entiendo pa que reescribir todo)
        return `
            <b>nombre:</b> ${this.nombre} <br/>            
            <b>edad:</b> ${this.edad} <br/>
            <b>correo:</b> ${this.correo} <br/>
            <hr/>
        `;
    }
}

const marlon = new estudiante('marlon' , 26, 'marlon@gmail.com', 'derecho');
document.write(`el nuevo estudiante es ${marlon.nombre}, tiene ${marlon.edad} años, su correo es ${marlon.correo} y estudia ${marlon.carrera}`);

document.write(mostrarInfo());


 
const nombres = ["carlos", "Alejandro", "Manuel", "Cesar"];

//funcion dentro del .map(); de forma tradicional:
var numero_caracteres = nombres.map(function(nombre){
    console.log(`${nombre} tiene ${nombre.length} letras`);  //el resultado seria "nombre tiene n letras"
});

    //una funcion normal se escribe asi: function(parametro){codigo a ejecutar}


/*
funcion flecha:
(parametro)=>{
    return
}
*/
//funcion flecha dentro del map
numero_caracteres = nombres.map((nombre)=>{             //cuando se tienen llaves se debe usar la palabra return
    return `${nombre} tiene ${nombre.length} letras`;   //el resultado seria "nombre tiene n letras"
});

    //la anterior funcion se puede optimizar asi:
    numero_caracteres = nombres.map(nombre => `${nombre} tiene ${nombre.length} letras`);


document.write(numero_caracteres);


/*
.map es una funcion que permite recorrer cada uno de los elementos de un arreglo y hacer algo por cada uno que recorra (ese algo se pondria entre los parentesis), en este ejemplo se está poniendo una funcion como un parametro (funcion dentro de los parentesis del .map();)

*/
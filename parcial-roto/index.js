//--- Funcion que obtiene el carrito del LocalStorage, lo parsea a un array y lo retorna ---//
function obtenerCarrito() {

    let carritoParseado = JSON.parse(localStorage.getItem("carrito-burga")) || []; // Traemos el carrito en forma de array parseandolo con JSON.parse
    return carritoParseado;
}

//--- Funcion que guarda el carrito recibido al LocalStorage, previamente transformado a string ---//
function guardarCarrito(carrito) {
    localStorage.setItem("carrito-burga", JSON.stringify(carrito)); // Seteamos el carrito en el LocalStorage con su clave y su valor en String
}

function sumarAlCarrito(e) {
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let botonSumar = e.target;

    let cardSumar = botonSumar.parentElement; // Obtenemos la card del elemento en el que se hizo click (la LI entera solo de ese elemento)

    let nombreProd = cardSumar.querySelector(".nombre-producto").textContent; // Obtenemos el nombre
    let precioString = cardSumar.querySelector(".precio-producto").textContent; // Obtenemos el precio en forma de string

    let precioNum = parseInt(precioString.replace("$", "")); // Parseamos el precio a INT y le sacamos el singo pesos

    let carrito = obtenerCarrito(); // E

    let productoEncontrado = carrito.find(p => p.nombre === nombreProd) // Buscamos el producto clickeado en el carrito con un FIND

    if (productoEncontrado) {
        productoEncontrado.cantidad++ // C   // Si lo encuentra le suma la cantidad

    } else {

       let productoNuevo = {
            nombre: nombreProd,
            precio: precioNum,
            cantidad: 1
        } // B     Si no lo encuentra lo crea y lo pushea al carrito

        carrito.push(productoNuevo);
    }


    // D
    alert(`Un/una: ${nombreProd} fue agregado al carrito`);

    // F
    console.log("Carrito actual: ", carrito);

    // A
    guardarCarrito(carrito) // Llamamos a la función guardar que hice previamente
}


function restarDelCarrito(e) {


    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let botonRestar = e.target;

    let cardRestar = botonRestar.parentElement;

    let nombreProd = cardRestar.querySelector(".nombre-producto").textContent;

    let carrito = obtenerCarrito();

    if (carrito.length === 0) {

        alert("No hay ningún producto guardado en el carrito");

        return;
    } // K     Si la longitud del array el 0, es decir, está vacío, mostramos el alert correspondiente

    let productoEncontrado = carrito.find(p => p.nombre === nombreProd) // buscamos igual que en la función de sumar

    if (!productoEncontrado) {

        alert(`No hay más ${nombreProd}.`); // H   Si no lo encuentra lanzamos el alert correspondiente
    } else {
        
        productoEncontrado.cantidad--
        alert(`Un/una ${nombreProd} fue eliminado del carrito.`) // I   Caso contrario, le restamos la cantidad

        if (productoEncontrado.cantidad === 0) {

        let indiceProductoEncontrado = carrito.findIndex(p => p.nombre === nombreProd);

        carrito.splice(indiceProductoEncontrado, 1) // J   Hacemos la validación correspondiente para eliminar ese producto si su cantidad es 0.

    }
    }

    


    guardarCarrito(carrito) // G   Guardamos otra vez

}

//--- [EVENTOS] Asociacion del evento "click" a los botones "+" y "-" con la funcion manejadora del evento ---//
window.addEventListener("DOMContentLoaded", () => {
    const botonesSumar = document.querySelectorAll(".btn-sumar-a-carrito");
    const botonesRestar = document.querySelectorAll(".btn-restar-a-carrito");

    botonesSumar.forEach(btn => btn.addEventListener("click", sumarAlCarrito));
    botonesRestar.forEach(btn => btn.addEventListener("click", restarDelCarrito));
});

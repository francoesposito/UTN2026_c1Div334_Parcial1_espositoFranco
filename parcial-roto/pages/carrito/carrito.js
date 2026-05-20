function obtenerCarrito() {
    let carritoParseado = JSON.parse(localStorage.getItem("carrito-burga")) || []; // Funcion idéntica a la que se encuentra en el index.js
    return carritoParseado;
}

function cargarProductosCarrito() {
    let tabla = document.getElementById("tabla-carrito");

    let precio = document.getElementById("valor-final"); // obtenemos el precio para usar ese valor más tarde

    let carrito = obtenerCarrito();

    carrito.forEach(producto => {
        tabla.innerHTML += `

        <tr>
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>$${producto.precio}</td>
        </tr>
        
        `

    }); // A     Agregamos al html cada producto que haya en el carrito, con el formato solicitado

    const plataTotal = carrito.reduce((acumulador, producto) => {

        return acumulador + (producto.precio * producto.cantidad)

    }, 0) // reducimos el precio de cada producto del carrito a un único valor


    precio.textContent = `El valor final a pagar es de: $${plataTotal}`; // E y F      Mostramos en la etiqueta de debajo de la tabla el valor total del carrito.

}

function limpiarCarrito() {

    let carrito = obtenerCarrito();

    carrito.length = 0; // D   Seteamos la longitud del carrito en 0, un forma práctica de vaciar un array

    localStorage.setItem("carrito-burga", JSON.stringify(carrito));

    alert("Carrito limpiado correctamente")

    window.location.reload();

}

// Asociar evento al botón cuando la página carga
window.addEventListener("DOMContentLoaded", () => {
    cargarProductosCarrito();
    document.querySelector(".btn-limpiar-carrito").addEventListener("click", limpiarCarrito);
});
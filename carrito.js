let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoLleno = document.querySelector("#carrito-lleno");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonComprar = document.querySelector("#carrito-acciones-comprar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");

// Función para cargar productos en el carrito
function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {
// Si hay productos en el carrito, muestra los elementos correspondientes
// Oculta el carrito vacío
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoLleno.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
// crea un elemento div para cada producto en el carrito
    const div = document.createElement("div");
    div.classList.add("carrito-producto");
    div.innerHTML = `
    <img class="imagen-carrito" src="${producto.image}" alt="${producto.name}">
                        <div class="carrito-producto-titulo">
                            <small>Title</small>
                            <h3>${producto.name}</h3>
                        </div>
                        <div class="carrito-producto-cantidad">
                            <small>Quantity</small>
                            <p>${producto.cantidad}</p>
                        </div>
                        <div class="carrito-producto-precio">
                            <small>Price</small>
                            <p>${producto.price}</p>
                        </div>
                        <div class="carrito-producto-subtotal">
                            <small>Subtotal</small>
                            <p>${producto.price * producto.cantidad}</p>
                        </div>
                        <button class="carrito-producto-eliminar" id="${producto.id}">Delete</button>
    `;

    contenedorCarritoProductos.append(div);
 })

} else {
// Si no hay productos en el carrito, muestra el carrito vacío 
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoLleno.classList.add("disabled");
}

actualizarBotonesEliminar();
actualizarTotal();

}

cargarProductosCarrito();

// Función para actualizar el boton eliminar, luego de cargar los productos en el carrito
function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });

}

// Función para eliminar un producto en el carrito
function eliminarDelCarrito(e) {

// Libreria
Toastify({
    text: "Item removed",
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
        background: "linear-gradient(to right, #964B00, #FFFFFF)",
        textTransform: "uppercase",
        borderRadius: "2rem",
        fontSize: "0.75rem",
    },
    offset: {
        x: "1.5rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
        y: "1.5rem" // vertical axis - can be a number or a string indicating unity. eg: '2em'
      },       
    onClick: function(){} // Callback after click
  }).showToast();

    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

botonVaciar.addEventListener("click", vaciarCarrito);

// Función para vaciar el carrito
function vaciarCarrito() {

// Libreria
    Swal.fire({
        title: `Are you sure?`,
        icon: 'question',
        html:
          'All your items will be removed',
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:'Yes',
        cancelButtonText:'No',
      }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
        } 
      })
}

// Función para actualizar el total del carrito de compra
function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc,producto) => acc + (producto.price * producto.cantidad), 0)

     total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);

// Función para comprar y para que aparezca mensaje personalizado al comprar productos
function comprarCarrito() {

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoLleno.classList.remove("disabled");

}


let productos = [];

fetch("./productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

// Función para cargar los productos en la página según la categoría seleccionada
// Crea un elemento div para cada producto y lo agrega al contenedor

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
      <img class="producto-imagen" src="${producto.image}" alt="${producto.name}">
      <div class="producto-detalles">
        <h3 class="producto-titulo">${producto.name}</h3>
        <p class="producto-precio">$${producto.price}</p>
        <button class="producto-agregar" id="${producto.id}">Add</button>
      </div>
    `;
        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}


// Evento para los botones

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);

// Si se selecciona una categoría específica
// Cambia el título según la categoría seleccionada
// Filtra los productos según la categoría seleccionada y los carga

        } else {
            tituloPrincipal.innerText = "All products";
            cargarProductos(productos);
        }
    })
})

// Si se selecciona la categoría "todos" (todos los productos)
// Cambia el título a "Todos los productos"
// Carga todos los productos


// Función para actualizar el boton "Agregar" después de cargar nuevos productos
function actualizarBotonesAgregar () {
    botonesAgregar = document.querySelectorAll(".producto-agregar");
    
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });

}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

// Si hay productos en el carrito en el almacenamiento local (localStorage)
// Recupera y analiza los productos en un array
// Actualiza el "numerito" (cantidad de productos en el carrito)

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
// Si no hay productos en el carrito en el almacenamiento local (localStorage)
// Inicializa un array vacío
}

// Función para agregar un producto al carrito
function agregarAlCarrito(e) {

    Toastify({
        text: "Item added",
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "right", 
        stopOnFocus: true, 
        style: {
            background: "linear-gradient(to right, #964B00, #FFFFFF)",
            textTransform: "uppercase",
            borderRadius: "2rem",
            fontSize: "0.75rem",
        },
        offset: {
            x: "1.5rem", 
            y: "1.5rem" 
          },       
        onClick: function(){} 
      }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
// Si el producto ya existe en el carrito, encuentra el índice del producto existente y aumenta su cantidad

    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
// Si el producto no existe en el carrito, establece la cantidad en 1 y lo agrega al carrito
    }

    actualizarNumerito(); 

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

// Función para actualizar la cantidad de productos en el carrito que se muestra en "numerito"
function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}


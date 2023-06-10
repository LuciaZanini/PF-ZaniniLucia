// Array de objetos -PRODUCTOS
const productos = [
    {
        id: "mate-01", name: 'Zeus', price: 2000, image: './images/1.jpg', categoria: {
            nombre: "Mates",
            id: "mates"
        }, description: 'Wooden mate'
    },
    {
        id: "mate-02", name: 'Atenas', price: 1500, image: './images/2.jpg', categoria: {
            nombre: "Mates",
            id: "mates"
        }, description: 'Pumpkin mate'
    },
    {
        id: "mate-03", name: 'Arquimedes', price: 1300, image: 'images/3.jpg', categoria: {
            nombre: "Mates",
            id: "mates"
        }, description: 'Smoky flavour'
    },
    {
        id: "mate-04", name: 'Hades', price: 1800, image: 'images/4.jpg', categoria: {
            nombre: "Mates",
            id: "mates"
        }, description: 'Strong base wooden mate'
    },
    {
        id: "mate-05", name: 'Poseidon', price: 1000, image: 'images/5.jpg', categoria: {
            nombre: "Mates",
            id: "mates"
        }, description: 'Basic but nice though'
    },
    {
        id: "bombilla-01", name: "Basic", price: 200, image: 'images/bombilla1.jpg', categoria: {
            nombre: "Bombillas",
            id: "bombillas"
        }, description: 'Cute'
    },
    {
        id: "bombilla-02", name: "Intermediate", price: 30, image: 'images/bombilla2.jpg', categoria: {
            nombre: "Bombillas",
            id: "bombillas"
        }, description: 'Fancy'
    },
    {
        id: "bombilla-03", name: "Advanced", price: 400, image: 'images/bombilla3..jpg', categoria: {
            nombre: "Bombillas",
            id: "bombillas"
        }, description: 'Variety'
    },
    {
        id: "matero-01", name: "Formal", price: 5000, image: 'images/matero1.jpg', categoria: {
            nombre: "Materos",
            id: "materos"
        }, description: 'Formal look'
    },
    {
        id: "matero-02", name: "Chill", price: 2500, image: 'images/matero2.jpg', categoria: {
            nombre: "Materos",
            id: "materos"
        }, description: 'Afternoon tea'
    },
    {
        id: "matero-03", name: "Bright", price: 3000, image: 'images/matero3.jpg', categoria: {
            nombre: "Materos",
            id: "materos"
        }, description: 'Bright colours'
    }
];

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

cargarProductos(productos);

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


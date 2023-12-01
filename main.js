const productos = [
  // Corporales
  {
    id: "corporal-1",
    titulo: "Jabon corporal con Extracto de Lilas",
    imagen: "./imgs/corporales/corporal1.jpg",
    categoria: {
      nombre: "Productos Corporales",
      id: "corporales",
    },
    precio: 5000,
  },

  {
    id: "corporal-2",
    titulo: "Limpiador corporal con Extracto de Lilas",
    imagen: "./imgs/corporales/corporal2.jpg",
    categoria: {
      nombre: "Productos Corporales",
      id: "corporales",
    },
    precio: 10000,
  },

  {
    id: "corporal-3",
    titulo: "Crema corporal con agua de rosas",
    imagen: "./imgs/corporales/corporal3.jpg",
    categoria: {
      nombre: "Productos Corporales",
      id: "corporales",
    },
    precio: 11000,
  },

  {
    id: "corporal-4",
    titulo: "Exfoliante corporal con Extracto de Lilas",
    imagen: "./imgs/corporales/corporal4.jpg",
    categoria: {
      nombre: "Productos Corporales",
      id: "corporales",
    },
    precio: 15000,
  },

  //Faciales
  {
    id: "facial-1",
    titulo: "Crema Facial con Extracto de Lilas",
    imagen: "./imgs/faciales/facial1.jpg",
    categoria: {
      nombre: "Cremas Faciales",
      id: "faciales",
    },
    precio: 3000,
  },

  {
    id: "facial-2",
    titulo: "Crema Facial con Agua de Rosas",
    imagen: "./imgs/faciales/facial2.jpg",
    categoria: {
      nombre: "Cremas Faciales",
      id: "faciales",
    },
    precio: 8000,
  },
  // Limpiadores
  {
    id: "limpiador-1",
    titulo: "Jabón Facial con Extracto de Lilas",
    imagen: "./imgs/limpiadores/limpiador1.jpg",
    categoria: {
      nombre: "Limpiadores",
      id: "limpiadores",
    },
    precio: 5000,
  },

  {
    id: "limpiador-2",
    titulo: "Limpiador Facial con Agua de Rosas",
    imagen: "./imgs/limpiadores/limpiador2.jpg",
    categoria: {
      nombre: "Limpiadores",
      id: "limpiadores",
    },
    precio: 10000,
  },
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesMenu = document.querySelectorAll(".boton-menu");
const homeTitulo = document.querySelector("#primer-titulo");
let botonesAgregar = document.querySelector(".añadir-carrito");
const numero = document.querySelector("#numero");

function cargarProductos(productosMenu) {
  contenedorProductos.innerHTML = "";

  productosMenu.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `  
    <img
      class="imagen-producto"
      src="${producto.imagen}"
      alt="${producto.titulo}"
    />
    <div class="info-producto">
      <h3 class="titulo-producto">${producto.titulo}</h3>
      <p class="precio-producto">
      $${producto.precio}</p>
      <button class="añadir-carrito" id= "${producto.id}">Añadir al carrito</button>
    </div>
    `;
    contenedorProductos.append(div);
  });
  actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesMenu.forEach((boton) => {
  boton.addEventListener("click", (e) => {
    if (e.currentTarget.id != "todos") {
      const productoCategoria = productos.find(
        (producto) => producto.categoria.id === e.currentTarget.id
      );

      homeTitulo.innerText = productoCategoria.categoria.nombre;

      const productosMenu = productos.filter(
        (producto) => producto.categoria.id === e.currentTarget.id
      );

      cargarProductos(productosMenu);
    } else {
      homeTitulo.innerText = "Todos los productos";
      cargarProductos(productos);
    }
  });
});

function actualizarBotonesAgregar() {
  botonesAgregar = document.querySelectorAll(".añadir-carrito");

  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", añadirAlCarrito);
  });
}

const productosEnCarrito = [];
function añadirAlCarrito(e) {
  const idBoton = e.currentTarget.id;
  const productoAñadido = productos.find((producto) => producto.id === idBoton);

  if (productosEnCarrito.some((producto) => producto.id === idBoton)) {
    const index = productosEnCarrito.findIndex(
      (producto) => producto.id === idBoton
    );
    productosEnCarrito[index].cantidad++;
  } else {
    productoAñadido.cantidad = 1;
    productosEnCarrito.push(productoAñadido);
  }

  actualizarNumero();

  localStorage.setItem(
    "productos-en-carrito",
    JSON.stringify(productosEnCarrito)
  );
}

function actualizarNumero() {
  let sumaNumero = productosEnCarrito.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );
  numero.innerText = sumaNumero;
}

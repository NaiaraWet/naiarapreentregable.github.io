document.addEventListener('DOMContentLoaded', function() {
  const listaProductos = document.getElementById('listaProductos');
  const formularioProducto = document.getElementById('formularioProducto');
  const btnVaciarCarrito = document.getElementById('vaciarCarrito');

  function actualizarTotalProductos() {
    const productos = JSON.parse(localStorage.getItem('carrito')) || [];
    let total = 0;
    productos.forEach(producto => {
      total += parseInt(producto.cantidad);
    });
    totalProductos.textContent = `Total de productos: ${total}`; // Actualizar texto
  }

  function agregarProductoAlCarrito(event) {
      event.preventDefault(); // Prevenir el envío del formulario de manera tradicional.

      // Generar un ID único para el nuevo producto.
      const idProducto = Date.now().toString(36) + Math.random().toString(36).substring(2);

      // Recoger los valores del formulario.
      const nombre = document.getElementById('nombreProducto').value;
      const precio = document.getElementById('precioProducto').value;
      const descripcion = document.getElementById('descripcionProducto').value;
      const cantidad = document.getElementById('cantidadProducto').value;

      // Crear objeto de producto con los datos del formulario.
      const producto = { id: idProducto, nombre, precio, descripcion, cantidad };

      guardarEnLocalStorage(producto);
      mostrarProductoEnLista(producto);
      actualizarTotalProductos();

      formularioProducto.reset(); // Limpiar el formulario después de la adición.
  }

  function guardarEnLocalStorage(producto) {
      let productos = JSON.parse(localStorage.getItem('carrito')) || [];
      productos.push(producto);
      localStorage.setItem('carrito', JSON.stringify(productos));
  }

  function mostrarProductoEnLista(producto) {
      const elementoLista = document.createElement('li');
      elementoLista.id = producto.id;
      elementoLista.textContent = `${producto.nombre} - Precio: $${producto.precio} - Cantidad: ${producto.cantidad} - Descripción: ${producto.descripcion}`;
      listaProductos.appendChild(elementoLista);

      // Botón para eliminar producto individualmente.
      const botonEliminar = document.createElement('button');
      botonEliminar.textContent = 'Eliminar';
      botonEliminar.onclick = function() { eliminarProducto(producto.id); };
      elementoLista.appendChild(botonEliminar);
  }

  function cargarProductosPrevios() {
      const productos = JSON.parse(localStorage.getItem('carrito')) || [];
      productos.forEach(producto => mostrarProductoEnLista(producto));
      actualizarTotalProductos();
  }

  function vaciarCarrito() {
    localStorage.removeItem('carrito'); // Elimina el carrito del almacenamiento local.
    listaProductos.innerHTML = ''; // Limpia la lista de productos en la interfaz.
    actualizarTotalProductos(); // Actualiza el total de productos a 0.
  }

  function eliminarProducto(idProducto) {
      let productos = JSON.parse(localStorage.getItem('carrito')) || [];
      productos = productos.filter(producto => producto.id !== idProducto);
      localStorage.setItem('carrito', JSON.stringify(productos));
      document.getElementById(idProducto).remove();
      actualizarTotalProductos();
  }

  formularioProducto.addEventListener('submit', agregarProductoAlCarrito);
  btnVaciarCarrito.addEventListener('click', vaciarCarrito);
  cargarProductosPrevios();
});

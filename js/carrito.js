
// Cargar carrito desde localStorage al iniciar por si venimos de otra página
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    actualizarUI();

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    actualizarUI();
}

function actualizarUI() {
    // Guardar el estado actual en el almacenamiento local
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    // 1. Actualizar el numero del icono 
    document.querySelectorAll('.cart-count-global').forEach(el => el.innerText = carrito.length);

    // 2. Elementos de la interfaz
    const contenedorCarrito = document.getElementById('cart-items'); // El del panel lateral
    const totalCarrito = document.getElementById('cart-total');
    const contenedorResumen = document.getElementById('resumen-lista'); // El de la página de pago
    const totalResumen = document.getElementById('resumen-total');

    let html = '';
    let total = 0;

    // Si el carrito está vacío
    if (carrito.length === 0) {
        const msgVacio = '<p class="text-center text-muted mt-5">Tu carrito está vacío</p>';
        if (contenedorCarrito) contenedorCarrito.innerHTML = msgVacio;
        if (contenedorResumen) contenedorResumen.innerHTML = msgVacio;
        if (totalCarrito) totalCarrito.innerText = '$0.00';
        if (totalResumen) totalResumen.innerText = '$0.00';
        return;
    }

    // Generar el HTML de los productos
    carrito.forEach((item, index) => {
        total += item.precio;
        html += `
            <div class="d-flex justify-content-between align-items-center mb-3 p-2 shadow-sm rounded bg-light">
                <div>
                    <h6 class="mb-0 fw-bold">${item.nombre}</h6>
                    <small class="text-caramelo">$${item.precio.toFixed(2)}</small>
                </div>
                <button class="btn btn-sm text-danger" onclick="eliminarDelCarrito(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>`;
    });

    //Poner el HTML segun la pagina
    if (contenedorCarrito) {
        contenedorCarrito.innerHTML = html;
        totalCarrito.innerText = `$${total.toFixed(2)}`;
    }

    if (contenedorResumen) {
        contenedorResumen.innerHTML = html;
        totalResumen.innerText = `$${total.toFixed(2)}`;
    }
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarUI();
}

// FUNCIÓN CLAVE: Guarda y redirecciona
function redirigirAOrden() {
    if (carrito.length === 0) {
        alert("Agrega algo al carrito primero.");
        return;
    }
    // Guardamos una última vez por seguridad
    localStorage.setItem('carrito', JSON.stringify(carrito));
    // Redirección
    window.location.href = 'ordenar.html';
}

// Para mostrar/ocultar el campo de dirección
function toggleDireccion(show) {
    const campo = document.getElementById('campo-direccion');
    if (campo) {
        if (show) campo.classList.remove('d-none');
        else campo.classList.add('d-none');
    }
}

// Para manejar el envío del formulario 
document.getElementById('form-pedido')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert("¡Pedido recibido con éxito! Nos contactaremos pronto.");
    localStorage.removeItem('carrito'); // Limpia el carrito tras la compra
    window.location.href = 'ordenar.html';
});

//Tarjetas modal
function mostrarDetalles(nombre, imagen, descripcion, precio) {
    document.getElementById('modalTitulo').innerText = nombre;
    document.getElementById('modalImg').src = imagen;
    document.getElementById('modalDescripcion').innerText = descripcion;
    document.getElementById('modalPrecio').innerText = precio;
}

// --- FUNCION PARA MOVER EL SLIDER DE PRODUCTOS ---
function moverScroll(idContenedor, distancia) {
    const contenedor = document.getElementById(idContenedor);
    if (contenedor) {
        contenedor.scrollBy({
            left: distancia,
            behavior: 'smooth'
        });
    }
}
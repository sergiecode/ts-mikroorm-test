/**
 * Frontend - Lógica de Interacción
 * 
 * Autor: Sergie Code (@sergiecode)
 * Proyecto: Sistema de Gestión con TypeScript + MikroORM + SQLite
 * 
 * Este archivo maneja la lógica del frontend, invocando servicios del backend
 * directamente en el mismo proceso sin usar API REST.
 */

// Frontend integrado - invoca servicios del backend directamente en el mismo proceso
// El servidor genera HTML con datos reales desde SQLite mediante MikroORM

function showMessage(text, isError = false) {
    const messageDiv = document.getElementById('message');
    messageDiv.className = 'message ' + (isError ? 'error' : 'success');
    messageDiv.textContent = text;
    setTimeout(() => messageDiv.textContent = '', 3000);
}

async function invocarServicio(tipo, datos) {
    try {
        const response = await fetch('/accion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tipo, ...datos })
        });
        
        const result = await response.json();
        if (!result.success) {
            throw new Error(result.error);
        }
        
        // Recargar página para obtener datos actualizados del servidor
        window.location.reload();
    } catch (error) {
        showMessage('Error: ' + error.message, true);
    }
}

// CLIENTES
function guardarCliente() {
    const id = document.getElementById('clienteId').value;
    const nombre = document.getElementById('clienteNombre').value;
    const email = document.getElementById('clienteEmail').value;
    
    if (!nombre || !email) {
        showMessage('Por favor complete todos los campos', true);
        return;
    }
    
    if (id) {
        invocarServicio('editarCliente', { id: parseInt(id), nombre, email });
    } else {
        invocarServicio('agregarCliente', { nombre, email });
    }
}

function editarCliente(id, nombre, email) {
    document.getElementById('clienteId').value = id;
    document.getElementById('clienteNombre').value = nombre;
    document.getElementById('clienteEmail').value = email;
    document.getElementById('clienteNombre').focus();
}

function eliminarCliente(id) {
    if (confirm('¿Está seguro de eliminar este cliente?')) {
        invocarServicio('eliminarCliente', { id });
    }
}

function cancelarEdicion(tipo) {
    if (tipo === 'cliente') {
        document.getElementById('clienteId').value = '';
        document.getElementById('clienteNombre').value = '';
        document.getElementById('clienteEmail').value = '';
    } else if (tipo === 'producto') {
        document.getElementById('productoId').value = '';
        document.getElementById('productoNombre').value = '';
        document.getElementById('productoPrecio').value = '';
    }
}

// PRODUCTOS
function guardarProducto() {
    const id = document.getElementById('productoId').value;
    const nombre = document.getElementById('productoNombre').value;
    const precio = parseFloat(document.getElementById('productoPrecio').value);
    
    if (!nombre || !precio) {
        showMessage('Por favor complete todos los campos', true);
        return;
    }
    
    if (id) {
        invocarServicio('editarProducto', { id: parseInt(id), nombre, precio });
    } else {
        invocarServicio('agregarProducto', { nombre, precio });
    }
}

function editarProducto(id, nombre, precio) {
    document.getElementById('productoId').value = id;
    document.getElementById('productoNombre').value = nombre;
    document.getElementById('productoPrecio').value = precio;
    document.getElementById('productoNombre').focus();
}

function eliminarProducto(id) {
    if (confirm('¿Está seguro de eliminar este producto?')) {
        invocarServicio('eliminarProducto', { id });
    }
}

// COMPRAS
function registrarCompra() {
    const clienteId = parseInt(document.getElementById('compraCliente').value);
    const productoId = parseInt(document.getElementById('compraProducto').value);
    const cantidad = parseInt(document.getElementById('compraCantidad').value);
    
    if (!clienteId || !productoId || !cantidad) {
        showMessage('Por favor complete todos los campos', true);
        return;
    }
    
    invocarServicio('agregarCompra', { clienteId, productoId, cantidad });
}

function eliminarCompra(id) {
    if (confirm('¿Está seguro de eliminar esta compra?')) {
        invocarServicio('eliminarCompra', { id });
    }
}

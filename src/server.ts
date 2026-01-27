/**
 * Sistema de Gestión Integrado - TypeScript + MikroORM + SQLite
 * 
 * Autor: Sergie Code
 * Instagram: @sergiecode
 * YouTube: @SergieCode
 * GitHub: github.com/sergiecode
 * 
 * Descripción: Servidor integrado que gestiona clientes, productos y compras
 * sin usar API REST. Todas las operaciones se realizan mediante invocación
 * directa de servicios en el mismo proceso.
 */

import * as http from 'http';
import * as url from 'url';
import * as fs from 'fs';
import * as path from 'path';
import { getApp } from './app';

const PORT = 3000;

async function renderHTML(clientes: any[], productos: any[], compras: any[]) {
  const template = fs.readFileSync(path.join(__dirname, '../public/index.html'), 'utf-8');
  
  const clientesHTML = clientes.map(c => 
    `<div class="item">
      <strong>${c.nombre}</strong><br>
      Email: ${c.email}<br>
      <button onclick="editarCliente(${c.id}, '${c.nombre}', '${c.email}')">Editar</button>
      <button class="btn-danger" onclick="eliminarCliente(${c.id})">Eliminar</button>
    </div>`
  ).join('');
  
  const productosHTML = productos.map(p => 
    `<div class="item">
      <strong>${p.nombre}</strong><br>
      Precio: $${p.precio.toFixed(2)}<br>
      <button onclick="editarProducto(${p.id}, '${p.nombre}', ${p.precio})">Editar</button>
      <button class="btn-danger" onclick="eliminarProducto(${p.id})">Eliminar</button>
    </div>`
  ).join('');
  
  const comprasHTML = compras.map(c => {
    const fecha = new Date(c.fecha);
    return `<div class="item item-compra">
      <strong>Cliente:</strong> ${c.cliente.nombre}<br>
      <strong>Producto:</strong> ${c.producto.nombre}<br>
      <strong>Cantidad:</strong> ${c.cantidad}<br>
      <strong>Total:</strong> $${(c.producto.precio * c.cantidad).toFixed(2)}<br>
      <strong>Fecha:</strong> ${fecha.toLocaleDateString()}<br>
      <button class="btn-danger" onclick="eliminarCompra(${c.id})">Eliminar</button>
    </div>`;
  }).join('');
  
  const clientesOptions = clientes.map(c => 
    `<option value="${c.id}">${c.nombre}</option>`
  ).join('');
  
  const productosOptions = productos.map(p => 
    `<option value="${p.id}">${p.nombre} - $${p.precio.toFixed(2)}</option>`
  ).join('');
  
  let html = template
    .replace('<!--CLIENTES-->', clientesHTML)
    .replace('<!--PRODUCTOS-->', productosHTML)
    .replace('<!--COMPRAS-->', comprasHTML)
    .replace('<!--CLIENTES_OPTIONS-->', clientesOptions)
    .replace('<!--PRODUCTOS_OPTIONS-->', productosOptions);
    
  return html;
}

async function handleRequest(req: http.IncomingMessage, res: http.ServerResponse) {
  const parsedUrl = url.parse(req.url || '', true);
  const pathname = parsedUrl.pathname;

  if (pathname === '/styles.css') {
    const filePath = path.join(__dirname, '../public/styles.css');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(data);
    });
    return;
  }

  if (pathname === '/app.js') {
    const filePath = path.join(__dirname, '../public/app.js');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/javascript' });
      res.end(data);
    });
    return;
  }

  // Página principal - genera HTML con datos desde el backend directamente
  if (pathname === '/' || pathname === '/index.html') {
    const app = await getApp();
    const clientes = await app.getClienteService().listarClientes();
    const productos = await app.getProductoService().listarProductos();
    const compras = await app.getCompraService().listarCompras();
    
    const html = await renderHTML(clientes, productos, compras);
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
    return;
  }

  // Operaciones - llaman directamente a los servicios
  if (pathname === '/accion' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const app = await getApp();
        
        switch(data.tipo) {
          case 'agregarCliente':
            await app.getClienteService().agregarCliente(data.nombre, data.email);
            break;
          case 'editarCliente':
            await app.getClienteService().modificarCliente(data.id, data.nombre, data.email);
            break;
          case 'eliminarCliente':
            await app.getClienteService().eliminarCliente(data.id);
            break;
          case 'agregarProducto':
            await app.getProductoService().agregarProducto(data.nombre, data.precio);
            break;
          case 'editarProducto':
            await app.getProductoService().modificarProducto(data.id, data.nombre, data.precio);
            break;
          case 'eliminarProducto':
            await app.getProductoService().eliminarProducto(data.id);
            break;
          case 'agregarCompra':
            await app.getCompraService().registrarCompra(data.clienteId, data.productoId, data.cantidad);
            break;
          case 'eliminarCompra':
            await app.getCompraService().eliminarCompra(data.id);
            break;
        }
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: String(error) }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end('Not Found');
}

async function startServer() {
  console.log('\n========================================');
  console.log('  SISTEMA INTEGRADO BACKEND + FRONTEND');
  console.log('========================================');
  console.log('• TypeScript + MikroORM + SQLite');
  console.log('• Sin API REST - Comunicación interna');
  console.log('• CRUD completo: Clientes, Productos, Compras');
  console.log('========================================\n');
  
  await getApp();
  
  const server = http.createServer(handleRequest);
  
  server.listen(PORT, () => {
    console.log('✅ Servidor iniciado correctamente\n');
    console.log('🌐 Aplicación disponible en:');
    console.log(`   \x1b[36m\x1b[4mhttp://localhost:${PORT}\x1b[0m`);
    console.log(`   \x1b[36m\x1b[4mhttp://127.0.0.1:${PORT}\x1b[0m`);
    console.log('\n💡 Presiona Ctrl+C para detener el servidor\n');
  });
}

startServer().catch(console.error);

import { getApp } from './app';

async function main() {
  console.log('Iniciando aplicación...');
  
  const app = await getApp();
  
  const clienteService = app.getClienteService();
  const productoService = app.getProductoService();
  const compraService = app.getCompraService();
  
  // Mostrar clientes
  console.log('\n=== CLIENTES ===');
  const clientes = await clienteService.listarClientes();
  clientes.forEach(c => console.log(`${c.id}. ${c.nombre} - ${c.email}`));
  
  // Mostrar productos
  console.log('\n=== PRODUCTOS ===');
  const productos = await productoService.listarProductos();
  productos.forEach(p => console.log(`${p.id}. ${p.nombre} - $${p.precio}`));
  
  // Realizar una compra de ejemplo
  console.log('\n=== REALIZANDO COMPRA DE EJEMPLO ===');
  if (clientes.length > 0 && productos.length > 0) {
    const compra = await compraService.registrarCompra(clientes[0].id, productos[0].id, 2);
    if (compra) {
      console.log(`Compra registrada: Cliente ${compra.cliente.nombre} compró ${compra.cantidad} x ${compra.producto.nombre}`);
    }
  }
  
  // Mostrar compras
  console.log('\n=== COMPRAS ===');
  const compras = await compraService.listarCompras();
  compras.forEach(c => {
    console.log(`${c.id}. ${c.cliente.nombre} compró ${c.cantidad} x ${c.producto.nombre} - ${c.fecha.toLocaleDateString()}`);
  });
  
  console.log('\nAplicación ejecutada correctamente');
  
  await app.close();
}

main().catch(console.error);

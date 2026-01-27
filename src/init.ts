import { MikroORM } from '@mikro-orm/core';
import config from './mikro-orm.config';
import { ClienteService } from './services/ClienteService';
import { ProductoService } from './services/ProductoService';

async function init() {
  console.log('Inicializando base de datos...');
  
  const orm = await MikroORM.init(config);
  
  // Crear schema
  const generator = orm.getSchemaGenerator();
  await generator.dropSchema();
  await generator.createSchema();
  
  console.log('Schema creado exitosamente');
  
  // Poblar con datos iniciales
  const em = orm.em.fork();
  const clienteService = new ClienteService(em);
  const productoService = new ProductoService(em);
  
  // Agregar clientes
  await clienteService.agregarCliente('Juan Pérez', 'juan@email.com');
  await clienteService.agregarCliente('María García', 'maria@email.com');
  await clienteService.agregarCliente('Carlos López', 'carlos@email.com');
  
  console.log('Clientes agregados');
  
  // Agregar productos
  await productoService.agregarProducto('Laptop', 1200.00);
  await productoService.agregarProducto('Mouse', 25.50);
  await productoService.agregarProducto('Teclado', 75.00);
  await productoService.agregarProducto('Monitor', 300.00);
  
  console.log('Productos agregados');
  console.log('Base de datos inicializada correctamente');
  
  await orm.close(true);
}

init().catch(console.error);

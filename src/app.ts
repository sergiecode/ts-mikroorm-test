/**
 * Sistema de Gestión - Instancia de Aplicación
 * 
 * Autor: Sergie Code
 * Instagram: @sergiecode | YouTube: @SergieCode
 * 
 * Gestiona la instancia de MikroORM y los servicios de la aplicación
 */

import { MikroORM } from '@mikro-orm/core';
import config from './mikro-orm.config';
import { ClienteService } from './services/ClienteService';
import { ProductoService } from './services/ProductoService';
import { CompraService } from './services/CompraService';

export class App {
  private orm!: MikroORM;
  private clienteService!: ClienteService;
  private productoService!: ProductoService;
  private compraService!: CompraService;

  async initialize() {
    this.orm = await MikroORM.init(config);
    const em = this.orm.em.fork();
    
    this.clienteService = new ClienteService(em);
    this.productoService = new ProductoService(em);
    this.compraService = new CompraService(em);
  }

  getClienteService(): ClienteService {
    return this.clienteService;
  }

  getProductoService(): ProductoService {
    return this.productoService;
  }

  getCompraService(): CompraService {
    return this.compraService;
  }

  async close() {
    await this.orm.close(true);
  }
}

// Instancia global de la aplicación
let appInstance: App | null = null;

export async function getApp(): Promise<App> {
  if (!appInstance) {
    appInstance = new App();
    await appInstance.initialize();
  }
  return appInstance;
}

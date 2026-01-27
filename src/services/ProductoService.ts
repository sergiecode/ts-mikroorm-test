import { EntityManager } from '@mikro-orm/core';
import { Producto } from '../entities/Producto';

export class ProductoService {
  constructor(private em: EntityManager) {}

  async listarProductos(): Promise<Producto[]> {
    return this.em.find(Producto, {});
  }

  async obtenerProducto(id: number): Promise<Producto | null> {
    return this.em.findOne(Producto, { id });
  }

  async agregarProducto(nombre: string, precio: number): Promise<Producto> {
    const producto = this.em.create(Producto, { nombre, precio });
    await this.em.persistAndFlush(producto);
    return producto;
  }

  async modificarProducto(id: number, nombre?: string, precio?: number): Promise<Producto | null> {
    const producto = await this.em.findOne(Producto, { id });
    if (!producto) return null;

    if (nombre) producto.nombre = nombre;
    if (precio !== undefined) producto.precio = precio;

    await this.em.flush();
    return producto;
  }

  async eliminarProducto(id: number): Promise<boolean> {
    const producto = await this.em.findOne(Producto, { id });
    if (!producto) return false;

    await this.em.removeAndFlush(producto);
    return true;
  }
}

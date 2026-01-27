import { EntityManager } from '@mikro-orm/core';
import { Compra } from '../entities/Compra';
import { Cliente } from '../entities/Cliente';
import { Producto } from '../entities/Producto';

export class CompraService {
  constructor(private em: EntityManager) {}

  async registrarCompra(clienteId: number, productoId: number, cantidad: number): Promise<Compra | null> {
    const cliente = await this.em.findOne(Cliente, { id: clienteId });
    const producto = await this.em.findOne(Producto, { id: productoId });

    if (!cliente || !producto) return null;

    const compra = this.em.create(Compra, {
      cliente,
      producto,
      cantidad,
      fecha: new Date(),
    });

    await this.em.persistAndFlush(compra);
    return compra;
  }

  async listarCompras(): Promise<Compra[]> {
    return this.em.find(Compra, {}, { populate: ['cliente', 'producto'] });
  }

  async obtenerComprasPorCliente(clienteId: number): Promise<Compra[]> {
    return this.em.find(Compra, { cliente: clienteId }, { populate: ['producto'] });
  }

  async obtenerComprasPorProducto(productoId: number): Promise<Compra[]> {
    return this.em.find(Compra, { producto: productoId }, { populate: ['cliente'] });
  }

  async eliminarCompra(id: number): Promise<boolean> {
    const compra = await this.em.findOne(Compra, { id });
    if (!compra) return false;

    await this.em.removeAndFlush(compra);
    return true;
  }
}

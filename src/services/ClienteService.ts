import { MikroORM, EntityManager } from '@mikro-orm/core';
import { Cliente } from '../entities/Cliente';

export class ClienteService {
  constructor(private em: EntityManager) {}

  async listarClientes(): Promise<Cliente[]> {
    return this.em.find(Cliente, {});
  }

  async obtenerCliente(id: number): Promise<Cliente | null> {
    return this.em.findOne(Cliente, { id });
  }

  async agregarCliente(nombre: string, email: string): Promise<Cliente> {
    const cliente = this.em.create(Cliente, { nombre, email });
    await this.em.persistAndFlush(cliente);
    return cliente;
  }

  async modificarCliente(id: number, nombre?: string, email?: string): Promise<Cliente | null> {
    const cliente = await this.em.findOne(Cliente, { id });
    if (!cliente) return null;

    if (nombre) cliente.nombre = nombre;
    if (email) cliente.email = email;

    await this.em.flush();
    return cliente;
  }

  async eliminarCliente(id: number): Promise<boolean> {
    const cliente = await this.em.findOne(Cliente, { id });
    if (!cliente) return false;

    await this.em.removeAndFlush(cliente);
    return true;
  }
}

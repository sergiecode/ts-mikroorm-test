import { Entity, PrimaryKey, Property, OneToMany, Collection } from '@mikro-orm/core';
import { Compra } from './Compra';

@Entity()
export class Producto {
  @PrimaryKey()
  id!: number;

  @Property()
  nombre!: string;

  @Property()
  precio!: number;

  @OneToMany(() => Compra, compra => compra.producto)
  compras = new Collection<Compra>(this);
}

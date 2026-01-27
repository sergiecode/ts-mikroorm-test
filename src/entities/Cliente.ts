import { Entity, PrimaryKey, Property, OneToMany, Collection } from '@mikro-orm/core';
import { Compra } from './Compra';

@Entity()
export class Cliente {
  @PrimaryKey()
  id!: number;

  @Property()
  nombre!: string;

  @Property()
  email!: string;

  @OneToMany(() => Compra, compra => compra.cliente)
  compras = new Collection<Compra>(this);
}

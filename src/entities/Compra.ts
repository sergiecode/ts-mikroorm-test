import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { Cliente } from './Cliente';
import { Producto } from './Producto';

@Entity()
export class Compra {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Cliente)
  cliente!: Cliente;

  @ManyToOne(() => Producto)
  producto!: Producto;

  @Property()
  cantidad!: number;

  @Property()
  fecha!: Date;
}

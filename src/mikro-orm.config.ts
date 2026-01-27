/**
 * Configuración de MikroORM para SQLite
 * 
 * Autor: Sergie Code (@sergiecode)
 * Proyecto educativo de TypeScript + MikroORM + SQLite
 */

import { Options } from '@mikro-orm/core';
import { SqliteDriver } from '@mikro-orm/sqlite';
import { Cliente } from './entities/Cliente';
import { Producto } from './entities/Producto';
import { Compra } from './entities/Compra';

const config: Options = {
  driver: SqliteDriver,
  dbName: './database.sqlite',
  entities: [Cliente, Producto, Compra],
  debug: true,
};

export default config;

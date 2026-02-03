# Sistema de Gestión con TypeScript + MikroORM + SQLite

Aplicación fullstack integrada que permite gestionar clientes, productos y compras utilizando TypeScript, MikroORM y SQLite, todo dentro del mismo proyecto sin usar API REST.

## 🚀 Características

- ✅ **TypeScript** - Tipado estático y código robusto
- ✅ **MikroORM** - ORM moderno para TypeScript/JavaScript
- ✅ **SQLite** - Base de datos embebida y liviana
- ✅ **Arquitectura integrada** - Backend y frontend en el mismo proceso
- ✅ **Sin API REST** - Comunicación directa interna entre capas
- ✅ **CRUD completo** - Crear, Leer, Actualizar y Eliminar
- ✅ **Relaciones** - Entidades relacionadas con decoradores MikroORM
- ✅ **Separación de responsabilidades** - HTML, CSS y JS en archivos separados

## 📁 Estructura del Proyecto

```
orm-test/
├── src/
│   ├── entities/          # Entidades de MikroORM
│   │   ├── Cliente.ts
│   │   ├── Producto.ts
│   │   └── Compra.ts
│   ├── services/          # Servicios CRUD
│   │   ├── ClienteService.ts
│   │   ├── ProductoService.ts
│   │   └── CompraService.ts
│   ├── mikro-orm.config.ts
│   ├── app.ts            # Instancia de la aplicación
│   ├── server.ts         # Servidor integrado
│   ├── index.ts          # Script de demostración
│   └── init.ts           # Script de inicialización
├── public/
│   ├── index.html        # Interfaz de usuario
│   ├── styles.css        # Estilos
│   └── app.js           # Lógica del frontend
├── dist/                 # Código compilado
├── database.sqlite       # Base de datos SQLite
├── package.json
└── tsconfig.json
```

## 🔧 Instalación

1. Clonar el repositorio
2. Instalar dependencias:
```bash
npm install
```

## 📝 Scripts Disponibles

### Comandos principales
- `npm start` - Compila y levanta el servidor (⭐ recomendado)
- `npm run server` - Solo levanta el servidor (ya compilado)
- `npm run init` - Compila e inicializa la BD con datos de ejemplo
- `npm run init:db` - Solo inicializa BD (ya compilado)

### Comandos de desarrollo
- `npm run dev` - Compila y arranca servidor
- `npm run build` - Solo compila TypeScript
- `npm run clean` - Limpia carpeta dist
- `npm run rebuild` - Limpia y compila
- `npm run full-start` - Limpia, compila, inicializa BD y arranca servidor

### Comandos extras
- `npm run demo` - Ejecuta el script de demostración en consola

## 🎯 Uso

### 1. Inicializar la base de datos

Primero, crea las tablas y carga datos de ejemplo:

```bash
npm run init
```

### 2. Iniciar el servidor

```bash
npm start
```

El servidor estará disponible en:
- http://localhost:3000
- http://127.0.0.1:3000

### 3. Usar la aplicación

Una vez en el navegador podrás:
- ✅ **Agregar** clientes y productos
- ✅ **Editar** información existente
- ✅ **Eliminar** registros
- ✅ **Registrar compras** relacionando clientes con productos
- ✅ **Ver todas las operaciones** reflejadas en SQLite en tiempo real

## 🗄️ Entidades

### Cliente
- `id` - Identificador único (autoincremental)
- `nombre` - Nombre del cliente
- `email` - Email del cliente
- `compras` - Relación OneToMany con Compra

### Producto
- `id` - Identificador único (autoincremental)
- `nombre` - Nombre del producto
- `precio` - Precio del producto
- `compras` - Relación OneToMany con Compra

### Compra
- `id` - Identificador único (autoincremental)
- `cliente` - Relación ManyToOne con Cliente
- `producto` - Relación ManyToOne con Producto
- `cantidad` - Cantidad de productos comprados
- `fecha` - Fecha de la compra

## 🛠️ Tecnologías Utilizadas

- **TypeScript** v5.3.3 - Lenguaje de programación
- **MikroORM** v5.9.0 - ORM para TypeScript/JavaScript
- **SQLite** - Base de datos embebida
- **Node.js** - Entorno de ejecución
- **HTML5** - Estructura del frontend
- **CSS3** - Estilos
- **JavaScript** - Lógica del cliente

## 📚 Arquitectura

Este proyecto implementa una arquitectura integrada donde:

1. El **servidor Node.js** genera HTML dinámicamente
2. Los **servicios** son invocados directamente en el servidor
3. **MikroORM** maneja todas las operaciones de base de datos
4. **No hay API REST** - toda la comunicación es interna
5. El frontend envía acciones al servidor que ejecuta los servicios directamente

## 🔄 Flujo de Operaciones

```
Usuario → Frontend (HTML/JS) → Servidor (Node.js) → Servicios → MikroORM → SQLite
```

Todas las capas se ejecutan en el mismo proceso, garantizando:
- Mayor rendimiento
- Menor latencia
- Simplicidad en el código
- Facilidad de debugging

## 📖 Referencias

- [MikroORM Documentation](https://mikro-orm.io/docs/quick-start)
- [MikroORM GitHub](https://github.com/mikro-orm/mikro-orm)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 👨‍💻 Autor

**Sergie Code**

Software Engineer especializado en Frontend y Tech Lead con experiencia en empresas americanas. Creador de contenido educativo en múltiples plataformas, compartiendo conocimientos sobre programación, desarrollo web e Inteligencia Artificial.

### Experiencia
- 💼 Tech Lead en importante empresa americana de seguros
- 👨‍🏫 Instructor en UTN, Codo a Codo y Argentina Programa 4.0
- 🎓 Docente en Digital House (Certified Tech Developer)
- 📚 Creador de cursos de HTML, CSS, JavaScript, React y Python
- 🎤 Speaker en eventos tecnológicos (ADA13, Fingurú, SAIA)

### Formación
- Ingeniería Electrónica - UNC (Universidad Nacional de Córdoba)
- Java Developer Engineer - Educación IT
- Múltiples especializaciones en Frameworks y tecnologías

### Redes Sociales

📸 [Instagram](https://www.instagram.com/sergiecode) - Tips y contenido diario
🧑🏼‍💻 [LinkedIn](https://www.linkedin.com/in/sergiecode/) - Networking profesional
📽️ [YouTube](https://www.youtube.com/@SergieCode) - Cursos gratuitos y tutoriales
😺 [GitHub](https://github.com/sergiecode) - Proyectos y código
👤 [Facebook](https://www.facebook.com/sergiecodeok) - Comunidad
🎞️ [TikTok](https://www.tiktok.com/@sergiecode) - Contenido rápido
🕊️ [Twitter](https://twitter.com/sergiecode) - Actualizaciones
🧵 [Threads](https://www.threads.net/@sergiecode) - Conversaciones

---

## 🤝 Contribuciones

Este proyecto es de código abierto y las contribuciones son bienvenidas. Si encuentras algún bug o tienes sugerencias de mejora, no dudes en abrir un issue o enviar un pull request.

---

⭐ Si este proyecto te fue útil, no olvides darle una estrella en GitHub y seguir a [@sergiecode](https://www.instagram.com/sergiecode) para más contenido educativo sobre programación.


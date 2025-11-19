# Trabajo Práctico Final - API Node.js

**Equipo de Desarrollo:**
- Lucas Evangelista
- Macarena Chang
- Manuel Akman
- Gino Tubaro

**Fecha**: 8 de Noviembre 2025  
**Curso**: Analista de Sistemas

## 📋 Descripción

Este trabajo práctico busca que los estudiantes puedan aplicarse como desarrolladores de software. A diferencia de los anteriores, donde la consigna estaba completamente definida, este proyecto invita a desarrollar un **proyecto propio**, incluyendo la propuesta, el diseño y la implementación del mismo. Durante todo el proceso, se contará con el acompañamiento docente.

API REST desarrollada en Node.js que implementa un sistema completo de gestión de usuarios, personajes y batallas con autenticación JWT, operaciones CRUD completas, módulos estadísticos y sistema de combate. Incluye documentación interactiva con Scalar (OpenAPI 3.0), rate limiting, y persistencia en Supabase (PostgreSQL).

---

## 🎯 Objetivos

* Integrar en un único trabajo todos los conocimientos adquiridos a lo largo de las materias de programación cursadas y en curso.
* Adquirir un mayor entendimiento de las metodologías de trabajo aplicadas en la elaboración de software, incluyendo:
  * Análisis del proyecto.
  * Definición del alcance del proyecto.
  * Planificación del proyecto.
  * Presentación oral de informes de avance.
  * Entrega semanal de un ejecutable con un incremento visible y comprobable de sus funcionalidades, libre de errores.

---

## ✅ Requisitos Mínimos del Proyecto

* **Arquitectura Cliente/Servidor:** dentro de la materia, solo se evaluará el lado del servidor.
* **Servidor desarrollado en Node.js**, utilizando las técnicas vistas durante el curso y las funcionalidades de ES6+ (let/const, promesas, async/await, entre otras).
* **Capa de persistencia:** utilización de una base de datos de libre elección y correcta modularización del código.
* **Persistencia de variables de configuración:** mediante archivos o variables de entorno.
* **Implementación de al menos dos casos de uso de moderada o alta complejidad:**
  * Las operaciones CRUD básicas **no** serán consideradas de alta complejidad.
  * Se consideran de complejidad moderada o alta aquellas funcionalidades que transforman la información del sistema para generar nueva información (por ejemplo, módulos estadísticos, importadores/exportadores de datos, generación de reportes, cálculos de indicadores, etc.).
* **Cobertura de pruebas:**
  * Pruebas unitarias para los casos felices.
  * Al menos una prueba para casos no felices.
* **Documentación del sistema:**
  * Descripción de la funcionalidad desarrollada.
  * Detalle de los puntos de acceso al servidor (endpoints) y su comportamiento esperado.

---

## 📚 Documentación de Endpoints

El proyecto incluye documentación formal de la API utilizando **Scalar**, una herramienta moderna que permite definir y visualizar especificaciones OpenAPI 3.0 de manera interactiva.

### ✅ Documentación Interactiva con Scalar

La documentación está **completamente implementada** y disponible en tiempo de ejecución a través del endpoint `/api/docs`.

#### 🚀 Cómo acceder a la documentación

1. **Inicia el servidor:**
   ```bash
   npm run dev
   # o
   npm start
   ```

2. **Abre tu navegador y visita:**
   ```
   http://localhost:3003/api/docs
   ```

3. **Explora la API:**
   - Navega por todos los endpoints disponibles
   - Visualiza los esquemas de datos (modelos)
   - Prueba los endpoints directamente desde la interfaz
   - Consulta ejemplos de request y response
   - Revisa los códigos de estado HTTP posibles
   - Verifica los requisitos de autenticación

#### 📋 Características de la documentación

La documentación incluye:

* ✅ **Descripción de cada endpoint** con su propósito y método HTTP
* ✅ **Ejemplos de request y response** para cada operación
* ✅ **Modelos de datos esperados** (schemas de Usuario, Character, etc.)
* ✅ **Posibles respuestas de error** y sus códigos asociados
* ✅ **Requerimientos de autenticación** documentados (Bearer JWT)
* ✅ **Especificación OpenAPI 3.0** completa y actualizada
* ✅ **Interfaz visual interactiva** para explorar y probar endpoints

#### 🔧 Endpoints de documentación

- **`GET /api/docs`** - Interfaz visual de Scalar (documentación interactiva)
- **`GET /api/openapi.json`** - Especificación OpenAPI 3.0 en formato JSON

#### 🎨 Tema de Scalar

La documentación utiliza el tema **"purple"** de Scalar, proporcionando una interfaz moderna y fácil de usar.

> **Nota:** La documentación se genera automáticamente desde los comentarios JSDoc en los archivos de rutas (`src/routes/*.js`) y se actualiza dinámicamente cuando el servidor está en ejecución.

---

## 🔒 Capa de Seguridad

El sistema deberá implementar una capa de seguridad que contemple:

1. **Autenticación de usuarios:**
   Mediante credenciales (usuario y contraseña) almacenadas de forma segura. Las contraseñas deberán ser cifradas antes de su persistencia.

2. **Autorización con JWT (JSON Web Tokens):**
   Una vez autenticado el usuario, se deberá generar un token de acceso (de corta duración) que habilite el consumo de los endpoints protegidos.
   Se recomienda incluir también un token de renovación (refresh token) para extender sesiones de forma controlada.

3. **Roles y permisos:**
   En caso de que el proyecto lo requiera, deberán contemplarse diferentes roles de usuario (por ejemplo: administrador, operador, cliente), con accesos diferenciados a los recursos del sistema.

4. **Buenas prácticas de seguridad:**
   * Manejo adecuado de variables sensibles mediante variables de entorno.
   * Implementación de cabeceras de seguridad (por ejemplo, con Helmet).
   * Control de solicitudes mediante limitación de tasa (rate limiting).
   * Validación estricta de datos de entrada y respuesta de errores controlados.
   * Mecanismos de bloqueo o alerta frente a intentos reiterados de acceso no autorizado.

La autenticación y autorización serán parte fundamental del proyecto y deberán estar correctamente documentadas dentro de los endpoints.

> **Estado actual:** ✅ **Implementado:** Autenticación JWT, encriptación de contraseñas con bcryptjs, variables de entorno, rate limiting (express-rate-limit). ⏳ **Pendiente:** Refresh tokens, roles y permisos, Helmet (cabeceras de seguridad).

---

## 🚀 Despliegue del Proyecto

El proyecto deberá realizarse en algunas plataformas tales como:

### Opciones de despliegue

1. **Google Cloud Run:**
   Se recomienda esta opción por su integración directa con contenedores Docker y su escalabilidad automática.
   * El pipeline deberá compilar la imagen del contenedor, subirla a un registro (Container Registry o Artifact Registry) y desplegarla en un servicio de Cloud Run.
   * El proyecto deberá definir las variables de entorno necesarias para la ejecución en producción.

2. **Render:**
   Como alternativa, se podrá utilizar Render para automatizar el despliegue del servidor.
   * El pipeline podrá utilizar la API de Render para generar nuevas versiones del servicio tras cada push en la rama principal.
   * También deberá asegurarse el manejo de variables de entorno y secretos desde el panel de Render o GitHub Secrets.

El objetivo de este punto es que el proyecto cuente con un flujo de entrega continuo y verificable, asegurando que las actualizaciones lleguen a producción de manera controlada.

> **Estado actual:** Pendiente: Configuración de pipeline CI/CD y despliegue en Cloud Run o Render.

---

## 👥 Modalidad de Trabajo

* El trabajo será **grupal**, con un máximo de cuatro integrantes por grupo.
* La temática será definida íntegramente por los estudiantes.
* Se realizará una sesión de **brainstorming** con docentes y alumnos para delimitar el alcance del proyecto.
* **Presentaciones semanales:**
  * Demostración funcional.
  * Estado de avance.
  * Actualización de documentación.
  * Entrega de una versión funcional libre de errores visibles.
* No se aceptarán entregas por correo electrónico, se deberá realizar por medio del moodle de la **ORT**.
* El orden de presentaciones será acordado previamente con los docentes.

---

## 📦 Entrega Final

* Repositorio disponible en **GitHub**, **GitLab** o **Bitbucket**.
* Contar con:
  * Documentación actualizada de endpoints.
  * Capa de autenticación y autorización funcional.
  * Módulos de mediana o alta complejidad implementados.
  * Pruebas unitarias y al menos una de error.
  * Pipeline de CI/CD funcional y documentado.
  * Despliegue accesible para revisión por parte del equipo docente.

---

## 📊 Estado del Proyecto

### ✅ Implementado

* ✅ Servidor Node.js con Express.js
* ✅ Arquitectura modular (controllers, services, routes, middleware, models)
* ✅ Autenticación JWT
* ✅ Encriptación de contraseñas con bcryptjs
* ✅ Base de datos Supabase (PostgreSQL)
* ✅ Operaciones CRUD completas de usuarios (Supabase)
* ✅ Operaciones CRUD completas de characters/personajes (Supabase)
* ✅ Relación uno a muchos: Usuario → Characters
* ✅ Foreign keys y CASCADE en base de datos
* ✅ Endpoint de productos (lectura desde JSON)
* ✅ Endpoint de usuarios externos (consumo de API externa y almacenamiento en CSV)
* ✅ Variables de entorno para configuración
* ✅ Validaciones básicas de datos
* ✅ Manejo de errores con códigos HTTP apropiados
* ✅ Documentación interactiva con Scalar (OpenAPI 3.0) en `/api/docs`
* ✅ Documentación completa de endpoints en README
* ✅ Linting y formateo con Biome
* ✅ Tests HTTP (archivos .http) - Pruebas de casos felices y no felices
* ✅ Rate limiting implementado (express-rate-limit)
* ✅ Sistema de batallas entre personajes (módulo de alta complejidad)
* ✅ Módulo de estadísticas y leaderboards (módulo de alta complejidad)
* ✅ Pruebas completas (casos felices y no felices) mediante archivos .http

### 🚧 En Progreso / Pendiente


---

## 🚀 Instalación

### Prerrequisitos
- Node.js >= 14.0.0
- npm >= 6.0.0

### Instalación de dependencias
```bash
npm install
```

### Configuración de variables de entorno
```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar variables según necesidades
nano .env
```

### Ejecutar en desarrollo
```bash
npm run dev
```

### Linteo y otros comandos:
```bash
npm run lint 
npm run format
```

### Ejecutar en producción
```bash
npm start
```

## 🛠️ Tecnologías Utilizadas

### Backend y Framework
- **Express.js** - Framework web para Node.js
- **Node.js** - Entorno de ejecución JavaScript (ES6+)

### Base de Datos
- **Supabase** - Base de datos PostgreSQL en la nube
- **@supabase/supabase-js** - Cliente oficial de Supabase para Node.js

### Seguridad y Autenticación
- **jsonwebtoken** - Generación y verificación de tokens JWT
- **bcryptjs** - Encriptación de contraseñas con hash seguro
- **express-rate-limit** - Control de tasa de solicitudes (rate limiting)

### Documentación
- **@scalar/express-api-reference** - Interfaz visual moderna para documentación OpenAPI
- **swagger-jsdoc** - Generación de especificación OpenAPI desde comentarios JSDoc

### Utilidades
- **Morgan** - Middleware de logging HTTP
- **CORS** - Configuración de Cross-Origin Resource Sharing
- **dotenv** - Manejo de variables de entorno
- **UUID** - Generación de IDs únicos (manejado por Supabase)
- **Biome** - Linting y formateo de código (ESLint + Prettier alternativo)

### Desarrollo
- **Nodemon** - Reinicio automático del servidor en desarrollo

## 📁 Estructura del Proyecto

### Estructura Sugerida

```
📁 tp2-proyecto-final
│── 📂 src
│   ├── 📂 controllers     # Controladores de la lógica de negocio
│   ├── 📂 routes          # Definición de rutas del servidor
│   ├── 📂 models          # Modelos de datos y esquemas de la base de datos
│   ├── 📂 services        # Servicios que interactúan con la capa de datos
│   ├── 📂 repositories    # Capa de acceso a datos y consultas
│   ├── 📂 config          # Archivos de configuración (variables de entorno, conexión)
│   ├── 📂 middlewares     # Middlewares de seguridad y validaciones
│   ├── 📂 tests           # Pruebas unitarias y de integración
│   ├── server.js          # Punto de entrada del servidor
│── 📂 docs                # Documentación del proyecto y especificación OpenAPI
│── 📂 public              # Archivos estáticos o frontend si aplica
│── .env                   # Variables de entorno
│── package.json           # Dependencias y scripts
│── README.md              # Instrucciones de instalación, uso y despliegue
```

### Estructura Actual del Proyecto

```
ORT-TP2-ProyectoFinal/
├── src/
│   ├── app.js                    # Punto de entrada del servidor
│   ├── controllers/              # Controladores de la lógica de negocio
│   │   ├── authController.js     # Controlador de autenticación
│   │   ├── usuariosController.js # Controlador de usuarios
│   │   ├── charactersController.js # Controlador de personajes
│   │   ├── battlesController.js  # Controlador de batallas
│   │   └── statisticsController.js # Controlador de estadísticas
│   ├── services/                 # Servicios con lógica de negocio
│   │   ├── authService.js        # Servicio de autenticación
│   │   ├── usuariosService.js    # Servicio de usuarios
│   │   ├── charactersService.js  # Servicio de personajes
│   │   ├── battlesService.js     # Servicio de batallas (alta complejidad)
│   │   └── statisticsService.js  # Servicio de estadísticas (alta complejidad)
│   ├── routes/                   # Definición de rutas del servidor
│   │   ├── authRoutes.js         # Rutas de autenticación
│   │   ├── usuariosRoutes.js     # Rutas de usuarios
│   │   ├── charactersRoutes.js  # Rutas de personajes
│   │   ├── battlesRoutes.js      # Rutas de batallas
│   │   └── statisticsRoutes.js   # Rutas de estadísticas
│   ├── middleware/               # Middlewares de seguridad y validaciones
│   │   ├── authMiddleware.js     # Middleware de autenticación JWT
│   │   └── notFoundHandler.js    # Manejo de rutas no encontradas
│   ├── models/                   # Modelos de datos
│   │   └── characterModel.js     # Modelo de personaje
│   ├── config/                   # Archivos de configuración
│   │   ├── config.js             # Configuración general
│   │   └── swagger.js            # Configuración de Swagger/OpenAPI
│   ├── database/                 # Conexión a base de datos
│   │   └── supabase.cnx.js       # Cliente de Supabase
│   ├── dto/                      # Data Transfer Objects (DTOs)
│   └── sql/                      # Scripts SQL
│       └── init_db.sql           # Script de inicialización de BD
├── tests/                        # Archivos de prueba HTTP
│   ├── auth.http                 # Tests de autenticación
│   ├── usuarios-crud.http        # Tests CRUD de usuarios
│   ├── characters.http           # Tests de personajes
│   ├── battles.http              # Tests de batallas
│   └── statistics.http           # Tests de estadísticas
├── .env                          # Variables de entorno (no versionado)
├── package.json                  # Dependencias y scripts
├── biome.json                    # Configuración de Biome
└── README.md                     # Este archivo
```

## 🔗 Endpoints de la API

### Base URL
```
http://localhost:3003
```

### 📖 Documentación Interactiva

**Accede a la documentación completa y proba los endpoints directamente:**
- 🌐 **Interfaz Scalar:** http://localhost:3003/api/docs
- 📄 **OpenAPI JSON:** http://localhost:3003/api/openapi.json

---

## 🎮 Módulos de Alta Complejidad

El proyecto incluye dos módulos de moderada/alta complejidad que van más allá de las operaciones CRUD básicas:

### 1. 🗡️ Sistema de Batallas (`/api/battle`)

Sistema completo de combate entre personajes que incluye:
- **Cálculos complejos de daño** basados en estadísticas de personajes
- **Sistema de ventajas de raza** (bonificadores según combinaciones)
- **Mecánica de dados aleatorios** (1-16) para determinar ataques
- **Actualización automática de niveles y HP** del ganador
- **Persistencia de resultados** en base de datos
- **Validaciones de estado** (personajes online, HP mínimo, etc.)

**Endpoints:**
- `POST /api/battle/:retadorId/:retadoId` - Iniciar batalla entre dos personajes
- `GET /api/battle/last/:characterId` - Obtener última batalla de un personaje

### 2. 📊 Módulo de Estadísticas (`/api/statistics`)

Sistema de análisis y reportes que transforma datos del sistema:
- **Agregaciones complejas** de usuarios, personajes y batallas
- **Leaderboards** de usuarios con más batallas (top 10)
- **Análisis de popularidad** de razas y clases
- **Métricas del sistema** (totales, promedios, distribuciones)
- **Cálculos de indicadores** basados en múltiples tablas relacionadas

**Endpoints:**
- `GET /api/statistics` - Estadísticas públicas del sistema
- `GET /api/statistics/top-users` - Top usuarios por batallas

---

---

## 📦 **ENDPOINT 1: Productos**

### GET /api/productos
Obtiene todos los productos desde archivo JSON local.

**Respuesta exitosa (200):**
```json
{
  "status": 200,
  "data": [
    {
      "id": 1,
      "nombre": "Laptop Gaming",
      "precio": 1200,
      "categoria": "Electrónicos",
      "stock": 15
    }
  ],
  "count": 1,
  "message": "Productos obtenidos exitosamente"
}
```

**Error si no existe archivo (404):**
```json
{
  "status": 404,
  "error": "Archivo de productos no encontrado",
  "code": "FILE_NOT_FOUND",
  "message": "No se pudo cargar la información de productos"
}
```

---

## 🌐 **ENDPOINT 2: Usuarios Externos**

### GET /api/usuarios-externos
Consume API externa de videojuegos y almacena datos en CSV.

**Respuesta exitosa (200):**
```json
{
  "status": 200,
  "data": {
    "totalRecords": 16598,
    "headers": ["Name", "Platform", "Year_of_Release", ...],
    "source": "Github del profe fue fetcheado con exito",
    "filePath": "/path/to/data/usuarios.csv"
  },
  "message": "Datos externos obtenidos y almacenados exitosamente"
}
```

**Error en API externa (500):**
```json
{
  "status": 500,
  "error": "Error al consumir API externa",
  "details": "HTTP error! status: 404",
  "message": "No se pudo procesar la información externa"
}
```

---

## 👥 **ENDPOINT 3: CRUD de Usuarios**

> **Base de datos:** Supabase (PostgreSQL)  
> **Persistencia:** Los usuarios se almacenan en la tabla `usuarios` de Supabase

### GET /api/usuarios
Obtiene todos los usuarios almacenados en Supabase.

**Respuesta exitosa (200):**
```json
{
  "status": 200,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "nombre": "Juan Carlos Pérez",
      "email": "juancarlos@example.com",
      "telefono": "123-456-7890",
      "edad": 26,
      "activo": true,
      "fechaCreacion": "2025-01-01",
      "password": null
    }
  ],
  "count": 1,
  "message": "Usuarios obtenidos exitosamente"
}
```

**Error (500):**
```json
{
  "status": 500,
  "error": "Error al obtener usuarios",
  "message": "No se pudo obtener la lista de usuarios"
}
```

---

### GET /api/usuarios/:id
Obtiene un usuario específico por su ID.

**Parámetros:**
- `id` (UUID, requerido): ID único del usuario

**Respuesta exitosa (200):**
```json
{
  "status": 200,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "nombre": "Juan Carlos Pérez",
    "email": "juancarlos@example.com",
    "telefono": "123-456-7890",
    "edad": 26,
    "activo": true,
    "fechaCreacion": "2025-01-01",
    "password": null
  },
  "message": "Usuario encontrado exitosamente"
}
```

**Error usuario no encontrado (404):**
```json
{
  "status": 404,
  "error": "Usuario no encontrado",
  "code": "USER_NOT_FOUND",
  "message": "Usuario con ID 550e8400-e29b-41d4-a716-446655440001 no encontrado"
}
```

---

### POST /api/usuarios
Crea un nuevo usuario en Supabase.

**Body (JSON):**
```json
{
  "nombre": "Usuario Nuevo",
  "email": "nuevo@example.com",
  "telefono": "555-999-8888",
  "edad": 30,
  "activo": true,
  "fechaCreacion": "2025-11-08"
}
```

**Campos:**
- `nombre` (string, requerido): Nombre del usuario
- `email` (string, requerido, único): Email del usuario
- `telefono` (string, opcional): Teléfono del usuario
- `edad` (number, opcional, default: 0): Edad del usuario
- `activo` (boolean, opcional, default: true): Estado activo/inactivo
- `fechaCreacion` (string, opcional): Fecha de creación (formato: YYYY-MM-DD). Si no se proporciona, se usa la fecha actual
- `password` (string, opcional): Contraseña (generalmente se usa el endpoint de auth/register para esto)

**Respuesta exitosa (201):**
```json
{
  "status": 201,
  "data": {
    "id": "996c297f-3f5c-4314-aa50-73084e475a19",
    "nombre": "Usuario Nuevo",
    "email": "nuevo@example.com",
    "telefono": "555-999-8888",
    "edad": 30,
    "activo": true,
    "fechaCreacion": "2025-11-08",
    "password": null
  },
  "message": "Usuario creado exitosamente"
}
```

**Error datos incompletos (400):**
```json
{
  "status": 400,
  "error": "Datos incompletos",
  "message": "Nombre y email son requeridos"
}
```

**Error email duplicado (409):**
```json
{
  "status": 409,
  "error": "El email ya existe",
  "code": "EMAIL_EXISTS",
  "message": "No se pudo crear el usuario"
}
```

---

### PUT /api/usuarios/:id
Actualiza un usuario existente. Permite actualización parcial (solo los campos enviados).

**Parámetros:**
- `id` (UUID, requerido): ID único del usuario

**Body (JSON):**
```json
{
  "nombre": "Usuario Actualizado",
  "email": "actualizado@example.com",
  "telefono": "555-111-2222",
  "edad": 35,
  "activo": false
}
```

**Respuesta exitosa (200):**
```json
{
  "status": 200,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "nombre": "Usuario Actualizado",
    "email": "actualizado@example.com",
    "telefono": "555-111-2222",
    "edad": 35,
    "activo": false,
    "fechaCreacion": "2025-01-01",
    "password": null
  },
  "message": "Usuario actualizado exitosamente"
}
```

**Error usuario no encontrado (404):**
```json
{
  "status": 404,
  "error": "Usuario no encontrado",
  "code": "USER_NOT_FOUND",
  "message": "No se pudo actualizar el usuario"
}
```

**Error email duplicado (409):**
```json
{
  "status": 409,
  "error": "El email ya existe",
  "code": "EMAIL_EXISTS",
  "message": "No se pudo actualizar el usuario"
}
```

---

### DELETE /api/usuarios/:id
Elimina un usuario de Supabase. **Nota:** Si el usuario tiene personajes asociados, estos se eliminarán automáticamente debido a la relación CASCADE.

**Parámetros:**
- `id` (UUID, requerido): ID único del usuario

**Respuesta exitosa (200):**
```json
{
  "status": 200,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "nombre": "Juan Carlos Pérez",
    "email": "juancarlos@example.com",
    "telefono": "123-456-7890",
    "edad": 26,
    "activo": true,
    "fechaCreacion": "2025-01-01",
    "password": null
  },
  "message": "Usuario eliminado exitosamente"
}
```

**Error usuario no encontrado (404):**
```json
{
  "status": 404,
  "error": "Usuario no encontrado",
  "code": "USER_NOT_FOUND",
  "message": "No se pudo eliminar el usuario"
}
```

---

### GET /api/usuarios/:userId/characters
Obtiene todos los personajes de un usuario específico (relación uno a muchos).

**Parámetros:**
- `userId` (UUID, requerido): ID único del usuario

**Respuesta exitosa (200):**
```json
{
  "status": 200,
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "userId": "550e8400-e29b-41d4-a716-446655440001",
      "createdAt": "2025-11-08T10:34:01.918Z",
      "name": "Sherry Becker",
      "avatar": "https://avatars.githubusercontent.com/u/42087344",
      "race": "seagull",
      "class": "Bacon",
      "guild": "Fadel - Murphy",
      "hp": 50,
      "shield": 25,
      "level": 10,
      "isOnline": true,
      "kingdom": "Cape Verde"
    }
  ],
  "count": 1,
  "message": "Personajes del usuario obtenidos exitosamente"
}
```

---

## 🎮 **ENDPOINT 4: CRUD de Characters (Personajes)**

> **Base de datos:** Supabase (PostgreSQL)  
> **Persistencia:** Los personajes se almacenan en la tabla `characters` de Supabase  
> **Relación:** Cada personaje pertenece a un usuario (relación uno a muchos)

### GET /api/characters
Obtiene todos los personajes almacenados en Supabase.

**Respuesta exitosa (200):**
```json
{
  "status": 200,
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "userId": "550e8400-e29b-41d4-a716-446655440001",
      "createdAt": "2025-11-08T10:34:01.918Z",
      "name": "Sherry Becker",
      "avatar": "https://avatars.githubusercontent.com/u/42087344",
      "race": "seagull",
      "class": "Bacon",
      "guild": "Fadel - Murphy",
      "hp": 50,
      "shield": 25,
      "level": 10,
      "isOnline": true,
      "kingdom": "Cape Verde"
    }
  ],
  "count": 1,
  "message": "Personajes obtenidos exitosamente"
}
```

**Error (500):**
```json
{
  "status": 500,
  "error": "Error al obtener personajes",
  "message": "No se pudo obtener la lista de personajes"
}
```

---

### GET /api/characters/:id
Obtiene un personaje específico por su ID.

**Parámetros:**
- `id` (UUID, requerido): ID único del personaje

**Respuesta exitosa (200):**
```json
{
  "status": 200,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "userId": "550e8400-e29b-41d4-a716-446655440001",
    "createdAt": "2025-11-08T10:34:01.918Z",
    "name": "Sherry Becker",
    "avatar": "https://avatars.githubusercontent.com/u/42087344",
    "race": "seagull",
    "class": "Bacon",
    "guild": "Fadel - Murphy",
    "hp": 50,
    "shield": 25,
    "level": 10,
    "isOnline": true,
    "kingdom": "Cape Verde"
  },
  "message": "Personaje encontrado exitosamente"
}
```

**Error personaje no encontrado (404):**
```json
{
  "status": 404,
  "error": "Personaje no encontrado",
  "code": "CHARACTER_NOT_FOUND",
  "message": "Personaje con ID 123e4567-e89b-12d3-a456-426614174000 no encontrado"
}
```

---

### POST /api/characters
Crea un nuevo personaje en Supabase. **Requiere un usuario válido.**

**Body (JSON):**
```json
{
  "userId": "550e8400-e29b-41d4-a716-446655440001",
  "name": "Sherry Becker",
  "avatar": "https://avatars.githubusercontent.com/u/42087344",
  "race": "seagull",
  "class": "Bacon",
  "guild": "Fadel - Murphy",
  "hp": 50,
  "shield": 25,
  "level": 10,
  "isOnline": true,
  "kingdom": "Cape Verde"
}
```

**Campos:**
- `userId` (UUID, requerido): ID del usuario propietario del personaje
- `name` (string, requerido): Nombre del personaje
- `avatar` (string, opcional): URL del avatar del personaje
- `race` (string, opcional): Raza del personaje
- `class` (string, opcional): Clase del personaje
- `guild` (string, opcional): Hermandad/Gremio del personaje
- `hp` (number, opcional, default: 0): Puntos de vida
- `shield` (number, opcional, default: 0): Puntos de escudo
- `level` (number, opcional, default: 1): Nivel del personaje
- `isOnline` (boolean, opcional, default: false): Estado online/offline
- `kingdom` (string, opcional): Reino del personaje

**Respuesta exitosa (201):**
```json
{
  "status": 201,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "userId": "550e8400-e29b-41d4-a716-446655440001",
    "createdAt": "2025-11-08T10:34:01.918Z",
    "name": "Sherry Becker",
    "avatar": "https://avatars.githubusercontent.com/u/42087344",
    "race": "seagull",
    "class": "Bacon",
    "guild": "Fadel - Murphy",
    "hp": 50,
    "shield": 25,
    "level": 10,
    "isOnline": true,
    "kingdom": "Cape Verde"
  },
  "message": "Personaje creado exitosamente"
}
```

**Error datos incompletos (400):**
```json
{
  "status": 400,
  "error": "Datos incompletos",
  "message": "Nombre y userId son requeridos"
}
```

**Error usuario no encontrado (404):**
```json
{
  "status": 404,
  "error": "Usuario no encontrado",
  "code": "USER_NOT_FOUND",
  "message": "No se pudo crear el personaje"
}
```

---

### PUT /api/characters/:id
Actualiza un personaje existente. Permite actualización parcial (solo los campos enviados).

**Parámetros:**
- `id` (UUID, requerido): ID único del personaje

**Body (JSON):**
```json
{
  "name": "Sherry Becker Actualizada",
  "hp": 75,
  "shield": 40,
  "level": 20,
  "isOnline": false,
  "guild": "Fadel - Murphy - Elite"
}
```

**Respuesta exitosa (200):**
```json
{
  "status": 200,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "userId": "550e8400-e29b-41d4-a716-446655440001",
    "createdAt": "2025-11-08T10:34:01.918Z",
    "name": "Sherry Becker Actualizada",
    "avatar": "https://avatars.githubusercontent.com/u/42087344",
    "race": "seagull",
    "class": "Bacon",
    "guild": "Fadel - Murphy - Elite",
    "hp": 75,
    "shield": 40,
    "level": 20,
    "isOnline": false,
    "kingdom": "Cape Verde"
  },
  "message": "Personaje actualizado exitosamente"
}
```

**Error personaje no encontrado (404):**
```json
{
  "status": 404,
  "error": "Personaje no encontrado",
  "code": "CHARACTER_NOT_FOUND",
  "message": "No se pudo actualizar el personaje"
}
```

**Error usuario no encontrado (404):**
```json
{
  "status": 404,
  "error": "Usuario no encontrado",
  "code": "USER_NOT_FOUND",
  "message": "No se pudo actualizar el personaje"
}
```
*Nota: Este error ocurre si intentas cambiar el `userId` a un usuario que no existe.*

---

### DELETE /api/characters/:id
Elimina un personaje de Supabase.

**Parámetros:**
- `id` (UUID, requerido): ID único del personaje

**Respuesta exitosa (200):**
```json
{
  "status": 200,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "userId": "550e8400-e29b-41d4-a716-446655440001",
    "createdAt": "2025-11-08T10:34:01.918Z",
    "name": "Sherry Becker",
    "avatar": "https://avatars.githubusercontent.com/u/42087344",
    "race": "seagull",
    "class": "Bacon",
    "guild": "Fadel - Murphy",
    "hp": 50,
    "shield": 25,
    "level": 10,
    "isOnline": true,
    "kingdom": "Cape Verde"
  },
  "message": "Personaje eliminado exitosamente"
}
```

**Error personaje no encontrado (404):**
```json
{
  "status": 404,
  "error": "Personaje no encontrado",
  "code": "CHARACTER_NOT_FOUND",
  "message": "No se pudo eliminar el personaje"
}
```

---

## ⚔️ **ENDPOINT 5: Sistema de Batallas**

> **Base de datos:** Supabase (PostgreSQL)  
> **Persistencia:** Las batallas se almacenan en la tabla `battles` de Supabase  
> **Autenticación:** Requiere JWT (Bearer token)  
> **Complejidad:** Alta - Incluye cálculos complejos, sistema de ventajas y actualización automática de estados

### POST /api/battle/:retadorId/:retadoId
Inicia una batalla entre dos personajes. El sistema calcula el daño, aplica ventajas de raza, y actualiza automáticamente los niveles y HP del ganador.

**Parámetros:**
- `retadorId` (UUID, requerido): ID del personaje que reta (debe pertenecer al usuario autenticado)
- `retadoId` (UUID, requerido): ID del personaje que es retado

**Headers:**
```
Authorization: Bearer <token>
```

**Requisitos:**
- Ambos personajes deben estar online (`isOnline: true`)
- El personaje retado debe tener HP >= 1
- El personaje retador debe pertenecer al usuario autenticado
- Los personajes deben ser diferentes

**Respuesta exitosa (200):**
```json
{
  "status": 200,
  "data": {
    "batalla": {
      "id_pelea": "uuid-de-la-batalla",
      "id_personaje_retador": "123e4567-e89b-12d3-a456-426614174000",
      "id_personaje_retado": "223e4567-e89b-12d3-a456-426614174001",
      "ganador_id": "123e4567-e89b-12d3-a456-426614174000",
      "ganador_nombre": "Sherry Becker",
      "dado_retador": 12,
      "dado_retado": 8,
      "hp_retador_antes": 100,
      "hp_retador_despues": 75,
      "hp_retado_antes": 80,
      "hp_retado_despues": 0,
      "nivel_ganador_antes": 10,
      "nivel_ganador_despues": 11,
      "hp_ganador_despues": 125,
      "bonus_vida": 50,
      "fecha_pelea": "2025-11-08T10:34:01.918Z"
    },
    "mensaje": "El ganador es: Sherry Becker"
  },
  "message": "Batalla completada exitosamente"
}
```

**Errores posibles:**
- `401` - No autenticado o token inválido
- `400` - Personajes iguales, personaje offline, HP insuficiente
- `404` - Personaje no encontrado
- `403` - El personaje retador no pertenece al usuario autenticado

---

### GET /api/battle/last/:characterId
Obtiene la última batalla en la que participó un personaje (como retador o retado).

**Parámetros:**
- `characterId` (UUID, requerido): ID del personaje

**Headers:**
```
Authorization: Bearer <token>
```

**Respuesta exitosa (200):**
```json
{
  "status": 200,
  "data": {
    "id_pelea": "uuid-de-la-batalla",
    "id_personaje_retador": "123e4567-e89b-12d3-a456-426614174000",
    "id_personaje_retado": "223e4567-e89b-12d3-a456-426614174001",
    "ganador_id": "123e4567-e89b-12d3-a456-426614174000",
    "ganador_nombre": "Sherry Becker",
    "dado_retador": 12,
    "dado_retado": 8,
    "hp_retador_antes": 100,
    "hp_retador_despues": 75,
    "hp_retado_antes": 80,
    "hp_retado_despues": 0,
    "nivel_ganador_antes": 10,
    "nivel_ganador_despues": 11,
    "hp_ganador_despues": 125,
    "bonus_vida": 50,
    "fecha_pelea": "2025-11-08T10:34:01.918Z"
  },
  "message": "Última batalla obtenida exitosamente"
}
```

**Error personaje no encontrado (404):**
```json
{
  "status": 404,
  "error": "Personaje no encontrado",
  "code": "CHARACTER_NOT_FOUND",
  "message": "No se encontró el personaje"
}
```

**Error sin batallas (404):**
```json
{
  "status": 404,
  "error": "No se encontraron batallas",
  "code": "NO_BATTLES_FOUND",
  "message": "El personaje no ha participado en ninguna batalla"
}
```

---

## 📊 **ENDPOINT 6: Estadísticas del Sistema**

> **Base de datos:** Supabase (PostgreSQL)  
> **Autenticación:** No requerida (endpoints públicos)  
> **Complejidad:** Alta - Incluye agregaciones complejas, cálculos de indicadores y análisis de datos

### GET /api/statistics
Obtiene estadísticas públicas del sistema, incluyendo totales, leaderboards y análisis de popularidad.

**Respuesta exitosa (200):**
```json
{
  "status": 200,
  "data": {
    "totales": {
      "usuarios": 150,
      "personajes": 320,
      "batallas": 1250
    },
    "leaderboardUsuarios": [
      {
        "usuarioId": "550e8400-e29b-41d4-a716-446655440001",
        "nombre": "Juan Pérez",
        "email": "juan@example.com",
        "totalBatallas": 45
      },
      {
        "usuarioId": "660e8400-e29b-41d4-a716-446655440002",
        "nombre": "María García",
        "email": "maria@example.com",
        "totalBatallas": 38
      }
    ],
    "razasPopulares": [
      { "raza": "human", "cantidad": 120 },
      { "raza": "elf", "cantidad": 85 },
      { "raza": "dwarf", "cantidad": 65 }
    ],
    "clasesPopulares": [
      { "clase": "Warrior", "cantidad": 95 },
      { "clase": "Mage", "cantidad": 78 },
      { "clase": "Rogue", "cantidad": 62 }
    ],
    "personajesOnline": 45,
    "personajesOffline": 275
  },
  "message": "Estadísticas obtenidas exitosamente"
}
```

---

### GET /api/statistics/top-users
Obtiene el top 10 de usuarios con más batallas.

**Respuesta exitosa (200):**
```json
{
  "status": 200,
  "data": [
    {
      "usuarioId": "550e8400-e29b-41d4-a716-446655440001",
      "nombre": "Juan Pérez",
      "email": "juan@example.com",
      "totalBatallas": 45
    },
    {
      "usuarioId": "660e8400-e29b-41d4-a716-446655440002",
      "nombre": "María García",
      "email": "maria@example.com",
      "totalBatallas": 38
    }
  ],
  "message": "Top usuarios obtenidos exitosamente"
}
```

---

## 🔐 **AUTENTICACIÓN Y AUTORIZACIÓN JWT**

El sistema implementa autenticación mediante JWT (JSON Web Tokens) con las siguientes características:

- ✅ **Encriptación de contraseñas** con bcryptjs (saltRounds: 10)
- ✅ **Tokens de acceso** con expiración configurable (default: 1h)
- ✅ **Rate limiting** en endpoints de autenticación (20 requests/30min)
- ✅ **Validación de usuarios activos** antes de permitir login
- ✅ **Actualización automática de estado** de personajes al login/logout

### 🔑 Endpoints de Autenticación

### POST /api/auth/register
Registra un nuevo usuario con contraseña encriptada.

**Body:**
```json
{
  "nombre": "Usuario Demo",
  "email": "demo@example.com",
  "password": "123456",
  "telefono": "555-0000",
  "edad": 30
}
```

**Respuesta (201):**
```json
{
  "status": 201,
  "data": {
    "user": {
      "id": "d37eab7c-3cff-47d3-bba0-e83e6fc80fa7",
      "nombre": "Usuario Demo",
      "email": "demo@example.com",
      "telefono": "555-0000",
      "edad": 30,
      "activo": true,
      "fechaCreacion": "2025-10-09"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Usuario registrado exitosamente"
}
```

### POST /api/auth/login
Inicia sesión y obtiene token JWT.

**Body:**
```json
{
  "email": "demo@example.com",
  "password": "123456"
}
```

**Respuesta (200):**
```json
{
  "status": 200,
  "data": {
    "user": {
      "id": "d37eab7c-3cff-47d3-bba0-e83e6fc80fa7",
      "nombre": "Usuario Demo",
      "email": "demo@example.com",
      "telefono": "555-0000",
      "edad": 30,
      "activo": true,
      "fechaCreacion": "2025-10-09"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Login exitoso"
}
```

### GET /api/auth/profile
Obtiene el perfil del usuario autenticado. **Requiere autenticación JWT.**

**Headers:**
```
Authorization: Bearer <token>
```

**Respuesta exitosa (200):**
```json
{
  "status": 200,
  "data": {
    "userId": "d37eab7c-3cff-47d3-bba0-e83e6fc80fa7",
    "email": "demo@example.com",
    "nombre": "Usuario Demo",
    "iat": 1759972284,
    "exp": 1759975884
  },
  "message": "Perfil obtenido exitosamente"
}
```

**Error sin token (401):**
```json
{
  "status": 401,
  "error": "Token de acceso requerido",
  "message": "Debe proporcionar un token de autorización"
}
```

**Error token inválido (401):**
```json
{
  "status": 401,
  "error": "Token inválido",
  "message": "Token inválido o expirado"
}
```

### 🔒 Protección de Endpoints

Los siguientes endpoints requieren autenticación JWT (header `Authorization: Bearer <token>`):

- `GET /api/auth/profile` - Perfil del usuario
- `POST /api/battle/:retadorId/:retadoId` - Iniciar batalla
- `GET /api/battle/last/:characterId` - Última batalla
- `POST /api/characters` - Crear personaje
- `PUT /api/characters/:id` - Actualizar personaje
- `DELETE /api/characters/:id` - Eliminar personaje
- `PATCH /api/characters/:id` - Actualización parcial de personaje

---

## 🧪 **Pruebas**

### ✅ Pruebas Implementadas

El proyecto incluye pruebas completas mediante archivos `.http` que cubren:

* ✅ **Pruebas de casos felices:** Verificación de todas las funcionalidades principales funcionando correctamente.
* ✅ **Pruebas de casos no felices:** Validación del manejo de errores y casos límite (errores 400, 401, 404, 409, 500).

**Archivos de prueba disponibles:**
- `tests/auth.http` - Pruebas de autenticación (registro, login, perfil, casos de error)
- `tests/usuarios-crud.http` - Pruebas CRUD de usuarios (casos felices y errores)
- `tests/characters.http` - Pruebas CRUD de personajes
- `tests/battles.http` - Pruebas del sistema de batallas
- `tests/statistics.http` - Pruebas del módulo de estadísticas

> **Estado:** ✅ **Completado** - Todas las pruebas están implementadas y funcionando mediante archivos `.http` que cubren casos felices y no felices.

### Pruebas Manuales con RestClient (VS Code)

1. Instala la extensión "REST Client"
2. Abre los archivos `.http` en la carpeta `tests/`
3. Haz clic en "Send Request"

### Usando cURL

**Registro:**
```bash
curl -X POST http://localhost:3003/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Usuario Demo","email":"demo@example.com","password":"123456"}'
```

**Login:**
```bash
curl -X POST http://localhost:3003/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","password":"123456"}'
```

**Perfil protegido:**
```bash
curl -X GET http://localhost:3003/api/auth/profile \
  -H "Authorization: Bearer <tu-token-jwt>"
```

---

## 📊 **Códigos de Estado HTTP**

- **200**: OK - Operación exitosa
- **201**: Created - Recurso creado exitosamente
- **400**: Bad Request - Datos inválidos
- **401**: Unauthorized - Token requerido/inválido
- **403**: Forbidden - Usuario desactivado
- **404**: Not Found - Recurso no encontrado
- **409**: Conflict - Email ya existe
- **500**: Internal Server Error - Error del servidor

---

## 🔧 **Scripts Disponibles**

```bash
# Desarrollo
npm run dev      # Ejecutar en modo desarrollo con nodemon (reinicio automático)

# Producción
npm start        # Ejecutar en modo producción

# Calidad de código
npm run lint     # Verificar código con Biome (sin modificar archivos)
npm run format   # Formatear código con Biome (modifica archivos)
npm run linter   # Alias de format
```

### 🚀 Inicio Rápido

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno:**
   ```bash
   # Crear archivo .env con las variables necesarias
   # Ver sección "Variables de Entorno" más abajo
   ```

3. **Iniciar servidor en desarrollo:**
   ```bash
   npm run dev
   ```

4. **Acceder a la documentación:**
   - Abre tu navegador en: http://localhost:3003/api/docs

---

## 🔧 **Variables de Entorno**

El proyecto utiliza variables de entorno para configuración. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```bash
# ============================================
# Configuración del Servidor
# ============================================
PORT=3003
HOST=127.0.0.1
NODE_ENV=development

# ============================================
# Configuración JWT (Autenticación)
# ============================================
JWT_SECRET=mi_secreto_super_seguro_para_el_examen_gino_tubaro_2025
JWT_EXPIRES_IN=1h

# ============================================
# Configuración de Supabase (Base de Datos)
# ============================================
# Obtén estos valores desde el dashboard de Supabase:
# https://app.supabase.com/project/[tu-proyecto]/settings/api
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_API_KEY=tu-api-key-de-supabase

# ============================================
# Configuración de Archivos (Opcional)
# ============================================
# Solo se usan para endpoints de productos y usuarios externos
PRODUCTOS_PATH=./data/productos.json
CSV_PATH=./data/usuarios.csv

# ============================================
# Configuración de Logging
# ============================================
LOG_LEVEL=combined

# ============================================
# Configuración de CORS (Opcional)
# ============================================
# Orígenes permitidos separados por comas
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000,http://localhost:5174
```

### 📝 Notas Importantes

- ⚠️ **NUNCA** subas el archivo `.env` al repositorio (debe estar en `.gitignore`)
- 🔐 **JWT_SECRET**: Debe ser una cadena larga y aleatoria en producción
- 🗄️ **Supabase**: Los usuarios y personajes se almacenan en Supabase (PostgreSQL), no en archivos JSON
- 📁 **Archivos JSON**: Solo se usan para productos y usuarios externos (endpoints legacy)

## 📝 **Notas de Desarrollo**

### 🗄️ Base de Datos
- **Supabase (PostgreSQL)**: Base de datos en la nube para usuarios, personajes y batallas
- **UUID**: Todos los IDs son UUIDs generados automáticamente por Supabase
- **Relaciones**: Relación uno a muchos (Usuario → Characters) con foreign keys y CASCADE
- **Mapeo de datos**: Conversión automática entre `snake_case` (BD) y `camelCase` (API)

### 🔐 Seguridad
- **Encriptación**: Contraseñas hasheadas con bcryptjs (10 salt rounds)
- **JWT**: Tokens con expiración configurable via `JWT_EXPIRES_IN` (default: 1h)
- **Rate Limiting**: 
  - General: 100 requests/30 minutos por IP
  - Autenticación: 20 requests/30 minutos por IP
- **Validaciones**: Email único, datos requeridos, validación de usuarios existentes

### 🛠️ Desarrollo
- **Logging**: Morgan configurado para logging HTTP (formato: combined)
- **Formateo**: Biome configurado para linting y formateo automático
- **Variables de entorno**: Configuración centralizada en `.env` (no versionado)
- **Documentación**: Scalar genera documentación automáticamente desde comentarios JSDoc

### 📁 Archivos y Persistencia
- **Archivos JSON**: Solo se usan para productos y usuarios externos (endpoints legacy)
- **Supabase**: Usuarios, personajes y batallas se almacenan en la base de datos
- **CSV**: Solo para almacenamiento temporal de datos externos

---

## 👤 **Usuario de Prueba**

Para probar la API, puedes usar:
- **Email**: `demo@example.com`
- **Password**: `123456`

---

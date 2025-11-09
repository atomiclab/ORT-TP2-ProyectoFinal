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

API REST desarrollada en Node.js que implementa tres endpoints principales con autenticación JWT, manejo de archivos JSON/CSV y operaciones CRUD completas.

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

El proyecto deberá incluir documentación formal de su API utilizando alguna de las siguientes herramientas:

* **Swagger (OpenAPI 3.0)** mediante el uso de una interfaz visual (por ejemplo, Swagger UI) que permita la exploración de los endpoints, parámetros, tipos de respuesta y códigos de estado HTTP.
* **Scalar** como alternativa moderna que permite definir y visualizar especificaciones OpenAPI de manera interactiva.

La documentación deberá incluir:

* Descripción de cada endpoint, su propósito y el método HTTP utilizado.
* Ejemplos de request y response.
* Modelos de datos esperados.
* Posibles respuestas de error y sus códigos asociados.
* Requerimientos de autenticación cuando corresponda.

Se valorará que la documentación esté disponible a través de un endpoint del servidor (por ejemplo `/api/docs`), y que se mantenga actualizada con respecto a los cambios del sistema.

> **Estado actual:** La documentación de endpoints se encuentra en este README. Pendiente: Implementación de Swagger/Scalar con interfaz visual accesible desde `/api/docs`.

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

> **Estado actual:** ✅ Implementado: Autenticación JWT, encriptación de contraseñas con bcryptjs, variables de entorno. Pendiente: Refresh tokens, roles y permisos, Helmet, rate limiting.

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
* ✅ Documentación completa de endpoints en README
* ✅ Linting y formateo con Biome
* ✅ Tests HTTP (archivos .http)

### 🚧 En Progreso / Pendiente

* ⏳ Pruebas unitarias (casos felices y no felices)
* ⏳ Documentación OpenAPI con Swagger/Scalar (endpoint `/api/docs`)
* ⏳ Refresh tokens para JWT
* ⏳ Sistema de roles y permisos
* ⏳ Cabeceras de seguridad (Helmet)
* ⏳ Rate limiting
* ⏳ Módulos de mediana/alta complejidad (más allá de CRUD básico)
* ⏳ Pipeline CI/CD
* ⏳ Despliegue en Cloud Run o Render

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

- **Express.js** - Framework web
- **Morgan** - Middleware de logging
- **JWT** - Autenticación con tokens
- **bcryptjs** - Encriptación de contraseñas
- **Supabase** - Base de datos PostgreSQL en la nube
- **@supabase/supabase-js** - Cliente de Supabase para Node.js
- **UUID** - Generación de IDs únicos (manejado por Supabase)
- **Biome** - Linting y formateo de código

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

### Estructura Actual

```
proyecto/
├── src/
│   ├── controllers/     # Controladores de rutas
│   ├── services/        # Lógica de negocio
│   ├── routes/          # Definición de rutas
│   ├── middleware/      # Middlewares (JWT, etc.)
│   └── app.js           # Punto de entrada del servidor
├── data/                # Archivos de datos
│   ├── productos.json   # Productos del sistema
│   ├── usuarios.csv     # Usuarios externos
│   └── usuariodb.json   # Base de datos de usuarios
├── tests/               # Archivos de prueba HTTP
└── docs/                # Documentación adicional (pendiente)
```

## 🔗 Endpoints de la API

### Base URL
```
http://localhost:3003
```

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

## 🔐 **AUTENTICACIÓN JWT**

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
Obtiene el perfil del usuario autenticado.

**Headers:**
```
Authorization: Bearer <token>
```

**Respuesta (200):**
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

---

## 🧪 **Pruebas**

### Requisitos de Pruebas

Según los requisitos del proyecto, se deben implementar:

* **Pruebas unitarias para los casos felices:** Verificar que las funcionalidades principales funcionan correctamente.
* **Al menos una prueba para casos no felices:** Validar el manejo de errores y casos límite.

> **Estado actual:** Los archivos de prueba HTTP están disponibles en la carpeta `tests/`. Pendiente: Implementación de pruebas unitarias con framework de testing (Jest, Mocha, etc.).

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
npm run dev      # Ejecutar en modo desarrollo con nodemon
npm start        # Ejecutar en modo producción
npm run lint     # Verificar código con Biome
npm run format   # Formatear código con Biome
```

---

## 🔧 **Variables de Entorno**

El proyecto utiliza variables de entorno para configuración. Copia `.env.example` a `.env` y ajusta los valores:

```bash
# Configuración del servidor
PORT=3003
HOST=127.0.0.1
NODE_ENV=development

# Configuración JWT
JWT_SECRET=mi_secreto_super_seguro_para_el_examen_gino_tubaro_2025
JWT_EXPIRES_IN=1h

# Configuración de Supabase (Base de datos PostgreSQL)
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_API_KEY=tu-api-key-de-supabase

# Configuración de archivos (para productos y usuarios externos)
PRODUCTOS_PATH=./data/productos.json
CSV_PATH=./data/usuarios.csv

# Configuración de logging
LOG_LEVEL=combined
```

**Nota importante:** 
- Los usuarios y personajes ahora se almacenan en Supabase, no en archivos JSON.
- El archivo `usuariodb.json` ya no se utiliza para usuarios (solo para referencia histórica).
- Asegúrate de configurar correctamente `SUPABASE_URL` y `SUPABASE_API_KEY` en tu archivo `.env`.

## 📝 **Notas de Desarrollo**

- **Base de datos**: Supabase (PostgreSQL) - Usuarios y personajes almacenados en la nube
- **UUID**: Todos los usuarios y personajes tienen IDs únicos generados automáticamente por Supabase
- **Relaciones**: Relación uno a muchos entre usuarios y personajes con foreign keys y CASCADE
- **Encriptación**: Las contraseñas se almacenan encriptadas con bcryptjs
- **JWT**: Tokens con expiración configurable via `JWT_EXPIRES_IN`
- **Validaciones**: Email único, datos requeridos, validación de usuarios existentes
- **Mapeo de datos**: Conversión automática entre snake_case (BD) y camelCase (API)
- **Logging**: Morgan configurado para logging de requests
- **Formateo**: Biome configurado para mantener código consistente
- **Variables de entorno**: Configuración centralizada en `.env`
- **Archivos JSON**: Solo se usan para productos y usuarios externos (no para usuarios principales)

---

## 👤 **Usuario de Prueba**

Para probar la API, puedes usar:
- **Email**: `demo@example.com`
- **Password**: `123456`

---

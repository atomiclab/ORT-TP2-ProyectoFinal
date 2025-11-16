//Para el punto 3
//
import express from "express";
import { usuariosController } from "../controllers/usuariosController.js";
import { charactersController } from "../controllers/charactersController.js";

export const usuariosRouter = express.Router();

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtiene todos los usuarios almacenados en Supabase
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Usuarios obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Usuario'
 *                 count:
 *                   type: integer
 *                 message:
 *                   type: string
 *                   example: "Usuarios obtenidos exitosamente"
 *       500:
 *         description: Error al obtener usuarios
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// CRUD Completo
usuariosRouter.get("/", usuariosController.getAllUsuarios); // GET /api/usuarios

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crea un nuevo usuario en Supabase
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - email
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Usuario Nuevo"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "nuevo@example.com"
 *               telefono:
 *                 type: string
 *                 example: "555-999-8888"
 *               edad:
 *                 type: integer
 *                 example: 30
 *               activo:
 *                 type: boolean
 *                 example: true
 *               fechaCreacion:
 *                 type: string
 *                 format: date
 *                 example: "2025-11-08"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 data:
 *                   $ref: '#/components/schemas/Usuario'
 *                 message:
 *                   type: string
 *                   example: "Usuario creado exitosamente"
 *       400:
 *         description: Datos inválidos o faltantes
 *       409:
 *         description: El email ya existe
 */
usuariosRouter.post("/", usuariosController.createUsuario); // POST /api/usuarios

/**
 * @swagger
 * /api/usuarios/{userId}/characters:
 *   get:
 *     summary: Obtiene todos los personajes de un usuario específico
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Personajes obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Character'
 *                 count:
 *                   type: integer
 *       404:
 *         description: Usuario no encontrado
 */
/**
 * @swagger
 * /api/usuarios/online:
 *   get:
 *     summary: Obtiene todos los usuarios que tienen personajes en línea
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Usuarios en línea obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Usuario'
 *                 count:
 *                   type: integer
 *                   example: 2
 *                 message:
 *                   type: string
 *                   example: "Usuarios en línea obtenidos exitosamente"
 *       500:
 *         description: Error al obtener usuarios en línea
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
usuariosRouter.get("/online", usuariosController.getUsuariosOnline); // GET /api/usuarios/online

// Rutas anidadas para personajes de usuario (relación uno a muchos) - debe ir antes de /:id
usuariosRouter.get("/:userId/characters", charactersController.getCharactersByUserId); // GET /api/usuarios/:userId/characters

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtiene un usuario específico por su ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID único del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   $ref: '#/components/schemas/Usuario'
 *                 message:
 *                   type: string
 *                   example: "Usuario encontrado exitosamente"
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// Rutas con :id deben ir después de las rutas anidadas
usuariosRouter.get("/:id", usuariosController.getUsuarioById); // GET /api/usuarios/:id

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualiza un usuario existente
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID único del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               telefono:
 *                 type: string
 *               edad:
 *                 type: integer
 *               activo:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   $ref: '#/components/schemas/Usuario'
 *                 message:
 *                   type: string
 *                   example: "Usuario actualizado exitosamente"
 *       404:
 *         description: Usuario no encontrado
 */
usuariosRouter.put("/:id", usuariosController.updateUsuario); // PUT /api/usuarios/:id

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Elimina un usuario por su ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID único del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Usuario eliminado exitosamente"
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
usuariosRouter.delete("/:id", usuariosController.deleteUsuario); // DELETE /api/usuarios/:id

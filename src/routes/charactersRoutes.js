import express from "express";
import { charactersController } from "../controllers/charactersController.js";

export const charactersRouter = express.Router();

/**
 * @swagger
 * /api/characters:
 *   get:
 *     summary: Obtiene todos los personajes almacenados en Supabase
 *     tags: [Personajes]
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
 *                 message:
 *                   type: string
 *                   example: "Personajes obtenidos exitosamente"
 *       500:
 *         description: Error al obtener personajes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// CRUD Completo para personajes
charactersRouter.get("/", charactersController.getAllCharacters); // GET /api/characters

/**
 * @swagger
 * /api/characters/{id}:
 *   get:
 *     summary: Obtiene un personaje específico por su ID
 *     tags: [Personajes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID único del personaje
 *     responses:
 *       200:
 *         description: Personaje encontrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   $ref: '#/components/schemas/Character'
 *                 message:
 *                   type: string
 *                   example: "Personaje encontrado exitosamente"
 *       404:
 *         description: Personaje no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
charactersRouter.get("/:id", charactersController.getCharacterById); // GET /api/characters/:id

/**
 * @swagger
 * /api/characters:
 *   post:
 *     summary: Crea un nuevo personaje en Supabase
 *     tags: [Personajes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *                 format: uuid
 *                 example: "550e8400-e29b-41d4-a716-446655440001"
 *               name:
 *                 type: string
 *                 example: "Sherry Becker"
 *               avatar:
 *                 type: string
 *                 format: uri
 *                 example: "https://avatars.githubusercontent.com/u/42087344"
 *               race:
 *                 type: string
 *                 example: "seagull"
 *               class:
 *                 type: string
 *                 example: "Bacon"
 *               guild:
 *                 type: string
 *                 example: "Fadel - Murphy"
 *               hp:
 *                 type: integer
 *                 example: 50
 *               shield:
 *                 type: integer
 *                 example: 25
 *               level:
 *                 type: integer
 *                 example: 10
 *               isOnline:
 *                 type: boolean
 *                 example: true
 *               kingdom:
 *                 type: string
 *                 example: "Cape Verde"
 *     responses:
 *       201:
 *         description: Personaje creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 data:
 *                   $ref: '#/components/schemas/Character'
 *                 message:
 *                   type: string
 *                   example: "Personaje creado exitosamente"
 *       400:
 *         description: Datos inválidos o usuario no encontrado
 *       500:
 *         description: Error al crear personaje
 */
charactersRouter.post("/", charactersController.createCharacter); // POST /api/characters

/**
 * @swagger
 * /api/characters/{id}:
 *   put:
 *     summary: Actualiza un personaje existente
 *     tags: [Personajes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID único del personaje
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               avatar:
 *                 type: string
 *                 format: uri
 *               race:
 *                 type: string
 *               class:
 *                 type: string
 *               guild:
 *                 type: string
 *               hp:
 *                 type: integer
 *               shield:
 *                 type: integer
 *               level:
 *                 type: integer
 *               isOnline:
 *                 type: boolean
 *               kingdom:
 *                 type: string
 *     responses:
 *       200:
 *         description: Personaje actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   $ref: '#/components/schemas/Character'
 *                 message:
 *                   type: string
 *                   example: "Personaje actualizado exitosamente"
 *       404:
 *         description: Personaje no encontrado
 */
charactersRouter.put("/:id", charactersController.updateCharacter); // PUT /api/characters/:id

/**
 * @swagger
 * /api/characters/{id}:
 *   delete:
 *     summary: Elimina un personaje por su ID
 *     tags: [Personajes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID único del personaje
 *     responses:
 *       200:
 *         description: Personaje eliminado exitosamente
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
 *                   example: "Personaje eliminado exitosamente"
 *       404:
 *         description: Personaje no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
charactersRouter.delete("/:id", charactersController.deleteCharacter); // DELETE /api/characters/:id


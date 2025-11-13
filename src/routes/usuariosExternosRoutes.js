//Para el punto 2
import express from "express";
import { usuariosExternosController } from "../controllers/usuariosExternosController.js";

export const usuariosExternosRouter = express.Router();

/**
 * @swagger
 * /api/usuarios-externos:
 *   get:
 *     summary: Consume API externa de videojuegos y almacena datos en CSV
 *     tags: [Usuarios Externos]
 *     responses:
 *       200:
 *         description: Datos externos obtenidos y almacenados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalRecords:
 *                       type: integer
 *                       example: 16598
 *                     headers:
 *                       type: array
 *                       items:
 *                         type: string
 *                     source:
 *                       type: string
 *                     filePath:
 *                       type: string
 *                 message:
 *                   type: string
 *                   example: "Datos externos obtenidos y almacenados exitosamente"
 *       500:
 *         description: Error al consumir API externa
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// GET /api/usuarios-externos
usuariosExternosRouter.get("/", usuariosExternosController.getUsuariosExternos);

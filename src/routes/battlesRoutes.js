import express from "express";
import { battlesController } from "../controllers/battlesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

export const battlesRouter = express.Router();

/**
 * @swagger
 * /api/battle/{idPersonajeRetador}/{idPersonajeRetado}:
 *   post:
 *     summary: Inicia una batalla entre dos personajes online
 *     tags: [Batallas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idPersonajeRetador
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del personaje que reta (debe pertenecer al usuario autenticado)
 *       - in: path
 *         name: idPersonajeRetado
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID del personaje que es retado
 *     responses:
 *       200:
 *         description: Batalla realizada exitosamente
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
 *                     battleId:
 *                       type: string
 *                       format: uuid
 *                       description: ID único de la batalla
 *                     dateTimePelea:
 *                       type: string
 *                       format: date-time
 *                       description: Fecha y hora de la pelea
 *                     retador:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           format: uuid
 *                         name:
 *                           type: string
 *                         hpAntes:
 *                           type: integer
 *                         hpDespues:
 *                           type: integer
 *                         dado:
 *                           type: integer
 *                           description: Resultado de los dados (1-16)
 *                         dañoRecibido:
 *                           type: integer
 *                     retado:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           format: uuid
 *                         name:
 *                           type: string
 *                         hpAntes:
 *                           type: integer
 *                         hpDespues:
 *                           type: integer
 *                         dado:
 *                           type: integer
 *                           description: Resultado de los dados (1-16)
 *                         dañoRecibido:
 *                           type: integer
 *                 message:
 *                   type: string
 *                   example: "Batalla realizada exitosamente"
 *       400:
 *         description: Datos inválidos o personajes no cumplen condiciones
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               personajeOffline:
 *                 value:
 *                   status: 400
 *                   error: "El personaje retador debe estar online"
 *                   code: "RETADOR_OFFLINE"
 *                   message: "No se pudo realizar la batalla"
 *               hpInsufficiente:
 *                 value:
 *                   status: 400
 *                   error: "El personaje retado debe tener HP mayor o igual a 1"
 *                   code: "RETADO_LOW_HP"
 *                   message: "No se pudo realizar la batalla"
 *       403:
 *         description: El personaje retador no pertenece al usuario autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Personaje no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: No autorizado - Token inválido o faltante
 *       500:
 *         description: Error interno del servidor
 */
battlesRouter.post(
	"/:idPersonajeRetador/:idPersonajeRetado",
	authMiddleware.protectRoute.bind(authMiddleware),
	battlesController.battleCharacters,
);




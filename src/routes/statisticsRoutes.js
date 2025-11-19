import express from "express";
import { statisticsController } from "../controllers/statisticsController.js";

export const statisticsRouter = express.Router();

/**
 * @swagger
 * /api/statistics:
 *   get:
 *     summary: Obtiene estadísticas públicas del sistema
 *     description: Endpoint público que devuelve métricas agregadas del sistema incluyendo totales, rankings y estadísticas de usuarios, personajes y batallas
 *     tags: [Estadísticas]
 *     responses:
 *       200:
 *         description: Estadísticas obtenidas exitosamente
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
 *                     totales:
 *                       type: object
 *                       properties:
 *                         usuarios:
 *                           type: integer
 *                           example: 100
 *                           description: Total de usuarios registrados
 *                         personajes:
 *                           type: integer
 *                           example: 250
 *                           description: Total de personajes creados
 *                         batallas:
 *                           type: integer
 *                           example: 500
 *                           description: Total de batallas realizadas
 *                     leaderboard:
 *                       type: object
 *                       properties:
 *                         usuariosMasBatallas:
 *                           type: array
 *                           description: Top 10 usuarios con más batallas (como retador o retado)
 *                           items:
 *                             type: object
 *                             properties:
 *                               usuarioId:
 *                                 type: string
 *                                 format: uuid
 *                               nombre:
 *                                 type: string
 *                               email:
 *                                 type: string
 *                               totalBatallas:
 *                                 type: integer
 *                         usuariosMasPersonajes:
 *                           type: array
 *                           description: Top 5 usuarios con más personajes creados
 *                           items:
 *                             type: object
 *                             properties:
 *                               usuarioId:
 *                                 type: string
 *                                 format: uuid
 *                               nombre:
 *                                 type: string
 *                               email:
 *                                 type: string
 *                               totalPersonajes:
 *                                 type: integer
 *                     razas:
 *                       type: array
 *                       description: Top 5 razas más populares
 *                       items:
 *                         type: object
 *                         properties:
 *                           race:
 *                             type: string
 *                           cantidad:
 *                             type: integer
 *                     clases:
 *                       type: array
 *                       description: Top 5 clases más populares
 *                       items:
 *                         type: object
 *                         properties:
 *                           clase:
 *                             type: string
 *                           cantidad:
 *                             type: integer
 *                     reinos:
 *                       type: array
 *                       description: Top 5 reinos más populares
 *                       items:
 *                         type: object
 *                         properties:
 *                           reino:
 *                             type: string
 *                           cantidad:
 *                             type: integer
 *                     guilds:
 *                       type: array
 *                       description: Top 5 guilds más populares
 *                       items:
 *                         type: object
 *                         properties:
 *                           guild:
 *                             type: string
 *                           cantidad:
 *                             type: integer
 *                     metricas:
 *                       type: object
 *                       properties:
 *                         promedioNivel:
 *                           type: number
 *                           format: float
 *                           example: 15.5
 *                           description: Promedio de nivel de todos los personajes
 *                         personajesOnline:
 *                           type: integer
 *                           example: 45
 *                           description: Cantidad de personajes online
 *                         personajesOffline:
 *                           type: integer
 *                           example: 205
 *                           description: Cantidad de personajes offline
 *                 message:
 *                   type: string
 *                   example: "Estadísticas obtenidas exitosamente"
 *       500:
 *         description: Error al obtener estadísticas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
statisticsRouter.get("/", statisticsController.getStatistics); // GET /api/statistics

/**
 * @swagger
 * /api/statistics/top-users-battles:
 *   get:
 *     summary: Top 5 usuarios con más batallas jugadas
 *     description: Devuelve el top 5 de usuarios con la mayor cantidad de batallas jugadas
 *     tags: [Estadísticas]
 *     responses:
 *       200:
 *         description: Top 5 usuarios obtenidos exitosamente
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
 *                     type: object
 *                     properties:
 *                       userId:
 *                         type: string
 *                         format: uuid
 *                       nombre:
 *                         type: string
 *                       email:
 *                         type: string
 *                       totalBattles:
 *                         type: integer
 *                 message:
 *                   type: string
 *                   example: "Top 5 usuarios con más batallas obtenidos exitosamente"
 *       500:
 *         description: Error al obtener estadísticas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
statisticsRouter.get("/top-users-battles", statisticsController.getTopUsersByBattles); // GET /api/statistics/top-users-battles
//Para el punto 1
import express from "express";
import { productosController } from "../controllers/productosController.js";

export const productosRouter = express.Router();

/**
 * @swagger
 * /api/productos:
 *   get:
 *     summary: Obtiene todos los productos desde archivo JSON local
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Productos obtenidos exitosamente
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
 *                       id:
 *                         type: integer
 *                       nombre:
 *                         type: string
 *                       precio:
 *                         type: number
 *                       categoria:
 *                         type: string
 *                       stock:
 *                         type: integer
 *                 count:
 *                   type: integer
 *                 message:
 *                   type: string
 *                   example: "Productos obtenidos exitosamente"
 *       404:
 *         description: Archivo de productos no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
// GET /api/productos
productosRouter.get("/", productosController.getAllProductos);

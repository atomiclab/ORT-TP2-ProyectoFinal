//Para el punto 3
//
import express from "express";
import { usuariosController } from "../controllers/usuariosController.js";
import { charactersController } from "../controllers/charactersController.js";

export const usuariosRouter = express.Router();

// CRUD Completo
usuariosRouter.get("/", usuariosController.getAllUsuarios); // GET /api/usuarios
usuariosRouter.post("/", usuariosController.createUsuario); // POST /api/usuarios

// Rutas anidadas para personajes de usuario (relación uno a muchos) - debe ir antes de /:id
usuariosRouter.get("/:userId/characters", charactersController.getCharactersByUserId); // GET /api/usuarios/:userId/characters

// Rutas con :id deben ir después de las rutas anidadas
usuariosRouter.get("/:id", usuariosController.getUsuarioById); // GET /api/usuarios/:id
usuariosRouter.put("/:id", usuariosController.updateUsuario); // PUT /api/usuarios/:id
usuariosRouter.delete("/:id", usuariosController.deleteUsuario); // DELETE /api/usuarios/:id

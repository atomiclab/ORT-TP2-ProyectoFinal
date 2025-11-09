import express from "express";
import { charactersController } from "../controllers/charactersController.js";

export const charactersRouter = express.Router();

// CRUD Completo para personajes
charactersRouter.get("/", charactersController.getAllCharacters); // GET /api/characters
charactersRouter.get("/:id", charactersController.getCharacterById); // GET /api/characters/:id
charactersRouter.post("/", charactersController.createCharacter); // POST /api/characters
charactersRouter.put("/:id", charactersController.updateCharacter); // PUT /api/characters/:id
charactersRouter.delete("/:id", charactersController.deleteCharacter); // DELETE /api/characters/:id


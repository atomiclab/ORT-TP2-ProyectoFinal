import { charactersService } from "../services/charactersService.js";

export const charactersController = {
	// GET /api/characters
	async getAllCharacters(_request, response) {
		try {
			const result = await charactersService.getAllCharacters();

			if (!result.success) {
				return response.status(500).json({
					status: 500,
					error: result.error,
					message: "No se pudo obtener la lista de personajes",
				});
			}

			response.json({
				status: 200,
				data: result.data,
				count: result.data.length,
				message: "Personajes obtenidos exitosamente",
			});
		} catch (error) {
			console.error("Error al obtener personajes:", error);
			response.status(500).json({
				status: 500,
				error: "Error interno del servidor",
				message: error.message,
			});
		}
	},

	// GET /api/characters/:id
	async getCharacterById(request, response) {
		try {
			const { id } = request.params;
			const result = await charactersService.getCharacterById(id);

			if (!result.success) {
				const statusCode = result.code === "CHARACTER_NOT_FOUND" ? 404 : 500;
				return response.status(statusCode).json({
					status: statusCode,
					error: result.error,
					code: result.code,
					message: `Personaje con ID ${id} no encontrado`,
				});
			}

			response.json({
				status: 200,
				data: result.data,
				message: "Personaje encontrado exitosamente",
			});
		} catch (error) {
			console.error("Error al obtener personaje:", error);
			response.status(500).json({
				status: 500,
				error: "Error interno del servidor",
				message: error.message,
			});
		}
	},

	// GET /api/usuarios/:userId/characters
	async getCharactersByUserId(request, response) {
		try {
			const { userId } = request.params;
			const result = await charactersService.getCharactersByUserId(userId);

			if (!result.success) {
				return response.status(500).json({
					status: 500,
					error: result.error,
					message: "No se pudo obtener los personajes del usuario",
				});
			}

			response.json({
				status: 200,
				data: result.data,
				count: result.data.length,
				message: "Personajes del usuario obtenidos exitosamente",
			});
		} catch (error) {
			console.error("Error al obtener personajes del usuario:", error);
			response.status(500).json({
				status: 500,
				error: "Error interno del servidor",
				message: error.message,
			});
		}
	},

	// POST /api/characters
	async createCharacter(request, response) {
		try {
			const characterData = request.body;

			// Validaciones básicas
			if (!characterData.name || !characterData.userId) {
				return response.status(400).json({
					status: 400,
					error: "Datos incompletos",
					message: "Nombre y userId son requeridos",
				});
			}

			const result = await charactersService.createCharacter(characterData);

			if (!result.success) {
				const statusCode = result.code === "USER_NOT_FOUND" ? 404 : 500;
				return response.status(statusCode).json({
					status: statusCode,
					error: result.error,
					code: result.code,
					message: "No se pudo crear el personaje",
				});
			}

			response.status(201).json({
				status: 201,
				data: result.data,
				message: "Personaje creado exitosamente",
			});
		} catch (error) {
			console.error("Error al crear personaje:", error);
			response.status(500).json({
				status: 500,
				error: "Error interno del servidor",
				message: error.message,
			});
		}
	},

	// PUT /api/characters/:id
	async updateCharacter(request, response) {
		try {
			const { id } = request.params;
			const characterData = request.body;

			const result = await charactersService.updateCharacter(id, characterData);

			if (!result.success) {
				const statusCode =
					result.code === "CHARACTER_NOT_FOUND"
						? 404
						: result.code === "USER_NOT_FOUND"
							? 404
							: 500;
				return response.status(statusCode).json({
					status: statusCode,
					error: result.error,
					code: result.code,
					message: "No se pudo actualizar el personaje",
				});
			}

			response.json({
				status: 200,
				data: result.data,
				message: "Personaje actualizado exitosamente",
			});
		} catch (error) {
			console.error("Error al actualizar personaje:", error);
			response.status(500).json({
				status: 500,
				error: "Error interno del servidor",
				message: error.message,
			});
		}
	},

	// DELETE /api/characters/:id
	async deleteCharacter(request, response) {
		try {
			const { id } = request.params;
			const result = await charactersService.deleteCharacter(id);

			if (!result.success) {
				const statusCode = result.code === "CHARACTER_NOT_FOUND" ? 404 : 500;
				return response.status(statusCode).json({
					status: statusCode,
					error: result.error,
					code: result.code,
					message: "No se pudo eliminar el personaje",
				});
			}

			response.json({
				status: 200,
				data: result.data,
				message: "Personaje eliminado exitosamente",
			});
		} catch (error) {
			console.error("Error al eliminar personaje:", error);
			response.status(500).json({
				status: 500,
				error: "Error interno del servidor",
				message: error.message,
			});
		}
	},
};


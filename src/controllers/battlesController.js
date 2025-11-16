import { battlesService } from "../services/battlesService.js";

export const battlesController = {
	/**
	 * POST /api/battle/:idPersonajeRetador/:idPersonajeRetado
	 * Inicia una batalla entre dos personajes
	 */
	async battleCharacters(request, response) {
		try {
			const { idPersonajeRetador, idPersonajeRetado } = request.params;
			const userId = request.user.userId; // Obtenido del JWT mediante authMiddleware

			// Validar que ambos IDs estén presentes
			if (!idPersonajeRetador || !idPersonajeRetado) {
				return response.status(400).json({
					status: 400,
					error: "Datos incompletos",
					message: "Se requieren los IDs de ambos personajes",
				});
			}

			// Validar que no sean el mismo personaje
			if (idPersonajeRetador === idPersonajeRetado) {
				return response.status(400).json({
					status: 400,
					error: "Datos inválidos",
					message: "Un personaje no puede pelear consigo mismo",
				});
			}

			const result = await battlesService.battleCharacters(
				idPersonajeRetador,
				idPersonajeRetado,
				userId,
			);

			if (!result.success) {
				const statusCode =
					result.code === "RETADOR_NOT_FOUND" || result.code === "RETADO_NOT_FOUND"
						? 404
						: result.code === "UNAUTHORIZED_RETADOR"
							? 403
							: result.code === "RETADOR_OFFLINE" ||
									result.code === "RETADO_OFFLINE" ||
									result.code === "RETADO_LOW_HP"
								? 400
								: 500;

				return response.status(statusCode).json({
					status: statusCode,
					error: result.error,
					code: result.code,
					message: "No se pudo realizar la batalla",
					details: result.details,
				});
			}

			response.status(200).json({
				status: 200,
				data: result.data,
				message: "Batalla realizada exitosamente",
			});
		} catch (error) {
			console.error("Error al ejecutar batalla:", error);
			response.status(500).json({
				status: 500,
				error: "Error interno del servidor",
				message: error.message,
			});
		}
	},
};




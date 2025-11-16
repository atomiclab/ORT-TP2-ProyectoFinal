import { statisticsService } from "../services/statisticsService.js";

export const statisticsController = {
	/**
	 * GET /api/statistics
	 * Obtiene estadísticas públicas del sistema
	 */
	async getStatistics(_request, response) {
		try {
			const result = await statisticsService.getPublicStatistics();

			if (!result.success) {
				return response.status(500).json({
					status: 500,
					error: result.error,
					details: result.details,
					message: "No se pudieron obtener las estadísticas",
				});
			}

			response.json({
				status: 200,
				data: result.data,
				message: "Estadísticas obtenidas exitosamente",
			});
		} catch (error) {
			console.error("Error al obtener estadísticas:", error);
			response.status(500).json({
				status: 500,
				error: "Error interno del servidor",
				message: error.message,
			});
		}
	},
};

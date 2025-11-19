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
	async getTopUsersByBattles(_request, response) {
		try {
			const result = await statisticsService.getTopUsersByBattles();

			if (!result.success) {
				return response.status(500).json({
					status: 500,
					error: result.error,
					details: result.details,
					message: "No se pudieron obtener los usuarios con más batallas",
				});
			}

			response.json({
				status: 200,
				data: result.data,
				message: "Top 5 usuarios con más batallas obtenidos exitosamente",
			});
		} catch (error) {
			console.error("Error al obtener el top de usuarios por batallas:", error);
			response.status(500).json({
				status: 500,
				error: "Error interno del servidor",
				message: error.message,
			});
		}
	},
	/**
		 * GET /api/statistics/battles/by-day
		 * Obtiene la cantidad de batallas por día en los últimos 7 días
		 */
	async getBattlesByDay(_request, response) {
		try {
			const result = await statisticsService.getBattlesByDay();

			if (!result.success) {
				return response.status(500).json({
					status: 500,
					error: result.error,
					details: result.details,
					message: "No se pudieron obtener las batallas por día",
				});
			}

			response.json({
				status: 200,
				data: result.data,
				message: "Cantidad de batallas por día obtenida exitosamente",
			});
		} catch (error) {
			console.error("Error al obtener batallas por día:", error);
			response.status(500).json({
				status: 500,
				error: "Error interno del servidor",
				message: error.message,
			});
		}
	},
};
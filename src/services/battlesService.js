import SupaBaseConnection from "../database/supabase.cnx.js";
import { charactersService } from "./charactersService.js";

export const battlesService = {
	/**
	 * Realiza una batalla entre dos personajes
	 * @param {string} retadorId - ID del personaje que reta
	 * @param {string} retadoId - ID del personaje que es retado
	 * @param {string} userId - ID del usuario autenticado
	 * @returns {Promise<Object>} Resultado de la batalla
	 */
	async battleCharacters(retadorId, retadoId, userId) {
		try {
			const supabase = SupaBaseConnection.connect();

			// 1. Validar que el personaje retador pertenezca al usuario
			const retadorResult = await charactersService.getCharacterById(retadorId);
			if (!retadorResult.success) {
				return {
					success: false,
					error: "Personaje retador no encontrado",
					code: "RETADOR_NOT_FOUND",
				};
			}

			const retador = retadorResult.data;
			if (retador.userId !== userId) {
				return {
					success: false,
					error: "El personaje retador no pertenece al usuario autenticado",
					code: "UNAUTHORIZED_RETADOR",
				};
			}

			// 2. Verificar que el personaje retado exista
			const retadoResult = await charactersService.getCharacterById(retadoId);
			if (!retadoResult.success) {
				return {
					success: false,
					error: "Personaje retado no encontrado",
					code: "RETADO_NOT_FOUND",
				};
			}

			const retado = retadoResult.data;

			// 3. Verificar que ambos personajes estén online
			if (!retador.isOnline) {
				return {
					success: false,
					error: "El personaje retador debe estar online",
					code: "RETADOR_OFFLINE",
				};
			}

			if (!retado.isOnline) {
				return {
					success: false,
					error: "El personaje retado debe estar online",
					code: "RETADO_OFFLINE",
				};
			}

			// 4. Verificar que el personaje retado tenga HP >= 1
			if (retado.hp < 1) {
				return {
					success: false,
					error: "El personaje retado debe tener HP mayor o igual a 1",
					code: "RETADO_LOW_HP",
				};
			}

			// 5. Generar dados aleatorios (1-16) para ambos personajes
			const dadoRetador = Math.floor(Math.random() * 16) + 1;
			const dadoRetado = Math.floor(Math.random() * 16) + 1;

			// Guardar HP antes de la batalla
			const hpRetadorAntes = retador.hp;
			const hpRetadoAntes = retado.hp;

			// 6. Calcular nuevo HP: max(0, hp_actual - daño_recibido)
			const nuevoHpRetador = Math.max(0, retador.hp - dadoRetado);
			const nuevoHpRetado = Math.max(0, retado.hp - dadoRetador);

			// 7. Actualizar HP de ambos personajes
			const { error: errorUpdateRetador } = await supabase
				.from("characters")
				.update({ hp: nuevoHpRetador })
				.eq("id", retadorId);

			if (errorUpdateRetador) {
				return {
					success: false,
					error: "Error al actualizar HP del personaje retador",
					details: errorUpdateRetador.message,
				};
			}

			const { error: errorUpdateRetado } = await supabase
				.from("characters")
				.update({ hp: nuevoHpRetado })
				.eq("id", retadoId);

			if (errorUpdateRetado) {
				// Si falla, intentar revertir el cambio del retador
				await supabase
					.from("characters")
					.update({ hp: hpRetadorAntes })
					.eq("id", retadorId);

				return {
					success: false,
					error: "Error al actualizar HP del personaje retado",
					details: errorUpdateRetado.message,
				};
			}

			// 8. Guardar registro en la tabla battles
			const { data: battleData, error: errorBattle } = await supabase
				.from("battles")
				.insert({
					id_personaje_retador: retadorId,
					id_personaje_retado: retadoId,
					resultado_dados_personaje_retador: dadoRetador,
					resultado_dados_personaje_retado: dadoRetado,
				})
				.select()
				.single();

			if (errorBattle) {
				return {
					success: false,
					error: "Error al guardar el historial de la batalla",
					details: errorBattle.message,
				};
			}

			// Retornar resultado exitoso con detalles de la batalla
			return {
				success: true,
				data: {
					battleId: battleData.id_pelea,
					dateTimePelea: battleData.date_time_pelea,
					retador: {
						id: retadorId,
						name: retador.name,
						hpAntes: hpRetadorAntes,
						hpDespues: nuevoHpRetador,
						dado: dadoRetador,
						dañoRecibido: dadoRetado,
					},
					retado: {
						id: retadoId,
						name: retado.name,
						hpAntes: hpRetadoAntes,
						hpDespues: nuevoHpRetado,
						dado: dadoRetado,
						dañoRecibido: dadoRetador,
					},
				},
			};
		} catch (error) {
			return {
				success: false,
				error: "Error al ejecutar la batalla",
				details: error.message,
			};
		}
	},
};


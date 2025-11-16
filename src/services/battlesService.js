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

			// Guardar HP y escudo antes de la batalla
			const hpRetadorAntes = retador.hp;
			const hpRetadoAntes = retado.hp;
			const shieldRetadorAntes = retador.shield || 0;
			const shieldRetadoAntes = retado.shield || 0;

			// 6. Calcular amortiguación del escudo y daño efectivo
			// Factor aleatorio entre 0 y 0.2 para cada escudo
			const factorEscudoRetador = Math.random() * 0.2; // 0 a 0.2
			const factorEscudoRetado = Math.random() * 0.2; // 0 a 0.2

			// Escudo efectivo = escudo * factor aleatorio
			// Redondear hacia abajo para obtener un entero
			const escudoEfectivoRetador = Math.floor(shieldRetadorAntes * factorEscudoRetador);
			const escudoEfectivoRetado = Math.floor(shieldRetadoAntes * factorEscudoRetado);

			// Daño efectivo = max(0, daño - escudo_efectivo)
			// Redondear hacia abajo para obtener un entero
			const dañoEfectivoRetador = Math.floor(Math.max(0, dadoRetado - escudoEfectivoRetador));
			const dañoEfectivoRetado = Math.floor(Math.max(0, dadoRetador - escudoEfectivoRetado));

			// 6.1. Calcular nuevo HP: max(0, hp_actual - daño_efectivo)
			// Asegurar que sea un entero válido
			const nuevoHpRetador = Math.floor(Math.max(0, retador.hp - dañoEfectivoRetador));
			const nuevoHpRetado = Math.floor(Math.max(0, retado.hp - dañoEfectivoRetado));

			// Validar que los valores sean números válidos
			if (isNaN(nuevoHpRetador) || isNaN(nuevoHpRetado) || !isFinite(nuevoHpRetador) || !isFinite(nuevoHpRetado)) {
				return {
					success: false,
					error: "Error al calcular los valores de HP",
					details: "Los valores calculados no son válidos",
				};
			}

			// 7. Actualizar HP de ambos personajes
			const { error: errorUpdateRetador } = await supabase
				.from("characters")
				.update({ hp: nuevoHpRetador })
				.eq("id", retadorId);

			if (errorUpdateRetador) {
				console.error("Error al actualizar HP del retador:", errorUpdateRetador);
				console.error("Valor nuevoHpRetador:", nuevoHpRetador, "Tipo:", typeof nuevoHpRetador);
				return {
					success: false,
					error: "Error al actualizar HP del personaje retador",
					details: errorUpdateRetador.message || JSON.stringify(errorUpdateRetador),
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

			// 7.5. Verificar si hubo un asesinato y aplicar recompensas al ganador
			let ganadorId = null;
			let ganadorName = null;
			let nivelGanadorAntes = null;
			let hpGanadorAntes = null;
			let nivelGanadorDespues = null;
			let hpGanadorDespues = null;
			let bonusVida = null;

			if (nuevoHpRetado === 0) {
				// El retador ganó (mató al retado)
				ganadorId = retadorId;
				ganadorName = retador.name;
				nivelGanadorAntes = retador.level;
				hpGanadorAntes = nuevoHpRetador;
				
				// Calcular nuevo nivel y HP con bonus
				nivelGanadorDespues = retador.level + 1;
				bonusVida = Math.floor(Math.random() * (75 - 50 + 1)) + 50; // Random entre 50 y 75
				hpGanadorDespues = Math.floor(nuevoHpRetador + bonusVida); // Asegurar que sea entero

				// Actualizar nivel y HP del ganador
				const { error: errorUpdateGanador } = await supabase
					.from("characters")
					.update({ 
						level: nivelGanadorDespues,
						hp: hpGanadorDespues
					})
					.eq("id", ganadorId);

				if (errorUpdateGanador) {
					return {
						success: false,
						error: "Error al actualizar recompensas del ganador",
						details: errorUpdateGanador.message,
					};
				}
			} else if (nuevoHpRetador === 0) {
				// El retado ganó (mató al retador)
				ganadorId = retadoId;
				ganadorName = retado.name;
				nivelGanadorAntes = retado.level;
				hpGanadorAntes = nuevoHpRetado;
				
				// Calcular nuevo nivel y HP con bonus
				nivelGanadorDespues = retado.level + 1;
				bonusVida = Math.floor(Math.random() * (75 - 50 + 1)) + 50; // Random entre 50 y 75
				hpGanadorDespues = Math.floor(nuevoHpRetado + bonusVida); // Asegurar que sea entero

				// Actualizar nivel y HP del ganador
				const { error: errorUpdateGanador } = await supabase
					.from("characters")
					.update({ 
						level: nivelGanadorDespues,
						hp: hpGanadorDespues
					})
					.eq("id", ganadorId);

				if (errorUpdateGanador) {
					return {
						success: false,
						error: "Error al actualizar recompensas del ganador",
						details: errorUpdateGanador.message,
					};
				}
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
			const resultado = {
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
						dañoBrutoRecibido: dadoRetado,
						escudo: shieldRetadorAntes,
						escudoEfectivo: escudoEfectivoRetador,
						dañoEfectivoRecibido: dañoEfectivoRetador,
					},
					retado: {
						id: retadoId,
						name: retado.name,
						hpAntes: hpRetadoAntes,
						hpDespues: nuevoHpRetado,
						dado: dadoRetado,
						dañoBrutoRecibido: dadoRetador,
						escudo: shieldRetadoAntes,
						escudoEfectivo: escudoEfectivoRetado,
						dañoEfectivoRecibido: dañoEfectivoRetado,
					},
				},
			};

			// Agregar información del ganador si hubo un asesinato
			if (ganadorId) {
				resultado.data.ganador = {
					id: ganadorId,
					name: ganadorName,
					nivelAntes: nivelGanadorAntes,
					nivelDespues: nivelGanadorDespues,
					hpAntes: hpGanadorAntes,
					hpDespues: hpGanadorDespues,
					bonusVida: bonusVida,
				};
			}

			return resultado;
		} catch (error) {
			return {
				success: false,
				error: "Error al ejecutar la batalla",
				details: error.message,
			};
		}
	},
};




import SupaBaseConnection from "../database/supabase.cnx.js";
import { charactersService } from "./charactersService.js";

/**
 * Tabla de ventajas de razas en combate
 * "vida" = +20% daño directo a la vida
 * "escudo" = +25% daño al escudo
 * "normal" = sin ventaja
 */
const RACE_ADVANTAGES = {
	// Orcos: brutales y fuertes, ventaja contra Humanos y Elfos
	orco: {
		humano: "vida",
		elfo: "vida",
	},
	// Enanos: expertos defensivos, daño extra al escudo
	enano: {
		orco: "escudo",
		elfo: "escudo",
		humano: "escudo",
		tiefling: "escudo",
		semielfo: "escudo",
		enano: "escudo", // Incluso contra otros enanos
	},
	// Elfos: ágiles y mágicos, ventaja contra razas demoníacas/sanguíneas
	elfo: {
		tiefling: "vida",
	},
	// Tiefling: magia oscura, ventaja contra Humanos y Semielfos
	tiefling: {
		humano: "vida",
		semielfo: "vida",
	},
	// Semielfos: adaptabilidad, sin ventajas especiales
	semielfo: {},
	// Humanos: equilibrados, sin ventajas sobresalientes
	humano: {},
};

/**
 * Obtiene la ventaja de combate entre dos razas
 * @param {string} razaAtacante - Raza del personaje que ataca
 * @param {string} razaDefensor - Raza del personaje que defiende
 * @returns {string} "vida", "escudo" o "normal"
 */
function getRaceAdvantage(razaAtacante, razaDefensor) {
	if (!razaAtacante || !razaDefensor) return "normal";

	// Normalizar nombres de razas a minúsculas para comparación
	const razaAtacanteNorm = razaAtacante.toLowerCase().trim();
	const razaDefensorNorm = razaDefensor.toLowerCase().trim();

	// Buscar ventaja en la tabla
	const ventajas = RACE_ADVANTAGES[razaAtacanteNorm];
	if (ventajas && ventajas[razaDefensorNorm]) {
		return ventajas[razaDefensorNorm];
	}

	return "normal";
}

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

			// 5.5. Obtener ventajas de razas
			const ventajaRetador = getRaceAdvantage(retador.race, retado.race);
			const ventajaRetado = getRaceAdvantage(retado.race, retador.race);

			// 6. Calcular amortiguación del escudo y daño efectivo
			// Factor aleatorio entre 0 y 0.2 para cada escudo
			const factorEscudoRetador = Math.random() * 0.2; // 0 a 0.2
			const factorEscudoRetado = Math.random() * 0.2; // 0 a 0.2

			// Escudo efectivo = escudo * factor aleatorio
			// Redondear hacia abajo para obtener un entero
			const escudoEfectivoRetador = Math.floor(shieldRetadorAntes * factorEscudoRetador);
			const escudoEfectivoRetado = Math.floor(shieldRetadoAntes * factorEscudoRetado);

			// Calcular daño bruto considerando ventaja "escudo" (+25% daño al escudo)
			let dañoContraEscudoRetador = dadoRetado;
			let dañoContraEscudoRetado = dadoRetador;

			// Aplicar ventaja "escudo" si corresponde (+25% daño al escudo)
			if (ventajaRetado === "escudo" && shieldRetadorAntes > 0) {
				// El retado tiene ventaja contra el escudo del retador
				// Aumentar el daño al escudo en 25%
				dañoContraEscudoRetador = Math.floor(dadoRetado * 1.25);
			}

			if (ventajaRetador === "escudo" && shieldRetadoAntes > 0) {
				// El retador tiene ventaja contra el escudo del retado
				// Aumentar el daño al escudo en 25%
				dañoContraEscudoRetado = Math.floor(dadoRetador * 1.25);
			}

			// Daño efectivo = max(0, daño_contra_escudo - escudo_efectivo)
			// Redondear hacia abajo para obtener un entero
			let dañoEfectivoRetador = Math.floor(Math.max(0, dañoContraEscudoRetador - escudoEfectivoRetador));
			let dañoEfectivoRetado = Math.floor(Math.max(0, dañoContraEscudoRetado - escudoEfectivoRetado));

			// Aplicar ventaja "vida" si corresponde (+20% daño directo a la vida)
			let dañoExtraVidaRetador = 0;
			let dañoExtraVidaRetado = 0;

			if (ventajaRetado === "vida") {
				// El retado tiene ventaja de daño directo a la vida del retador
				dañoExtraVidaRetador = Math.floor(dañoEfectivoRetador * 0.20);
				dañoEfectivoRetador = dañoEfectivoRetador + dañoExtraVidaRetador;
			}

			if (ventajaRetador === "vida") {
				// El retador tiene ventaja de daño directo a la vida del retado
				dañoExtraVidaRetado = Math.floor(dañoEfectivoRetado * 0.20);
				dañoEfectivoRetado = dañoEfectivoRetado + dañoExtraVidaRetado;
			}

			// Asegurar que los valores finales sean enteros
			dañoEfectivoRetador = Math.floor(dañoEfectivoRetador);
			dañoEfectivoRetado = Math.floor(dañoEfectivoRetado);

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
						race: retador.race,
						hpAntes: hpRetadorAntes,
						hpDespues: nuevoHpRetador,
						dado: dadoRetador,
						dañoBrutoRecibido: dadoRetado,
						escudo: shieldRetadorAntes,
						escudoEfectivo: escudoEfectivoRetador,
						dañoEfectivoRecibido: dañoEfectivoRetador,
						ventajaAplicada: ventajaRetador,
						dañoExtraVida: dañoExtraVidaRetado,
					},
					retado: {
						id: retadoId,
						name: retado.name,
						race: retado.race,
						hpAntes: hpRetadoAntes,
						hpDespues: nuevoHpRetado,
						dado: dadoRetado,
						dañoBrutoRecibido: dadoRetador,
						escudo: shieldRetadoAntes,
						escudoEfectivo: escudoEfectivoRetado,
						dañoEfectivoRecibido: dañoEfectivoRetado,
						ventajaAplicada: ventajaRetado,
						dañoExtraVida: dañoExtraVidaRetador,
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

	/**
	 * Obtiene la última batalla de un personaje específico
	 * @param {string} characterId - ID del personaje
	 * @param {string} userId - ID del usuario autenticado
	 * @returns {Object} Resultado de la operación con datos de la última batalla
	 */
	async getLastBattle(characterId, userId) {
		try {
			const supabase = SupaBaseConnection.getInstance();

			// 1. Verificar que el personaje existe y pertenece al usuario
			const { data: character, error: errorCharacter } = await supabase
				.from("characters")
				.select("id, name, user_id")
				.eq("id", characterId)
				.single();

			if (errorCharacter || !character) {
				return {
					success: false,
					error: "Personaje no encontrado",
					code: "CHARACTER_NOT_FOUND",
				};
			}

			// 2. Verificar que el personaje pertenece al usuario autenticado
			if (character.user_id !== userId) {
				return {
					success: false,
					error: "No tienes permiso para ver las batallas de este personaje",
					code: "UNAUTHORIZED",
				};
			}

			// 3. Buscar la última batalla donde el personaje participó (como retador o retado)
			const { data: battles, error: errorBattles } = await supabase
				.from("battles")
				.select(`
					id_pelea,
					date_time_pelea,
					id_personaje_retador,
					id_personaje_retado,
					resultado_dados_personaje_retador,
					resultado_dados_personaje_retado
				`)
				.or(`id_personaje_retador.eq.${characterId},id_personaje_retado.eq.${characterId}`)
				.order("date_time_pelea", { ascending: false })
				.limit(1);

			if (errorBattles) {
				return {
					success: false,
					error: "Error al buscar batallas",
					details: errorBattles.message,
				};
			}

			if (!battles || battles.length === 0) {
				return {
					success: false,
					error: "Este personaje no tiene batallas registradas",
					code: "NO_BATTLES_FOUND",
				};
			}

			const battle = battles[0];

			// 4. Determinar si el personaje fue retador o retado
			const wasChallenger = battle.id_personaje_retador === characterId;
			const opponentId = wasChallenger
				? battle.id_personaje_retado
				: battle.id_personaje_retador;

			// 5. Obtener datos del oponente
			const { data: opponent, error: errorOpponent } = await supabase
				.from("characters")
				.select("id, name")
				.eq("id", opponentId)
				.single();

			if (errorOpponent || !opponent) {
				return {
					success: false,
					error: "Error al obtener información del oponente",
					details: errorOpponent?.message,
				};
			}

			// 6. Calcular daño recibido y daño infligido
			const characterDice = wasChallenger
				? battle.resultado_dados_personaje_retador
				: battle.resultado_dados_personaje_retado;

			const opponentDice = wasChallenger
				? battle.resultado_dados_personaje_retado
				: battle.resultado_dados_personaje_retador;

			const damageReceived = opponentDice; // El daño recibido es el resultado de los dados del oponente
			const damageDealt = characterDice; // El daño infligido es el resultado de los dados del personaje

			// 7. Determinar quién ganó (mayor resultado de dados)
			const wonBattle = characterDice > opponentDice;

			// 8. Construir respuesta
			return {
				success: true,
				data: {
					battleId: battle.id_pelea,
					dateTimePelea: battle.date_time_pelea,
					character: {
						id: character.id,
						name: character.name,
						wonBattle: wonBattle,
						damageReceived: damageReceived,
						damageDealt: damageDealt,
						diceResult: characterDice,
					},
					opponent: {
						id: opponent.id,
						name: opponent.name,
						diceResult: opponentDice,
					},
				},
			};
		} catch (error) {
			return {
				success: false,
				error: "Error al obtener la última batalla",
				details: error.message,
			};
		}
	},
};







import SupaBaseConnection from "../database/supabase.cnx.js";

export const statisticsService = {
	/**
	 * Obtiene todas las estadísticas públicas del sistema
	 * @returns {Promise<Object>} Estadísticas públicas del sistema
	 */
	async getPublicStatistics() {
		try {
			const supabase = SupaBaseConnection.connect();

			// 1. Totales: usuarios, personajes, batallas
			const [usuariosResult, personajesResult, batallasResult] = await Promise.all([
				supabase.from("usuarios").select("id", { count: "exact", head: true }),
				supabase.from("characters").select("id", { count: "exact", head: true }),
				supabase.from("battles").select("id_pelea", { count: "exact", head: true }),
			]);

			const totalUsuarios = usuariosResult.count || 0;
			const totalPersonajes = personajesResult.count || 0;
			const totalBatallas = batallasResult.count || 0;

			// 2. Leaderboard de usuarios con más batallas (top 10)
			// Contar batallas como retador y retado
			const { data: battlesData, error: battlesError } = await supabase
				.from("battles")
				.select("id_personaje_retador, id_personaje_retado");

			let usuariosMasBatallas = [];
			if (!battlesError && battlesData && battlesData.length > 0) {
				// Obtener todos los personajes únicos involucrados
				const characterIds = new Set();
				battlesData.forEach((battle) => {
					if (battle.id_personaje_retador) characterIds.add(battle.id_personaje_retador);
					if (battle.id_personaje_retado) characterIds.add(battle.id_personaje_retado);
				});

				// Obtener los user_id de todos los personajes
				const { data: charactersData, error: charactersError } = await supabase
					.from("characters")
					.select("id, user_id")
					.in("id", Array.from(characterIds));

				if (!charactersError && charactersData) {
					// Crear mapa de character_id -> user_id
					const characterToUser = {};
					charactersData.forEach((char) => {
						if (char.id && char.user_id) {
							characterToUser[char.id] = char.user_id;
						}
					});

					// Contar batallas por usuario
					const usuarioBatallas = {};
					battlesData.forEach((battle) => {
						const retadorUserId = characterToUser[battle.id_personaje_retador];
						const retadoUserId = characterToUser[battle.id_personaje_retado];

						if (retadorUserId) {
							usuarioBatallas[retadorUserId] = (usuarioBatallas[retadorUserId] || 0) + 1;
						}
						if (retadoUserId) {
							usuarioBatallas[retadoUserId] = (usuarioBatallas[retadoUserId] || 0) + 1;
						}
					});

					// Obtener información de usuarios y ordenar
					const userIds = Object.keys(usuarioBatallas);
					if (userIds.length > 0) {
						const { data: usuariosData, error: usuariosError } = await supabase
							.from("usuarios")
							.select("id, nombre, email")
							.in("id", userIds);

						if (!usuariosError && usuariosData) {
							usuariosMasBatallas = usuariosData
								.map((usuario) => ({
									usuarioId: usuario.id,
									nombre: usuario.nombre,
									email: usuario.email,
									totalBatallas: usuarioBatallas[usuario.id],
								}))
								.sort((a, b) => b.totalBatallas - a.totalBatallas)
								.slice(0, 10);
						}
					}
				}
			}

			// 3. Top 5 razas más populares
			const { data: razasData, error: razasError } = await supabase
				.from("characters")
				.select("race")
				.not("race", "is", null);

			let razasPopulares = [];
			if (!razasError && razasData && razasData.length > 0) {
				const razasCount = {};
				razasData.forEach((char) => {
					if (char.race) {
						razasCount[char.race] = (razasCount[char.race] || 0) + 1;
					}
				});

				razasPopulares = Object.entries(razasCount)
					.map(([race, cantidad]) => ({ race, cantidad }))
					.sort((a, b) => b.cantidad - a.cantidad)
					.slice(0, 5);
			}

			// 4. Top 5 clases más populares
			const { data: clasesData, error: clasesError } = await supabase
				.from("characters")
				.select("class_name")
				.not("class_name", "is", null);

			let clasesPopulares = [];
			if (!clasesError && clasesData && clasesData.length > 0) {
				const clasesCount = {};
				clasesData.forEach((char) => {
					if (char.class_name) {
						clasesCount[char.class_name] = (clasesCount[char.class_name] || 0) + 1;
					}
				});

				clasesPopulares = Object.entries(clasesCount)
					.map(([clase, cantidad]) => ({ clase, cantidad }))
					.sort((a, b) => b.cantidad - a.cantidad)
					.slice(0, 5);
			}

			// 5. Top 5 reinos más populares
			const { data: reinosData, error: reinosError } = await supabase
				.from("characters")
				.select("kingdom")
				.not("kingdom", "is", null);

			let reinosPopulares = [];
			if (!reinosError && reinosData && reinosData.length > 0) {
				const reinosCount = {};
				reinosData.forEach((char) => {
					if (char.kingdom) {
						reinosCount[char.kingdom] = (reinosCount[char.kingdom] || 0) + 1;
					}
				});

				reinosPopulares = Object.entries(reinosCount)
					.map(([reino, cantidad]) => ({ reino, cantidad }))
					.sort((a, b) => b.cantidad - a.cantidad)
					.slice(0, 5);
			}

			// 6. Top 5 guilds más populares
			const { data: guildsData, error: guildsError } = await supabase
				.from("characters")
				.select("guild")
				.not("guild", "is", null);

			let guildsPopulares = [];
			if (!guildsError && guildsData && guildsData.length > 0) {
				const guildsCount = {};
				guildsData.forEach((char) => {
					if (char.guild) {
						guildsCount[char.guild] = (guildsCount[char.guild] || 0) + 1;
					}
				});

				guildsPopulares = Object.entries(guildsCount)
					.map(([guild, cantidad]) => ({ guild, cantidad }))
					.sort((a, b) => b.cantidad - a.cantidad)
					.slice(0, 5);
			}

			// 7. Promedio de nivel de personajes
			const { data: nivelesData, error: nivelesError } = await supabase
				.from("characters")
				.select("level");

			let promedioNivel = 0;
			if (!nivelesError && nivelesData && nivelesData.length > 0) {
				const sumaNiveles = nivelesData.reduce((sum, char) => sum + (char.level || 0), 0);
				promedioNivel = sumaNiveles / nivelesData.length;
				// Redondear a 2 decimales
				promedioNivel = Math.round(promedioNivel * 100) / 100;
			}

			// 8. Personajes online vs offline
			const { data: allCharactersStatus, error: statusError } = await supabase
				.from("characters")
				.select("is_online");

			let online = 0;
			let offline = 0;
			if (!statusError && allCharactersStatus) {
				allCharactersStatus.forEach((char) => {
					if (char.is_online === true) {
						online++;
					} else {
						offline++;
					}
				});
			}

			// 9. Usuarios con más personajes creados (top 5)
			const { data: personajesPorUsuarioData, error: personajesPorUsuarioError } =
				await supabase.from("characters").select("user_id");

			let usuariosMasPersonajes = [];
			if (!personajesPorUsuarioError && personajesPorUsuarioData && personajesPorUsuarioData.length > 0) {
				const usuariosPersonajesCount = {};
				personajesPorUsuarioData.forEach((char) => {
					if (char.user_id) {
						usuariosPersonajesCount[char.user_id] =
							(usuariosPersonajesCount[char.user_id] || 0) + 1;
					}
				});

				const userIdsMasPersonajes = Object.keys(usuariosPersonajesCount)
					.sort((a, b) => usuariosPersonajesCount[b] - usuariosPersonajesCount[a])
					.slice(0, 5);

				if (userIdsMasPersonajes.length > 0) {
					const { data: usuariosMasPersonajesData, error: usuariosError } =
						await supabase
							.from("usuarios")
							.select("id, nombre, email")
							.in("id", userIdsMasPersonajes);

					if (!usuariosError && usuariosMasPersonajesData) {
						usuariosMasPersonajes = usuariosMasPersonajesData
							.map((usuario) => ({
								usuarioId: usuario.id,
								nombre: usuario.nombre,
								email: usuario.email,
								totalPersonajes: usuariosPersonajesCount[usuario.id],
							}))
							.sort((a, b) => b.totalPersonajes - a.totalPersonajes);
					}
				}
			}

			return {
				success: true,
				data: {
					totales: {
						usuarios: totalUsuarios,
						personajes: totalPersonajes,
						batallas: totalBatallas,
					},
					leaderboard: {
						usuariosMasBatallas: usuariosMasBatallas,
						usuariosMasPersonajes: usuariosMasPersonajes,
					},
					razas: razasPopulares,
					clases: clasesPopulares,
					reinos: reinosPopulares,
					guilds: guildsPopulares,
					metricas: {
						promedioNivel: promedioNivel,
						personajesOnline: online,
						personajesOffline: offline,
					},
				},
			};
		} catch (error) {
			console.error("Error al obtener estadísticas:", error);
			return {
				success: false,
				error: "Error al obtener estadísticas",
				details: error.message,
			};
		}
	},
};

import SupaBaseConnection from "../database/supabase.cnx.js";

// Función helper para mapear datos de snake_case (DB) a camelCase (API)
function mapDbToApi(dbData) {
	if (!dbData) return null;
	if (Array.isArray(dbData)) {
		return dbData.map(mapDbToApi);
	}
	return {
		id: dbData.id,
		userId: dbData.user_id,
		createdAt: dbData.created_at,
		name: dbData.name,
		avatar: dbData.avatar,
		race: dbData.race,
		class: dbData.class_name,
		guild: dbData.guild,
		hp: dbData.hp,
		shield: dbData.shield,
		level: dbData.level,
		isOnline: dbData.is_online,
		kingdom: dbData.kingdom,
	};
}

export const charactersService = {
	// Obtener todos los personajes
	async getAllCharacters() {
		try {
			const { data, error } = await SupaBaseConnection.connect()
				.from("characters")
				.select("*")
				.order("created_at", { ascending: false });

			if (error) {
				return {
					success: false,
					error: "Error al obtener personajes",
					details: error.message,
				};
			}

			const mappedData = mapDbToApi(data || []);
			return { success: true, data: mappedData };
		} catch (error) {
			return {
				success: false,
				error: "Error al obtener personajes",
				details: error.message,
			};
		}
	},

	// Obtener un personaje por ID
	async getCharacterById(id) {
		try {
			const { data, error } = await SupaBaseConnection.connect()
				.from("characters")
				.select("*")
				.eq("id", id)
				.single();

			if (error) {
				if (error.code === "PGRST116") {
					return {
						success: false,
						error: "Personaje no encontrado",
						code: "CHARACTER_NOT_FOUND",
					};
				}
				return {
					success: false,
					error: "Error al buscar personaje",
					details: error.message,
				};
			}

			const mappedData = mapDbToApi(data);
			return { success: true, data: mappedData };
		} catch (error) {
			return {
				success: false,
				error: "Error al buscar personaje",
				details: error.message,
			};
		}
	},

	// Obtener todos los personajes de un usuario
	async getCharactersByUserId(userId) {
		try {
			const { data, error } = await SupaBaseConnection.connect()
				.from("characters")
				.select("*")
				.eq("user_id", userId)
				.order("created_at", { ascending: false });

			if (error) {
				return {
					success: false,
					error: "Error al obtener personajes del usuario",
					details: error.message,
				};
			}

			const mappedData = mapDbToApi(data || []);
			return { success: true, data: mappedData };
		} catch (error) {
			return {
				success: false,
				error: "Error al obtener personajes del usuario",
				details: error.message,
			};
		}
	},

	// Crear un nuevo personaje
	async createCharacter(characterData) {
		try {
			const supabase = SupaBaseConnection.connect();
			// Verificar que el usuario existe
			const { data: usuario, error: usuarioError } = await supabase
				.from("usuarios")
				.select("id")
				.eq("id", characterData.userId)
				.single();

			if (usuarioError || !usuario) {
				return {
					success: false,
					error: "Usuario no encontrado",
					code: "USER_NOT_FOUND",
				};
			}

			// Preparar datos para insertar (mapear class a class_name)
			const insertData = {
				user_id: characterData.userId,
				name: characterData.name,
				avatar: characterData.avatar || null,
				race: characterData.race || null,
				class_name: characterData.class || null,
				guild: characterData.guild || null,
				hp: characterData.hp || 0,
				shield: characterData.shield || 0,
				level: characterData.level || 1,
				is_online: characterData.isOnline !== undefined ? characterData.isOnline : false,
				kingdom: characterData.kingdom || null,
			};

			const { data, error } = await supabase
				.from("characters")
				.insert(insertData)
				.select()
				.single();

			if (error) {
				return {
					success: false,
					error: "Error al crear personaje",
					details: error.message,
				};
			}

			const mappedData = mapDbToApi(data);
			return { success: true, data: mappedData };
		} catch (error) {
			return {
				success: false,
				error: "Error al crear personaje",
				details: error.message,
			};
		}
	},

	// Actualizar un personaje
	async updateCharacter(id, characterData) {
		try {
			const supabase = SupaBaseConnection.connect();
			// Verificar que el personaje existe
			const existingCharacter = await this.getCharacterById(id);
			if (!existingCharacter.success) {
				return existingCharacter;
			}

			// Preparar datos para actualizar
			const updateData = {};
			if (characterData.name !== undefined) updateData.name = characterData.name;
			if (characterData.avatar !== undefined) updateData.avatar = characterData.avatar;
			if (characterData.race !== undefined) updateData.race = characterData.race;
			if (characterData.class !== undefined) updateData.class_name = characterData.class;
			if (characterData.guild !== undefined) updateData.guild = characterData.guild;
			if (characterData.hp !== undefined) updateData.hp = characterData.hp;
			if (characterData.shield !== undefined) updateData.shield = characterData.shield;
			if (characterData.level !== undefined) updateData.level = characterData.level;
			if (characterData.isOnline !== undefined) updateData.is_online = characterData.isOnline;
			if (characterData.kingdom !== undefined) updateData.kingdom = characterData.kingdom;
			if (characterData.userId !== undefined) updateData.user_id = characterData.userId;

			// Si se actualiza el userId, verificar que el usuario existe
			if (characterData.userId) {
				const { data: usuario, error: usuarioError } = await supabase
					.from("usuarios")
					.select("id")
					.eq("id", characterData.userId)
					.single();

				if (usuarioError || !usuario) {
					return {
						success: false,
						error: "Usuario no encontrado",
						code: "USER_NOT_FOUND",
					};
				}
			}

			const { data, error } = await supabase
				.from("characters")
				.update(updateData)
				.eq("id", id)
				.select()
				.single();

			if (error) {
				return {
					success: false,
					error: "Error al actualizar personaje",
					details: error.message,
				};
			}

			const mappedData = mapDbToApi(data);
			return { success: true, data: mappedData };
		} catch (error) {
			return {
				success: false,
				error: "Error al actualizar personaje",
				details: error.message,
			};
		}
	},

	// Eliminar un personaje
	async deleteCharacter(id) {
		try {
			// Verificar que el personaje existe y obtener sus datos
			const existingCharacter = await this.getCharacterById(id);
			if (!existingCharacter.success) {
				return existingCharacter;
			}

			const { error } = await SupaBaseConnection.connect()
				.from("characters")
				.delete()
				.eq("id", id);

			if (error) {
				return {
					success: false,
					error: "Error al eliminar personaje",
					details: error.message,
				};
			}

			// existingCharacter.data ya está mapeado por getCharacterById
			return { success: true, data: existingCharacter.data };
		} catch (error) {
			return {
				success: false,
				error: "Error al eliminar personaje",
				details: error.message,
			};
		}
	},
};


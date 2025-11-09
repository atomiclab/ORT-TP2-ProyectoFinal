//Migrado al todo poderoso a Supabase

import SupaBaseConnection from "../database/supabase.cnx.js";

// Función helper para mapear datos de snake_case (DB) a camelCase (API)
function mapDbToApi(dbData) {
	if (!dbData) return null;
	if (Array.isArray(dbData)) {
		return dbData.map(mapDbToApi);
	}
	return {
		id: dbData.id,
		nombre: dbData.nombre,
		email: dbData.email,
		telefono: dbData.telefono || "",
		edad: dbData.edad || 0,
		activo: dbData.activo !== undefined ? dbData.activo : true,
		fechaCreacion: dbData.fecha_creacion
			? typeof dbData.fecha_creacion === "string"
				? dbData.fecha_creacion.split("T")[0]
				: new Date(dbData.fecha_creacion).toISOString().split("T")[0]
			: new Date().toISOString().split("T")[0],
		password: dbData.password || null,
	};
}

export const usuariosService = {
	async getAllUsuarios() {
		try {
			const { data, error } = await SupaBaseConnection.connect()
				.from("usuarios")
				.select("*")
				.order("created_at", { ascending: false });

			if (error) {
				return {
					success: false,
					error: "Error al obtener usuarios",
					details: error.message,
				};
			}

			const mappedData = mapDbToApi(data || []);
			return { success: true, data: mappedData };
		} catch (error) {
			return {
				success: false,
				error: "Error al leer usuarios",
				details: error.message,
			};
		}
	},

	async getUsuarioById(id) {
		try {
			const { data, error } = await SupaBaseConnection.connect()
				.from("usuarios")
				.select("*")
				.eq("id", id)
				.single();

			if (error) {
				if (error.code === "PGRST116") {
					return {
						success: false,
						error: "Usuario no encontrado",
						code: "USER_NOT_FOUND",
					};
				}
				return {
					success: false,
					error: "Error al buscar usuario",
					details: error.message,
				};
			}

			const mappedData = mapDbToApi(data);
			return { success: true, data: mappedData };
		} catch (error) {
			return {
				success: false,
				error: "Error al buscar usuario",
				details: error.message,
			};
		}
	},

	async createUsuario(usuarioData) {
		try {
			const supabase = SupaBaseConnection.connect();
			
			// Verificar si el email ya existe
			const { data: existingUser, error: checkError } = await supabase
				.from("usuarios")
				.select("id")
				.eq("email", usuarioData.email)
				.maybeSingle();

			if (checkError && checkError.code !== "PGRST116") {
				console.error("Error al verificar email:", checkError);
				return {
					success: false,
					error: "Error al verificar email",
					details: checkError.message,
				};
			}

			if (existingUser) {
				return {
					success: false,
					error: "El email ya existe",
					code: "EMAIL_EXISTS",
				};
			}

			// Preparar datos para insertar
			const insertData = {
				nombre: usuarioData.nombre,
				email: usuarioData.email,
				telefono: usuarioData.telefono || "",
				edad: usuarioData.edad || 0,
				activo:
					usuarioData.activo !== undefined ? usuarioData.activo : true,
				password: usuarioData.password || null,
			};

			// Solo agregar fecha_creacion si se proporciona explícitamente
			// Si no, la BD usará el DEFAULT CURRENT_DATE
			if (usuarioData.fechaCreacion) {
				insertData.fecha_creacion = usuarioData.fechaCreacion;
			}

			const { data, error } = await supabase
				.from("usuarios")
				.insert(insertData)
				.select()
				.single();

			if (error) {
				console.error("Error de Supabase al crear usuario:", error);
				// Manejar error de email duplicado
				if (error.code === "23505") {
					return {
						success: false,
						error: "El email ya existe",
						code: "EMAIL_EXISTS",
					};
				}
				// Manejar error de tabla no encontrada
				if (error.code === "42P01" || error.message?.includes("relation") || error.message?.includes("does not exist")) {
					return {
						success: false,
						error: "Tabla de usuarios no encontrada",
						details: "La tabla 'usuarios' no existe en Supabase. Ejecuta el script init_db.sql primero.",
					};
				}
				return {
					success: false,
					error: "Error al crear usuario en la base de datos",
					details: error.message,
					code: error.code,
				};
			}

			const mappedData = mapDbToApi(data);
			return { success: true, data: mappedData };
		} catch (error) {
			console.error("Error inesperado al crear usuario:", error);
			return {
				success: false,
				error: "Error inesperado al crear usuario",
				details: error.message,
			};
		}
	},

	async updateUsuario(id, usuarioData) {
		try {
			const supabase = SupaBaseConnection.connect();
			// Verificar que el usuario existe
			const existingUser = await this.getUsuarioById(id);
			if (!existingUser.success) {
				return existingUser;
			}

			// Validar email único (si se está cambiando)
			if (usuarioData.email && usuarioData.email !== existingUser.data.email) {
				const { data: emailCheck } = await supabase
					.from("usuarios")
					.select("id")
					.eq("email", usuarioData.email)
					.maybeSingle();

				if (emailCheck) {
					return {
						success: false,
						error: "El email ya existe",
						code: "EMAIL_EXISTS",
					};
				}
			}

			// Preparar datos para actualizar
			const updateData = {};
			if (usuarioData.nombre !== undefined)
				updateData.nombre = usuarioData.nombre;
			if (usuarioData.email !== undefined) updateData.email = usuarioData.email;
			if (usuarioData.telefono !== undefined)
				updateData.telefono = usuarioData.telefono;
			if (usuarioData.edad !== undefined) updateData.edad = usuarioData.edad;
			if (usuarioData.activo !== undefined)
				updateData.activo = usuarioData.activo;
			if (usuarioData.fechaCreacion !== undefined)
				updateData.fecha_creacion = usuarioData.fechaCreacion;
			if (usuarioData.password !== undefined)
				updateData.password = usuarioData.password;

			const { data, error } = await supabase
				.from("usuarios")
				.update(updateData)
				.eq("id", id)
				.select()
				.single();

			if (error) {
				// Manejar error de email duplicado
				if (error.code === "23505") {
					return {
						success: false,
						error: "El email ya existe",
						code: "EMAIL_EXISTS",
					};
				}
				return {
					success: false,
					error: "Error al actualizar usuario",
					details: error.message,
				};
			}

			const mappedData = mapDbToApi(data);
			return { success: true, data: mappedData };
		} catch (error) {
			return {
				success: false,
				error: "Error al actualizar usuario",
				details: error.message,
			};
		}
	},

	async deleteUsuario(id) {
		try {
			// Verificar que el usuario existe y obtener sus datos
			const existingUser = await this.getUsuarioById(id);
			if (!existingUser.success) {
				return existingUser;
			}

			const { error } = await SupaBaseConnection.connect()
				.from("usuarios")
				.delete()
				.eq("id", id);

			if (error) {
				return {
					success: false,
					error: "Error al eliminar usuario",
					details: error.message,
				};
			}

			// existingUser.data ya está mapeado por getUsuarioById
			return { success: true, data: existingUser.data };
		} catch (error) {
			return {
				success: false,
				error: "Error al eliminar usuario",
				details: error.message,
			};
		}
	},

	// Buscar usuarios por email
	async getUsuarioByEmail(email) {
		try {
			const { data, error } = await SupaBaseConnection.connect()
				.from("usuarios")
				.select("*")
				.eq("email", email)
				.single();

			if (error) {
				if (error.code === "PGRST116") {
					return {
						success: false,
						error: "Usuario no encontrado",
						code: "USER_NOT_FOUND",
					};
				}
				return {
					success: false,
					error: "Error al buscar usuario",
					details: error.message,
				};
			}

			const mappedData = mapDbToApi(data);
			return { success: true, data: mappedData };
		} catch (error) {
			return {
				success: false,
				error: "Error al buscar usuario",
				details: error.message,
			};
		}
	},
};

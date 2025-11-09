import { createClient } from "@supabase/supabase-js";
import { config } from "../config/config.js";

class SupaBaseConnection {
	static #instance = null;

	/**
	 * Conecta a Supabase o retorna la instancia existente
	 * Puede ser llamado múltiples veces sin problema
	 * @returns {Object} Instancia de Supabase client
	 */
	static connect() {
		if (!SupaBaseConnection.#instance) {
			if (!config.SUPABASE_URL || !config.SUPABASE_API_KEY) {
				throw new Error(
					"Supabase no está configurado. Verifica las variables de entorno SUPABASE_URL y SUPABASE_API_KEY, agarra el archivo .env.example y copia el contenido a un archivo .env del grupo de whatsap!!",
				);
			}
			SupaBaseConnection.#instance = createClient(
				config.SUPABASE_URL,
				config.SUPABASE_API_KEY,
			);
			console.log("Supabase connected");
		}
		return SupaBaseConnection.#instance;
	}

	/**
	 * Obtiene la instancia de Supabase (alias de connect para compatibilidad)
	 * @returns {Object} Instancia de Supabase client
	 */
	static getInstance() {
		return SupaBaseConnection.connect();
	}
}

export default SupaBaseConnection;

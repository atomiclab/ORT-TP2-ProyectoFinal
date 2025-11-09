import { createClient } from "@supabase/supabase-js";
import { config } from "../config/config.js";

class SupaBaseConnection {
	static #instance = null;

	static connect() {
		if (!SupaBaseConnection.#instance) {
			SupaBaseConnection.#instance = createClient(
				config.SUPABASE_URL,
				config.SUPABASE_API_KEY,
			);
			console.log("Supabase connected");
		}
		return SupaBaseConnection.#instance;
	}

	// Método para obtener la instancia sin inicializar
	static getInstance() {
		if (!SupaBaseConnection.#instance) {
			throw new Error("Supabase no está conectado. Falta llamar a connect().");
		}
		return SupaBaseConnection.#instance;
	}


}

export default SupaBaseConnection;

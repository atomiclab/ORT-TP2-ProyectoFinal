import dotenv from "dotenv";

dotenv.config();

const {
	MONGO_URI,
	SUPABASE_URL,
	SUPABASE_API_KEY,
	DATABASE,
	SERVER_PORT,
	SERVER_HOST,
} = process.env;

// Error por si no tenemos el .env
if (!SUPABASE_URL || !SUPABASE_API_KEY) {
	console.warn("⚠️  ADVERTENCIA: SUPABASE_URL o SUPABASE_API_KEY no están definidas en .env");
}
export const config = {
	SUPABASE_URL,
	SUPABASE_API_KEY,
	DATABASE,
	MONGO_URI,
	SERVER_PORT,
	SERVER_HOST,
};

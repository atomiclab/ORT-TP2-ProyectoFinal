import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { productosRouter } from "./routes/productosRoutes.js";
import { usuariosExternosRouter } from "./routes/usuariosExternosRoutes.js";
import { usuariosRouter } from "./routes/usuariosRoutes.js";
import { authRouter } from "./routes/authRoutes.js";
import { charactersRouter } from "./routes/charactersRoutes.js";
import SupaBaseConnection from "./database/supabase.cnx.js";


const PORT = process.env.PORT || 3003;
const HOST = process.env.HOST || "127.0.0.1";

SupaBaseConnection.connect();
//PD: No tenemos un archivo .env pedido, pero se puede agregar para no tener que hardcodear los valores superiores.

const app = express();

// Configuración de CORS
const allowedOrigins = process.env.ALLOWED_ORIGINS
	? process.env.ALLOWED_ORIGINS.split(",").map((origin) => origin.trim())
	: [
			"http://localhost:5173",
			"http://localhost:3000",
			"http://localhost:5174",
		];

const corsOptions = {
	origin: (origin, callback) => {
		// Permitir requests sin origin (como mobile apps o Postman)
		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true);
		} else {
			callback(null, false);
		}
	},
	credentials: true, // Permitir cookies/credenciales
	methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization"],
	optionsSuccessStatus: 200, // Para navegadores legacy que fallan con 204
};

app.use(cors(corsOptions));

// Rate limiting general
const generalLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutos
	max: 100, // máximo 100 requests por ventana por IP
	message: {
		success: false,
		error: "Demasiadas solicitudes desde esta IP, por favor intenta de nuevo más tarde.",
	},
	standardHeaders: true, // Retorna información del rate limit en los headers `RateLimit-*`
	legacyHeaders: false, // Deshabilita los headers `X-RateLimit-*`
});

// Rate limiting para autenticación (más estricto)
const authLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutos
	max: 5, // máximo 5 intentos de login por ventana por IP
	message: {
		success: false,
		error: "Demasiados intentos de autenticación desde esta IP, por favor intenta de nuevo más tarde.",
	},
	standardHeaders: true,
	legacyHeaders: false,
	skipSuccessfulRequests: true, // No cuenta requests exitosos
});

// Aplicar rate limiting general
app.use(generalLimiter);

// Middleware para debugguear, se rompio todo intentando poner el jwt
app.use((req, res, next) => {
	console.log(`Logging: ${req.method} ${req.originalUrl}`);
	next();
});

app.use(morgan(process.env.LOG_LEVEL || "combined"));
app.use(express.json());

// Routes
app.use("/api/productos", productosRouter); //ojo!! hay que sacarla porque no la usamos
app.use("/api/usuarios-externos", usuariosExternosRouter); //idem, no nos interesa
app.use("/api/usuarios", usuariosRouter);
app.use("/api/auth", authLimiter, authRouter); // Rate limiting estricto para autenticación
app.use("/api/characters", charactersRouter);

// Ruta de prueba
app.get("/", (_req, res) => {
	res.json({
		status: 200,
		message: "API funcionando correctamente",
	});
});
//Ruta no encontrada
app.use((req, res, next) => {
	console.log(`❌ Ruta no encontrada: ${req.method} ${req.originalUrl}`);
	res.status(404).json({
		success: false,
		error: `Ruta ${req.method} ${req.originalUrl} no encontrada`,
	});
});

// Manejo de errores
app.use((err, _req, res, _next) => {
	console.error(err.stack);
	res.status(500).json({
		status: 500,
		error: "Algo salió mal!",
	});
});

app.listen(PORT, () => {
	console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
});

export default app;

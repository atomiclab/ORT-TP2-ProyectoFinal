import swaggerJsdoc from "swagger-jsdoc";

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "API REST - Proyecto Final TP2",
			version: "1.0.0",
			description:
				"Documentación de la API REST para el proyecto final del TP2. Incluye endpoints para autenticación, usuarios y personajes",
			contact: {
				name: "Gino Tubaro",
			},
		},
		servers: [
			{
				url: "http://localhost:3003",
				description: "Servidor de desarrollo local",
			},
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
					description: "Token JWT obtenido mediante el endpoint /api/auth/login",
				},
			},
			schemas: {
				Usuario: {
					type: "object",
					properties: {
						id: {
							type: "string",
							format: "uuid",
							description: "ID único del usuario",
						},
						nombre: {
							type: "string",
							description: "Nombre completo del usuario",
						},
						email: {
							type: "string",
							format: "email",
							description: "Email del usuario",
						},
						telefono: {
							type: "string",
							description: "Teléfono del usuario",
						},
						edad: {
							type: "integer",
							description: "Edad del usuario",
						},
						activo: {
							type: "boolean",
							description: "Estado activo/inactivo del usuario",
						},
						fechaCreacion: {
							type: "string",
							format: "date",
							description: "Fecha de creación del usuario",
						},
					},
				},
				Character: {
					type: "object",
					properties: {
						id: {
							type: "string",
							format: "uuid",
							description: "ID único del personaje",
						},
						userId: {
							type: "string",
							format: "uuid",
							description: "ID del usuario propietario",
						},
						name: {
							type: "string",
							description: "Nombre del personaje",
						},
						avatar: {
							type: "string",
							format: "uri",
							description: "URL del avatar del personaje",
						},
						race: {
							type: "string",
							description: "Raza del personaje",
						},
						class: {
							type: "string",
							description: "Clase del personaje",
						},
						guild: {
							type: "string",
							description: "Gremio del personaje",
						},
						hp: {
							type: "integer",
							description: "Puntos de vida",
						},
						shield: {
							type: "integer",
							description: "Puntos de escudo",
						},
						level: {
							type: "integer",
							description: "Nivel del personaje",
						},
						isOnline: {
							type: "boolean",
							description: "Estado online/offline",
						},
						kingdom: {
							type: "string",
							description: "Reino del personaje",
						},
						createdAt: {
							type: "string",
							format: "date-time",
							description: "Fecha de creación",
						},
					},
				},
				Error: {
					type: "object",
					properties: {
						status: {
							type: "integer",
							description: "Código de estado HTTP",
						},
						error: {
							type: "string",
							description: "Mensaje de error",
						},
						code: {
							type: "string",
							description: "Código de error específico",
						},
						message: {
							type: "string",
							description: "Mensaje descriptivo del error",
						},
					},
				},
				SuccessResponse: {
					type: "object",
					properties: {
						status: {
							type: "integer",
							description: "Código de estado HTTP",
						},
						data: {
							type: "object",
							description: "Datos de la respuesta",
						},
						message: {
							type: "string",
							description: "Mensaje de éxito",
						},
					},
				},
			},
		},
	},
	apis: ["./src/routes/*.js", "./src/app.js"],
};

export const swaggerSpec = swaggerJsdoc(options);


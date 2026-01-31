import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movie Management API",
      version: "1.0.0",
      description: "Role-based Movie Management API with JWT Authentication",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Movie: {
          type: "object",
          properties: {
            title: { type: "string" },
            genre: { type: "string" },
            releaseYear: { type: "number" },
            rating: { type: "number" },
            description: { type: "string" },
            posterUrl: { type: "string" },
            director: { type: "string" },
            durationMinutes: { type: "number" },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;

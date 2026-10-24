import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec =
  swaggerJsdoc({
    definition: {
      openapi: "3.0.0",

      info: {
        title:
          "EIS HR API",
        version: "1.0.0",
      },

      servers: [
        {
          url:
            "http://localhost:4500/api/hr",
        },
      ],
    },

    apis: [
      "./src/modules/**/*.js",
    ],
  });
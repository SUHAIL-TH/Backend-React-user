const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0', // OpenAPI version
  info: {
    title: 'User Management API', // API title
    version: '1.0.0', // API version
    description: 'API for managing users', // API description
  },
  servers: [
    {
      url: 'http://localhost:4000/', // Server URL
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      BearerAuth: [], // Security scheme to be applied globally
    },
  ],
};

// Options for swagger-jsdoc
const options = {
  swaggerDefinition,
  apis: ['./routes/*.js', './controller/*.js'], // Paths to API documentation files
};

// Generate swagger specification
const swaggerSpec = swaggerJsDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
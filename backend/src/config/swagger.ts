import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'UrjaLoop API Documentation',
      version: '1.0.0',
      description: 'API documentation for UrjaLoop Smart Waste Management Backend',
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1',
        description: 'Development Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    process.env.NODE_ENV === 'production' 
      ? './dist/routes/*.js' 
      : './src/routes/*.ts',
    process.env.NODE_ENV === 'production' 
      ? './dist/models/*.js' 
      : './src/models/*.ts'
  ],
};

export const swaggerSpec = swaggerJsdoc(options);

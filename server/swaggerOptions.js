const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'GençLink API',
            version: '1.0.0',
            description: 'API documentation for GençLink platform',
            contact: {
                name: 'GençLink Team',
                email: 'murathankocaman@outlook.com',
            },
        },
        servers: [
            {
                url: 'http://192.168.1.163:5000',
                description: 'Development server',
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
    apis: ['./routes/*.js'], // Yollar dosyasındaki Swagger dökümantasyonu için path
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import { errorHandler } from './middleware/error.middleware';
import routes from './routes';

const app = express();

// Security Middlewares
app.use(helmet());
app.use(cors({ origin: '*' })); // Configure properly in production

// Logging
app.use(morgan('dev'));

// Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
app.use('/api/v1', routes);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'UrjaLoop API is running' });
});

// Global Error Handler
app.use(errorHandler);

export default app;

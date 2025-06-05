import express from 'express';
import dotenv from 'dotenv';
import compression from 'compression';
import authRoutes from './auth/router/router';
import userRoutes from './user/router/userRouter';
import postRoutes from './post/router/postRouter';
import commentRoutes from './comments/router/commentRouter';
import { errorHandler } from './middleware/error-handler';
import { responseStructure } from './middleware/response-structure';

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;

// Middleware
app.use(compression());
app.use(express.json());
app.use(responseStructure);

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/', commentRoutes);

// Global error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);

});


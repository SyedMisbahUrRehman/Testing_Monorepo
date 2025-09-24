import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import * as path from 'path';
import * as fs from 'fs';

async function bootstrap() {
  // Debug: show current working directory and resolved env file paths
  console.log('process.cwd():', process.cwd());
  const envPaths = [
    path.resolve(process.cwd(), '.env'),
    path.resolve(__dirname, '../../.env'),
    path.resolve(__dirname, '../../../.env'),
  ];
  console.log('Resolved env paths and existence:');
  envPaths.forEach((p) => console.log(p, fs.existsSync(p) ? 'FOUND' : 'MISSING'));

  // Also show what Node's process.env currently contains for quick debugging
  console.log('process.env.BACKEND_PORT (raw):', process.env.BACKEND_PORT);
  console.log('process.env.CORS_ORIGIN (raw):', process.env.CORS_ORIGIN);

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get('BACKEND_PORT');
  const corsOrigin = configService.get('CORS_ORIGIN');

  console.log('Environment variables loaded:');
  console.log('BACKEND_PORT:', port);
  console.log('CORS_ORIGIN:', corsOrigin);

  if (!port) {
    throw new Error('BACKEND_PORT environment variable is required');
  }

  if (!corsOrigin) {
    throw new Error('CORS_ORIGIN environment variable is required');
  }

  // Enable CORS for frontend communication
  app.enableCors({
    origin: corsOrigin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(port);
  console.log(`🚀 Backend is running on: http://localhost:${port}`);
  console.log(`📡 CORS enabled for: ${corsOrigin}`);
}

bootstrap();

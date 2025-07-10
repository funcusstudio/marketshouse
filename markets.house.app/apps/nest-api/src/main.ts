/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { HouseProjectsService } from './app/house-projects/house-projects.service';
import { CottageVillagesService } from './app/cottage-villages/cottage-villages.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const globalPrefix = 'api';
  // app.setGlobalPrefix(globalPrefix);
  
  // Включаем CORS
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    exposedHeaders: ['Content-Range', 'content-range'], // Важно для react-admin
  });
  app.use((req, res, next) => {
    res.header('Access-Control-Expose-Headers', 'Content-Range');
    next();
  });

  const houseProjectsService = app.get(HouseProjectsService);
  houseProjectsService.syncHouseProjects()
    .then(() => console.log('Синхронизация houseProjectsService запущена'))
    .catch(err => console.error('Ошибка синхронизации:', err));

  const cottageVillagesService = app.get(CottageVillagesService);
  cottageVillagesService.syncCottageSettlements()
    .then(() => console.log('Синхронизация cottageVilagesService запущена'))
    .catch(err => console.error('Ошибка синхронизации:', err));

  const port =  3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/`
  );
}

bootstrap();

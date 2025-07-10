import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { HouseProject } from './entities/house-project.entity';
import houseProjectsConfig from '../config/house-projects.config';
import { HouseProjectsController } from './house-projects.controller';
import { HouseProjectsService } from './house-projects.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([HouseProject]),
    HttpModule,
    ConfigModule.forFeature(houseProjectsConfig),
    ScheduleModule.forRoot(),
  ],
  controllers: [HouseProjectsController],
  providers: [HouseProjectsService],
  exports: [HouseProjectsService],
})
export class HouseProjectsModule {} 
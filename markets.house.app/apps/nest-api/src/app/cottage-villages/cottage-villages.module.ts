import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { CottageVillagesEntity } from './entities/cottage-villages.entity';
import cottageVillagesConfig from '../config/cottage-villages.config';
import { CottageVillagesController } from './cottage-villages.controller';
import { CottageVillagesService } from './cottage-villages.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CottageVillagesEntity]),
    HttpModule,
    ConfigModule.forFeature(cottageVillagesConfig),
    ScheduleModule.forRoot(),
  ],
  controllers: [CottageVillagesController],
  providers: [CottageVillagesService],
  exports: [CottageVillagesService],
})
export class CottageVillagesModule {}
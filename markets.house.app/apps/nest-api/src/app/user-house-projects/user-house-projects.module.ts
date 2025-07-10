import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserHouseProject } from './entities/user-house-project.entity';
import { HouseProjectsModule } from '../house-projects/house-projects.module';
import { UsersModule } from '../users/users.module';
import { UserHouseProjectsController } from './user-house-projects.controller';
import { UserHouseProjectsService } from './user-house-projects.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserHouseProject]),
    HouseProjectsModule,
    UsersModule,
  ],
  controllers: [UserHouseProjectsController],
  providers: [UserHouseProjectsService],
  exports: [UserHouseProjectsService],
})
export class UserHouseProjectsModule {} 
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HouseProjectsModule } from '../house-projects/house-projects.module';
import { UsersModule } from '../users/users.module';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { UserHouseProject } from '../user-house-projects/entities/user-house-project.entity';
import { Report } from './entities/report.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Report, UserHouseProject]),
    HouseProjectsModule,
    UsersModule,
  ],
  controllers: [ReportController],
  providers: [ReportService],
  exports: [ReportService],
})
export class ReportModule {}
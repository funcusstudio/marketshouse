import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HouseProjectsModule } from './house-projects/house-projects.module';
import { UserHouseProjectsModule } from './user-house-projects/user-house-projects.module';
import houseProjectsConfig from './config/house-projects.config';
import { User } from './user/user.entity';
import { HouseProject } from './house-projects/entities/house-project.entity';
import { UserHouseProject } from './user-house-projects/entities/user-house-project.entity';
import { ReportModule } from './report/report.module';
import { Report } from './report/entities/report.entity';
import { CottageVillagesModule } from './cottage-villages/cottage-villages.module';
import { CottageVillagesEntity } from './cottage-villages/entities/cottage-villages.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [houseProjectsConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const DB_USERNAME = "markets_user"
        const DB_PORT = 5432
        const DB_DATABASE = "markets_db"
        const dbPassword = "sK2Sw@23!sQ11sQ"
        const dbHost = "127.0.0.1"

        console.log('--- ENV DEBUG ---');
        console.log('NODE_ENV:', process.env.NODE_ENV);
        console.log('DB_PASSWORD:', dbPassword);
        console.log('DB_HOST:', dbHost);
        console.log('------------------');

        if (!dbPassword || !dbHost) {
          throw new Error('Missing required env vars: DB_PASSWORD or DB_HaOST');
        }

        return {
          type: 'postgres',
          host: dbHost,
          port: DB_PORT,
          username: DB_USERNAME,
          password: dbPassword,
          database: DB_DATABASE,
          entities: [User, HouseProject, UserHouseProject, Report, CottageVillagesEntity],
          synchronize: true,
          migrations: ['src/migration/*.ts'], // Добавили
          migrationsRun: true, // Автоматический запуск миграций при старте
        };
      }
    }),
    ScheduleModule.forRoot(),
    UsersModule,
    AuthModule,
    HouseProjectsModule,
    UserHouseProjectsModule,
    ReportModule,
    CottageVillagesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// ReportService.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Report } from './entities/report.entity';
import { UserHouseProject } from '../user-house-projects/entities/user-house-project.entity';
import { CreateReportDto } from './dto/CreateReportDto';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
    @InjectRepository(UserHouseProject)
    private projectRepository: Repository<UserHouseProject>,
  ) {}

  async create(user: User, createReportDto: CreateReportDto): Promise<Report> {
    if (!['executor', 'client'].includes(user.userType)) {
      throw new ForbiddenException('Только исполнители или клиенты могут создавать отчеты');
    }

    const project = await this.projectRepository.findOne({
      where: { id: createReportDto.projectId },
      relations: ['user'],
    });

    if (!project) {
      throw new NotFoundException('Проект не найден');
    }

    if (user.userType === 'client' && project.user.id !== user.id) {
      throw new ForbiddenException('Вы можете создавать отчеты только для своих проектов');
    }

    const report = this.reportRepository.create({
      description: createReportDto.description,
      author: user,
      project,
      createdAt: createReportDto.date ? new Date(createReportDto.date) : new Date(),
    });

    return this.reportRepository.save(report);
  }

  async findByProject(projectId: number, date?: string, page = 1, limit = 10): Promise<{ reports: Report[]; total: number }> {
    const query = this.reportRepository.createQueryBuilder('report')
      .leftJoinAndSelect('report.author', 'author')
      .leftJoinAndSelect('report.project', 'project')
      .where('report.projectId = :projectId', { projectId });

    if (date) {
      query.andWhere('DATE(report.createdAt) = :date', { date });
    }

    const [reports, total] = await query
      .take(limit)
      .skip((page - 1) * limit)
      .getManyAndCount();

    return { reports, total };
  }

  async validateProjectOwnership(projectId: number, userId: number, date?: string): Promise<UserHouseProject | null> {
    const query = this.projectRepository.createQueryBuilder('project')
      .where('project.id = :projectId', { projectId })
      .andWhere('project.userId = :userId', { userId });

    if (date) {
      query.andWhere('EXISTS (SELECT 1 FROM report r WHERE r.projectId = project.id AND DATE(r.createdAt) = :date)', { date });
    }

    return query.getOne();
  }
}
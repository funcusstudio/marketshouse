// report.controller.ts
import { Controller, Get, Post, Body, Param, Query, UseGuards, NotFoundException } from '@nestjs/common';
import { ReportService } from './report.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../user/user.entity';
import { CreateReportDto } from './dto/CreateReportDto';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@GetUser() user: User, @Body() createReportDto: CreateReportDto) {
    console.log(`User ID ${user.id} (${user.userType}) creating report for project ID: ${createReportDto.projectId}`);
    return this.reportService.create(user, createReportDto);
  }

  @Get('project/:projectId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('client', 'admin', 'executor')
  async findByProject(
    @GetUser() user: User,
    @Param('projectId') projectId: string,
    @Query('date') date?: string,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    const numericProjectId = +projectId;
    const numericPage = +page;
    const numericLimit = +limit;

    if (user.userType === 'client') {
      const project = await this.reportService.validateProjectOwnership(numericProjectId, user.id, date);
      if (!project) {
        throw new NotFoundException(`Проект с ID ${projectId} не найден или не принадлежит вам`);
      }
    }

    return this.reportService.findByProject(numericProjectId, date, numericPage, numericLimit);
  }
}
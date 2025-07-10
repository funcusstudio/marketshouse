import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseGuards, NotFoundException } from '@nestjs/common';
import { UserHouseProjectsService } from './user-house-projects.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../user/user.entity';
import { SelectProjectDto } from './dto/select-project.dto';

@Controller('user-house-projects')
export class UserHouseProjectsController {
  [x: string]: any;
  constructor(
    private readonly userHouseProjectsService: UserHouseProjectsService
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async findAll(@Query() query: any) {
    return this.userHouseProjectsService.findAll(query);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @GetUser() user: User,
    @Body() selectProjectDto: SelectProjectDto
  ) {
    if (user.userType !== 'client') {
      return {
        success: false,
        message: 'Только клиенты могут выбирать проекты',
      };
    }
    return this.userHouseProjectsService.create(user.id, selectProjectDto);
  }

  @Get('my-projects')
  @UseGuards(JwtAuthGuard)
  async findUserProjects(@GetUser() user: User) {
    return this.userHouseProjectsService.findUserProjects(user.id);
  }

  @Get('my-projects/:id')
  @UseGuards(JwtAuthGuard)
  async findMyProjectById(@GetUser() user: User, @Param('id') id: string) {
    console.log(
      `Request to find project with ID: ${id} for user ID: ${user.id}`
    );

    const project = await this.userHouseProjectsService.findOne(+id);
    console.log(`Found project: ${JSON.stringify(project)}`);

    if (!project) {
      console.log(`Project with ID ${id} not found`);
      throw new NotFoundException(
        `Проект с ID ${id} не найден или не принадлежит вам`
      );
    }

    if (project.userId !== user.id && project.executorId !== user.id) {
      console.log(
        `Project with ID ${id} does not belong to user ID ${user.id}`
      );
      throw new NotFoundException(
        `Проект с ID ${id} не найден или не принадлежит вам`
      );
    }

    console.log(
      `Successfully returning project with ID: ${id} for user ID: ${user.id}`
    );
    return project;
  }

  @Get('executor-projects')
  @UseGuards(JwtAuthGuard)
  async findExecutorProjects(@GetUser() user: User) {
    if (user.userType !== 'executor') {
      throw new NotFoundException('Только исполнители могут просматривать все проекты');
    }
    return this.userHouseProjectsService.findAll({});
  }

  // Новый метод: получить проекты, взятые исполнителем в работу
  @Get('my-executed-projects')
  @UseGuards(JwtAuthGuard)
  async getMyExecutedProjects(@GetUser() user: User) {
    console.log("my-executed-projects - type us", user.userType)
    // if (user.userType !== 'executor') {
    //   throw new NotFoundException('Только исполнители могут просматривать свои проекты');
    // }
    return this.userHouseProjectsService.getMyExecutedProjects(user.id);
  }

  @Get('executor-projects/:id')
  @UseGuards(JwtAuthGuard)
  async findExecutorProjectById(@GetUser() user: User, @Param('id') id: string) {
    console.log(`Request to find project with ID: ${id} for executor ID: ${user.id}`);
    if (user.userType !== 'executor') {
      console.log(`User ID ${user.id} is not an executor`);
      throw new NotFoundException('Только исполнители могут просматривать проекты');
    }
    const project = await this.userHouseProjectsService.findOne(+id);
    console.log(`Found project: ${JSON.stringify(project)}`);
    if (!project) {
      console.log(`Project with ID ${id} not found`);
      throw new NotFoundException(`Проект с ID ${id} не найден`);
    }
    console.log(`Successfully returning project with ID: ${id} for executor ID: ${user.id}`);
    return project;
  }

  @Get('unassigned')
  @UseGuards(JwtAuthGuard)
  async getUnassignedProjects(@GetUser() user: User) {
    if (user.userType !== 'executor') {
      throw new NotFoundException('Только исполнители могут просматривать проекты без исполнителя');
    }
    return this.userHouseProjectsService.getUnassignedProjects();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async findOne(@Param('id') id: string) {
    return this.userHouseProjectsService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async update(@Param('id') id: string, @Body() updateData: any) {
    return this.userHouseProjectsService.update(+id, updateData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async remove(@Param('id') id: string) {
    return this.userHouseProjectsService.remove(+id);
  }

  @Post(':id/take')
  @UseGuards(JwtAuthGuard)
  async takeProject(@Param('id') id: string, @GetUser() user: User) {
    if (user.userType !== 'executor') {
      throw new NotFoundException('Только исполнители могут взять проект в работу');
    }
    return this.userHouseProjectsService.takeProject(+id, user.id);
  }
}
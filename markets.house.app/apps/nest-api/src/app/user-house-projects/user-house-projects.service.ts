import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserHouseProject } from './entities/user-house-project.entity';
import { HouseProjectsService } from '../house-projects/house-projects.service';
import { UsersService } from '../users/users.service';
import { SelectProjectDto } from './dto/select-project.dto';
import { IsNull } from 'typeorm'; // Импортируем IsNull

@Injectable()
export class UserHouseProjectsService {
  constructor(
    @InjectRepository(UserHouseProject)
    private userHouseProjectsRepository: Repository<UserHouseProject>,
    private houseProjectsService: HouseProjectsService,
    private usersService: UsersService,
  ) {}

  async selectProject(userId: number, selectProjectDto: SelectProjectDto) {
    // Проверяем, что пользователь существует и имеет тип 'client'
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    if (user.userType !== 'client') {
      throw new BadRequestException('Only clients can select house projects');
    }

    // Проверяем, что проект существует и активен
    const project = await this.houseProjectsService.findByIdForClient(selectProjectDto.houseProjectId);
    if (!project) {
      throw new NotFoundException(`Active house project with ID ${selectProjectDto.houseProjectId} not found`);
    }

    // Проверяем, есть ли уже выбранный проект у пользователя
    const existingSelection = await this.userHouseProjectsRepository.findOne({
      where: { userId, houseProjectId: selectProjectDto.houseProjectId }
    });

    if (existingSelection) {
      // Обновляем существующий выбор
      existingSelection.notes = selectProjectDto.notes || '';
      return await this.userHouseProjectsRepository.save(existingSelection);
    } else {
      // Создаем новый выбор
      const userHouseProject = new UserHouseProject();
      userHouseProject.userId = userId;
      userHouseProject.houseProjectId = selectProjectDto.houseProjectId;
      userHouseProject.notes = selectProjectDto.notes || '';
      return await this.userHouseProjectsRepository.save(userHouseProject);
    }
  }

  async getUserProjects(userId: number) {
    // Получаем все выбранные проекты пользователя с информацией о проекте
    const selections = await this.userHouseProjectsRepository.find({
      where: { userId },
      relations: ['houseProject'],
    });

    return selections;
  }

  async findAll(query: any = {}) {
    const take = query.limit || 10;
    const skip = query.offset || 0;

    const [result, total] = await this.userHouseProjectsRepository.findAndCount({
      take,
      skip,
      relations: ['user', 'houseProject'],
      order: { createdAt: 'DESC' },
    });

    return {
      data: result,
      total,
    };
  }

  async create(userId: number, selectProjectDto: SelectProjectDto) {
    const { houseProjectId, notes } = selectProjectDto;
    console.log(`Project - ${houseProjectId}`)
    // Проверяем, существует ли проект
    const houseProject = await this.houseProjectsService.findByIdForClient(houseProjectId);
    if (!houseProject) {
      throw new NotFoundException(`Проект с ID ${houseProjectId} не найден или неактивен`);
    }

    // Проверяем, не выбрал ли пользователь уже этот проект
    const existingUserProject = await this.userHouseProjectsRepository.findOne({
      where: { userId, houseProjectId },
    });

    if (existingUserProject) {
      throw new BadRequestException('Вы уже выбрали этот проект');
    }

    // Создаем запись о выборе проекта
    const userHouseProject = this.userHouseProjectsRepository.create({
      userId,
      houseProjectId,
      notes: notes || '', // Используем пустую строку вместо undefined
      isConfirmed: false,
    });

    return await this.userHouseProjectsRepository.save(userHouseProject);
  }

  async findUserProjects(userId: number) {
    const projects = await this.userHouseProjectsRepository.find({
      where: { userId },
      relations: ['houseProject'],
      order: { createdAt: 'DESC' },
    });
    console.log("Project - ", projects)
    return {
      data: projects,
      total: projects.length,
    };
  }

  async findOne(id: number) {
    const userHouseProject = await this.userHouseProjectsRepository.findOne({
      where: { id },
      relations: ['user', 'houseProject'],
    });
    console.log("userHouseProject - ", userHouseProject)
    if (!userHouseProject) {
      throw new NotFoundException(`Запись выбора проекта с ID ${id} не найдена`);
    }

    return userHouseProject;
  }

  async update(id: number, updateData: Partial<UserHouseProject>) {
    const userHouseProject = await this.findOne(id);
    Object.assign(userHouseProject, updateData);
    return await this.userHouseProjectsRepository.save(userHouseProject);
  }

  async remove(id: number) {
    const userHouseProject = await this.findOne(id);
    await this.userHouseProjectsRepository.remove(userHouseProject);
    return { id };
  }

  // Новый метод: взять проект в работу для исполнителя
  async takeProject(projectId: number, executorId: number) {
    const project = await this.userHouseProjectsRepository.findOne({
      where: { id: projectId },
      relations: ['executor'],
    });
    if (!project) {
      throw new NotFoundException(`Проект с ID ${projectId} не найден`);
    }
    if (project.executorId) {
      throw new BadRequestException(`Проект с ID ${projectId} уже имеет исполнителя`);
    }
    const executor = await this.usersService.findOne(executorId);
    if (!executor || executor.userType !== 'executor') {
      throw new BadRequestException(`Пользователь с ID ${executorId} не является исполнителем`);
    }
    project.executorId = executorId;
    project.executor = executor;
    return await this.userHouseProjectsRepository.save(project);
  }

  // Исправленный метод: получить проекты без исполнителя
  async getUnassignedProjects() {
    const projects = await this.userHouseProjectsRepository.find({
      where: { executorId: IsNull() }, // Используем IsNull для фильтрации по null
      relations: ['houseProject', 'user'],
    });
    return {
      data: projects,
      total: projects.length,
    };
  }

  async getMyExecutedProjects(executorId: number) {
    const projects = await this.userHouseProjectsRepository.find({
      where: { executorId },
      relations: ['houseProject', 'user'],
      order: { createdAt: 'DESC' },
    });

    return {
      data: projects,
      total: projects.length,
    };
  }
}
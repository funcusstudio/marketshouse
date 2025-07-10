import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { catchError, firstValueFrom } from 'rxjs';
import { HouseProject } from './entities/house-project.entity';

interface Attribute {
  id: number;
  name: string;
  options: string[];
}

@Injectable()
export class HouseProjectsService {
  private readonly logger = new Logger(HouseProjectsService.name);

  constructor(
    @InjectRepository(HouseProject)
    private houseProjectsRepository: Repository<HouseProject>,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async scheduledSyncHouseProjects() {
    this.logger.log('Starting scheduled house projects synchronization');
    await this.syncHouseProjects();
  }

  async syncHouseProjects() {
    this.logger.log('Starting house projects synchronization');
    
    try {
      const apiUrl = this.configService.get('houseProjects.apiUrl');
      const category = this.configService.get('houseProjects.category');
      const consumerKey = this.configService.get('houseProjects.consumerKey');
      const consumerSecret = this.configService.get('houseProjects.consumerSecret');
      
      const url = `${apiUrl}?category=${category}&consumer_key=${consumerKey}&consumer_secret=${consumerSecret}`;
      
      const { data } = await firstValueFrom(
        this.httpService.get(url).pipe(
          catchError((error) => {
            this.logger.error(`Failed to fetch house projects: ${error.message}`);
            throw new Error(`Failed to fetch house projects: ${error.message}`);
          }),
        ),
      );
      
      this.logger.log(`Fetched ${data.length} house projects from external API`);
      
      // Найдем все существующие проекты, чтобы сверить их с полученными
      const existingProjects = await this.houseProjectsRepository.find();
      const existingProjectIds = existingProjects.map(p => p.externalId);
      
      // Обработка полученных проектов
      const projectsToSave: HouseProject[] = [];
      
      for (const project of data) {
        const houseProject = new HouseProject();
        houseProject.externalId = project.id;
        houseProject.name = project.name;
        houseProject.description = project.description;
        houseProject.shortDescription = project.short_description;
        houseProject.permalink = project.permalink;
        houseProject.dateCreated = new Date(project.date_created);
        houseProject.dateModified = new Date(project.date_modified);
        houseProject.price = parseFloat(project.price);
        houseProject.salePrice = project.sale_price ? parseFloat(project.sale_price) : 0;
        houseProject.onSale = project.on_sale;
        houseProject.dimensions = project.dimensions;
        houseProject.categories = project.categories;
        houseProject.images = project.images;
        houseProject.attributes = project.attributes.map((attr: Attribute) => ({
          id: attr.id,
          name: attr.name,
          options: attr.options,
        }));
        houseProject.isActive = project.status === 'publish';
        houseProject.syncedAt = new Date();
        
        projectsToSave.push(houseProject);
      }
      
      // Сохраняем все проекты
      await this.houseProjectsRepository.save(projectsToSave);
      
      // Найдем идентификаторы проектов, которые есть в базе, но отсутствуют в API
      const fetchedProjectIds = data.map((p: { id: number }) => p.id);
      const projectIdsToDeactivate = existingProjectIds.filter(
        id => !fetchedProjectIds.includes(id)
      );
      
      // Деактивируем проекты, которые отсутствуют в API
      if (projectIdsToDeactivate.length > 0) {
        await this.houseProjectsRepository.update(
          { externalId: In(projectIdsToDeactivate) },
          { isActive: false }
        );
        this.logger.log(`Deactivated ${projectIdsToDeactivate.length} house projects`);
      }
      
      this.logger.log('House projects synchronization completed successfully');
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`House projects synchronization failed: ${error.message}`);
      } else {
        this.logger.error(`House projects synchronization failed: ${String(error)}`);
      }
    }
  }

  async findAll(query: any) {
    const take = query.range ? JSON.parse(query.range)[1] - JSON.parse(query.range)[0] + 1 : 10;
    const skip = query.range ? JSON.parse(query.range)[0] : 0;
    const [sort, order] = query.sort ? JSON.parse(query.sort) : ['dateCreated', 'DESC'];
    const filter = query.filter ? JSON.parse(query.filter) : {};
    
    // Добавляем фильтр по активности проектов, если не указано иное
    if (filter.isActive === undefined) {
      filter.isActive = true;
    }
    
    const [result, total] = await this.houseProjectsRepository.findAndCount({
      where: filter,
      take: take,
      skip: skip,
      order: { [sort]: order.toLowerCase() },
    });
    
    return {
      data: result,
      total: total,
    };
  }

  async findOne(id: number) {
    return await this.houseProjectsRepository.findOne({ 
      where: { externalId: id, isActive: true } 
    });
  }

  async findByIdForClient(id: number): Promise<HouseProject> {
    const project = await this.houseProjectsRepository.findOne({
      where: { id, isActive: true },
    });
    if (!project) {
      throw new NotFoundException(`Проект с ID ${id} не найден или неактивен`);
    }
    return project;
  }

  async getActiveHouseProjects() {
    // Этот метод для получения всех активных проектов для отображения в приложении
    return await this.houseProjectsRepository.find({
      where: { isActive: true },
      order: { dateCreated: 'DESC' },
    });
  }
} 
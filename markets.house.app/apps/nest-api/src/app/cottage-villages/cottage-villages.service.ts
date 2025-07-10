import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Like } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { catchError, firstValueFrom } from 'rxjs';
import { CottageVillagesEntity } from './entities/cottage-villages.entity';

@Injectable()
export class CottageVillagesService {
  private readonly logger = new Logger(CottageVillagesService.name);

  constructor(
    @InjectRepository(CottageVillagesEntity)
    private cottageSettlementsRepository: Repository<CottageVillagesEntity>,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async scheduledSyncCottageSettlements() {
    this.logger.log('Starting scheduled cottage settlements synchronization');
    await this.syncCottageSettlements();
  }

  async syncCottageSettlements() {
    this.logger.log('Starting cottage settlements synchronization');

    try {
      const apiUrl = this.configService.get('cottageProjects.apiUrl');

      const url = `${apiUrl}`;

      const { data } = await firstValueFrom(
        this.httpService.get(url).pipe(
          catchError((error) => {
            this.logger.error(`Failed to fetch cottage settlements: ${error.message}`);
            throw new Error(`Failed to fetch cottage settlements: ${error.message}`);
          }),
        ),
      );

      this.logger.log(`Fetched ${data.length} cottage settlements from external API`);

      // Найдем все существующие поселки, чтобы сверить их с полученными
      const existingSettlements = await this.cottageSettlementsRepository.find();
      const existingSettlementIds = existingSettlements.map(s => s.id.toString());

      // Обработка полученных поселков
      const settlementsToSave: CottageVillagesEntity[] = [];

      for (const settlement of data) {
        const cottageSettlement = new CottageVillagesEntity();
        cottageSettlement.id = settlement.id;
        cottageSettlement.name = settlement.name;
        cottageSettlement.description = settlement.description;
        cottageSettlement.shortDescription = settlement.short_description;
        cottageSettlement.permalink = settlement.permalink;
        cottageSettlement.price = parseFloat(settlement.price);
        cottageSettlement.regularPrice = parseFloat(settlement.regular_price);
        cottageSettlement.salePrice = settlement.sale_price ? parseFloat(settlement.sale_price) : 0;
        cottageSettlement.mainImage = settlement.main_image;
        cottageSettlement.galleryImages = settlement.gallery_images;
        cottageSettlement.characteristics = settlement.characteristics;
        cottageSettlement.attributes = settlement.attributes;
        cottageSettlement.dateCreated = new Date();
        cottageSettlement.dateModified = new Date();
        cottageSettlement.isActive = true;
        cottageSettlement.syncedAt = new Date();

        settlementsToSave.push(cottageSettlement);
      }

      // Сохраняем все поселки
      await this.cottageSettlementsRepository.save(settlementsToSave);

      // Найдем идентификаторы поселков, которые есть в базе, но отсутствуют в API
      const fetchedSettlementIds = data.map((s: { id: number }) => s.id.toString());
      const settlementIdsToDeactivate = existingSettlementIds.filter(
        id => !fetchedSettlementIds.includes(id)
      );

      // Деактивируем поселки, которые отсутствуют в API
      if (settlementIdsToDeactivate.length > 0) {
        await this.cottageSettlementsRepository.update(
          { id: In(settlementIdsToDeactivate.map(id => parseInt(id))) },
          { isActive: false }
        );
        this.logger.log(`Deactivated ${settlementIdsToDeactivate.length} cottage settlements`);
      }

      this.logger.log('Cottage settlements synchronization completed successfully');
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Cottage settlements synchronization failed: ${error.message}`);
      } else {
        this.logger.error(`Cottage settlements synchronization failed: ${String(error)}`);
      }
    }
  }

  async getActiveCottageSettlements() {
    this.logger.log('Fetching all active cottage settlements');
    return await this.cottageSettlementsRepository.find({
      where: { isActive: true },
      order: { dateCreated: 'DESC' },
    });
  }

  async searchByName(name: string) {
    this.logger.log(`Searching cottage settlements by name: ${name}`);
    const settlements = await this.cottageSettlementsRepository.find({
      where: { name: Like(`%${name}%`), isActive: true },
      order: { name: 'ASC' },
    });
    if (!settlements.length) {
      this.logger.warn(`No cottage settlements found for name: ${name}`);
    }
    return settlements;
  }
}
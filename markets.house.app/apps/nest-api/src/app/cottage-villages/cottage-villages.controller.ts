import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CottageVillagesService } from './cottage-villages.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('cottage-villages')
export class CottageVillagesController {
  constructor(private readonly cottageVillagesService: CottageVillagesService) {}

  @Post('sync')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async syncCottageVillages() {
    await this.cottageVillagesService.syncCottageSettlements();
    return { message: 'Cottage villages synchronization started' };
  }

  @Get('client/list')
  // @UseGuards(JwtAuthGuard)
  async getCottageVillagesForClient() {
    // if (user.userType !== 'client') {
    //   return { data: [], message: 'Only clients can view cottage villages' };
    // }
    return { data: await this.cottageVillagesService.getActiveCottageSettlements() };
  }

  @Get('search')
  async searchCottageVillages(@Query('name') name: string) {
    if (!name) {
      return { data: await this.cottageVillagesService.getActiveCottageSettlements() };
    }
    return { data: await this.cottageVillagesService.searchByName(name) };
  }
}
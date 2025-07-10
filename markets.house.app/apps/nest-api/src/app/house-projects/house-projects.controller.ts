import { Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { HouseProjectsService } from './house-projects.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { User } from '../user/user.entity';
import { GetUser } from '../auth/decorators/get-user.decorator';

@Controller('house-projects')
export class HouseProjectsController {
  constructor(private readonly houseProjectsService: HouseProjectsService) {}

  @Get()
  async findAll(@Query() query: any) {
    return this.houseProjectsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.houseProjectsService.findOne(+id);
  }

  @Post('sync')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async syncHouseProjects() {
    await this.houseProjectsService.syncHouseProjects();
    return { message: 'House projects synchronization started' };
  }

  @Get('client/list')
  @UseGuards(JwtAuthGuard)
  async getHouseProjectsForClient(@GetUser() user: User) {
    // if (user.userType !== 'client') {
    //   return { data: [], message: 'Only clients can view house projects' };
    // }
    return { data: await this.houseProjectsService.getActiveHouseProjects() };
  }
} 
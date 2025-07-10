import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  Res,
  Logger,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { User } from '../user/user.entity';
import type { Response } from 'express';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Query() query: any, @Res({ passthrough: true }) response: Response) {
    const { data, total } = await this.usersService.findAll(query);
    Logger.log('Query params:', total);
    
    // Устанавливаем заголовок Content-Range правильно
    response.header('Content-Range', `users 0-${total}/${total}`);
    // response.header('Content-Range', `users 0-1`);
    // Добавьте также заголовок Access-Control-Expose-Headers
    response.header('Access-Control-Expose-Headers', 'Content-Range');
    return data
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<User>) {
    return this.usersService.update(+id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
} 
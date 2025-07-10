import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(query: any) {
    const take = query.range ? JSON.parse(query.range)[1] - JSON.parse(query.range)[0] + 1 : 10;
    const skip = query.range ? JSON.parse(query.range)[0] : 0;
    const [sort, order] = query.sort ? JSON.parse(query.sort) : ['id', 'ASC'];
    const filter = query.filter ? JSON.parse(query.filter) : {};
  
    console.log('Query params:', { take, skip, sort, order, filter });
  
    const [result, total] = await this.usersRepository.findAndCount({
      where: filter,
      take: take,
      skip: skip,
      order: { [sort]: order.toLowerCase() },
    });
  
    console.log('Query result:', { result, total });
  
    return {
      data: result,
      total: total,
    };
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Пользователь с ID ${id} не найден`);
    }
    return user;
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async update(id: number, updateData: Partial<User>) {
    const user = await this.findOne(id);
    Object.assign(user, updateData);
    return await this.usersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
    return { id };
  }
} 
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)private readonly userRepository: Repository<User>,
  ) {}

  async create(body: UserDto) {
    const user = await this.userRepository.create(body);
    await this.userRepository.save(user);
    return {
      code: 200,
      user
    };
  }

  async update(id: number, body: UserDto) {
    const user = await this.userRepository.findOneBy({ id });

    if(!user) throw new NotFoundException('User not found!');

    return await this.userRepository.update(id, body);
   
  }

  async delete(id: string) {
    const user = await this.userRepository.findOneBy({
      id: Number(id)
    });

    if(!user) throw new NotFoundException('User not found!');

    const userDelete = await this.userRepository.delete(id);
    if(userDelete) 
      return {
        message: "User deleted with success.",
        code: 200
      }
  }

  async get() {
    return await this.userRepository.find({
      select: ['id', 'name', 'company_value', 'salary']
    });
  }
}

import { Controller, Get, Post, Body, Param, Delete, Put, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UserValidator } from './user.validator';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userValidator: UserValidator,
  ) { }

  @Post("create")
  async create(@Body() body: UserDto) {
    if (!body || Object.values(body).length === 0) throw new BadRequestException("Request cannot be empty!");

    await this.userValidator.create(body);
    return await this.userService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UserDto) {
    if (!body || Object.values(body).length === 0) throw new BadRequestException("Request cannot be empty!");

    await this.userValidator.update(id, body);
    const userUpdated = await this.userService.update(Number(id), body);

    if (userUpdated)
      return {
        message: "User updated with success!",
        code: 200
      }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.userValidator.id(id);
    return await this.userService.delete(id);
  }

  @Get('get-users')
  async get() {
    const users = await this.userService.get();
    return users;
  }
}

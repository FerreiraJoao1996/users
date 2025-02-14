import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserValidator } from './user.validator';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  const mockUserService = {
    create: jest.fn().mockImplementation((dto: UserDto) => ({
      user: { id: 1, ...dto, createdAt: new Date(), updatedAt: new Date() },
    })),
    update: jest.fn().mockImplementation((id: number, dto: UserDto) => {
      if (id !== 1) throw new NotFoundException('User not found!');
      return { affected: 1 };
    }),
    delete: jest.fn().mockImplementation((id: string) => {
      if (id !== '1') throw new NotFoundException('User not found!');
      return { message: "User deleted with success.", code: 200 };
    }),
    get: jest.fn().mockResolvedValue([{ id: 1, name: 'John', salary: '5000', company_value: '10000' }]),
  };

  const mockUserValidator = {
    create: jest.fn(),
    update: jest.fn(),
    id: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: UserValidator, useValue: mockUserValidator },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('Create User', () => {
    it('should create a user successfully', async () => {
      const dto: UserDto = { name: 'John Doe', salary: '5000', company_value: '10000' };
      const result = await userController.create(dto);

      expect(result).toHaveProperty('user');
      expect(result.user).toMatchObject(dto);
    });

    it('should throw BadRequestException if body is empty', async () => {
      await expect(userController.create({} as UserDto)).rejects.toThrow(BadRequestException);
    });

    it('should call validator before creating a user', async () => {
      const dto: UserDto = { name: 'John Doe', salary: '5000', company_value: '10000' };
      await userController.create(dto);

      expect(mockUserValidator.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('Update User', () => {
    it('should update user successfully', async () => {
      const dto: UserDto = { name: 'Updated Name', salary: '6000', company_value: '12000' };
      const result = await userController.update('1', dto);

      expect(result).toEqual({ message: "User updated with success!", code: 200 });
    });

    it('should throw NotFoundException if user does not exist', async () => {
      const dto: UserDto = { name: 'Updated Name', salary: '6000', company_value: '12000' };

      await expect(userController.update('999', dto)).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if body is empty', async () => {
      await expect(userController.update('1', {} as UserDto)).rejects.toThrow(BadRequestException);
    });

    it('should call validator before updating', async () => {
      const dto: UserDto = { name: 'Updated Name', salary: '6000', company_value: '12000' };
      await userController.update('1', dto);

      expect(mockUserValidator.update).toHaveBeenCalledWith('1', dto);
    });
  });

  describe('Delete User', () => {
    it('should delete a user successfully', async () => {
      const result = await userController.delete('1');
      expect(result).toEqual({ message: "User deleted with success.", code: 200 });
    });

    it('should throw NotFoundException if user does not exist', async () => {
      await expect(userController.delete('999')).rejects.toThrow(NotFoundException);
    });

    it('should call validator before deleting', async () => {
      await userController.delete('1');
      expect(mockUserValidator.id).toHaveBeenCalledWith('1');
    });
  });

  describe('Get Users', () => {
    it('should return a list of users', async () => {
      const result = await userController.get();
      expect(result).toHaveLength(1);
      expect(result[0]).toHaveProperty('name', 'John');
    });

    it('should return an empty array if no users found', async () => {
      mockUserService.get.mockResolvedValueOnce([]);
      const result = await userController.get();
      expect(result).toEqual([]);
    });
  });
});

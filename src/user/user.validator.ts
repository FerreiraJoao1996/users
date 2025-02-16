import { Injectable } from '@nestjs/common';
import { ValidatorFieldService } from '../utils/validator/validator.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserValidator {
  async create(body: UserDto): Promise<void> {
    const validatorField = new ValidatorFieldService(body, {
      name: 'required|string',
      salary: 'required|string',
      company_value: 'required|string',
    });
    await validatorField.validation();
  }

  async update(id: string, body: UserDto): Promise<void> {
    const validatorField = new ValidatorFieldService(body, {
      name: 'required|string',
      salary: 'required|string',
      company_value: 'required|string',
    });
    await validatorField.validation();

    await this.id(id);
  }

  async id(id: string): Promise<void> {
    const validatorQuery = new ValidatorFieldService(
      { id },
      {
        id: 'required|string',
      },
    );
    await validatorQuery.validation();
  }
}

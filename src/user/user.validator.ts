import { Injectable } from '@nestjs/common';
import { ValidatorFieldService } from 'src/utils/validator/validator.service';
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

  async update(id: string ,body: UserDto): Promise<void> {
    const validatorField = new ValidatorFieldService(body, {
        name: 'required|string|min:1',
        salary: 'required|string|min:1',
        company_value: 'required|string|min:1',
    });
    await validatorField.validation();

    const validatorQuery = new ValidatorFieldService({ id }, {
      id: 'required|string',
    });
    await validatorQuery.validation();
  }
}

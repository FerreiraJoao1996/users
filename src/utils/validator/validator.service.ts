import { BadRequestException } from '@nestjs/common';

export class ValidatorFieldService {
  private request: Record<string, unknown>;
  private rules: Record<string, string>;

  constructor(request: Record<string, any>, rules: Record<string, string>) {
    this.request = request;
    this.rules = rules;
  }

  async validation(): Promise<void> {
    const errors: Record<string, { message: string; rule: string }> = {};

    for (const [field, rule] of Object.entries(this.rules)) {
      const value = await this.request[field];

      if (
        rule.includes('required') &&
        (typeof value !== 'string' || value.trim() === '')
      ) {
        errors[field] = {
          message: `${field} field must not be empty.`,
          rule: 'required',
        };
      }
    }

    if (Object.keys(errors).length > 0) {
      throw new BadRequestException({ code: 400, errors });
    }
  }
}

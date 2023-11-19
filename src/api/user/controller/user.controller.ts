import { Controller, Get, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Post()
  async save(): Promise<string> {
    return 'shoud save new user';
  }

  @Get()
  async findAll(): Promise<string[]> {
    return ['should', 'return', 'all'];
  }
}

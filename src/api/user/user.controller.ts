import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRequestDto } from './dto/userRequest.dto';
import { UserViewDto } from './dto/userView.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async save(@Body() req: UserRequestDto): Promise<UserViewDto> {
    return this.userService.create(req);
  }

  @Get()
  async findAll(): Promise<string[]> {
    return ['should', 'return', 'all'];
  }
}

import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRequestDto } from './dto/userRequest.dto';
import { UserViewDto } from './dto/userView.dto';
import { UserUpdateDto } from './dto/userUpdate.dto';
import path from 'path';

@Controller('api/v1/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async save(@Body() reqBody: UserRequestDto): Promise<UserViewDto> {
    return this.userService.create(reqBody);
  }

  @Get()
  async findAll(): Promise<UserViewDto[]> {
    return this.userService.findAll();
  }

  @Put(':id')
  async updateOne(
    @Param('id') reqId: number,
    @Body() reqBody: UserUpdateDto,
  ): Promise<UserViewDto> {
    return this.userService.updateOne(reqId, reqBody);
  }
}

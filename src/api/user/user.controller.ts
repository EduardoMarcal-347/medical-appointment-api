import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRequestDto } from './dto/userRequest.dto';
import { UserViewDto } from './dto/userView.dto';
import { UserUpdateDto } from './dto/userUpdate.dto';
import { ApiOkPaginated } from 'src/swagger/apiOkPaginated';

@Controller('api/v1/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiOkPaginated(UserViewDto)
  async save(@Body() reqBody: UserRequestDto): Promise<UserViewDto> {
    return this.userService.create(reqBody);
  }

  @Get()
  @ApiOkPaginated(UserViewDto)
  async findAll(): Promise<UserViewDto[]> {
    return this.userService.findAll();
  }

  @Put(':id')
  @ApiOkPaginated(UserViewDto)
  async updateOne(
    @Param('id') reqId: number,
    @Body() reqBody: UserUpdateDto,
  ): Promise<UserViewDto> {
    return this.userService.updateOne(reqId, reqBody);
  }
}

import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRequestDto } from './dto/userRequest.dto';
import { UserViewDto } from './dto/userView.dto';
import { UserUpdateDto } from './dto/userUpdate.dto';
import { ApiOkResponsePaginated } from 'src/swagger/apiOkResponsePaginated';

@Controller('api/v1/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiOkResponsePaginated(UserViewDto)
  async save(@Body() reqBody: UserRequestDto): Promise<UserViewDto> {
    return this.userService.create(reqBody);
  }

  @Get()
  @ApiOkResponsePaginated(UserViewDto)
  async findAll(): Promise<UserViewDto[]> {
    return this.userService.findAll();
  }

  @Put(':id')
  @ApiOkResponsePaginated(UserViewDto)
  async updateOne(
    @Param('id') reqId: number,
    @Body() reqBody: UserUpdateDto,
  ): Promise<UserViewDto> {
    return this.userService.updateOne(reqId, reqBody);
  }
}

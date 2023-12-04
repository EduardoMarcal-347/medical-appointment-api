import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ViewUserDto } from './dto/view-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOkResponsePaginated } from 'src/swagger/apiOkResponsePaginated';
import { DeleteResult } from 'typeorm';

@Controller('api/v1/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiOkResponsePaginated(ViewUserDto)
  async save(@Body() reqBody: CreateUserDto): Promise<ViewUserDto> {
    return this.userService.create(reqBody);
  }

  @Get('id/:id')
  @ApiOkResponsePaginated(ViewUserDto)
  async findById(@Param('id') reqId: number): Promise<ViewUserDto> {
    return this.userService.findById(reqId);
  }

  @Get()
  @ApiOkResponsePaginated(ViewUserDto)
  async findAll(): Promise<ViewUserDto[]> {
    return this.userService.findAll();
  }

  @Put(':id')
  @ApiOkResponsePaginated(ViewUserDto)
  async updateOne(
    @Param('id') reqId: number,
    @Body() reqBody: UpdateUserDto,
  ): Promise<ViewUserDto> {
    return this.userService.updateOne(reqId, reqBody);
  }

  @Delete(':id')
  async deleteOne(@Param('id') reqId: number): Promise<DeleteResult> {
    return this.userService.deleteOne(reqId);
  }
}

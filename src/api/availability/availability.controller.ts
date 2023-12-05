import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseFilters,
} from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { ViewAvailabilityDto } from './dto/view-availability.dto';
import { ApiOkResponsePaginated } from 'src/swagger/apiOkResponsePaginated';
import { DeleteResult } from 'typeorm';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';

@UseFilters(HttpExceptionFilter)
@Controller('api/v1/availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Post()
  @ApiOkResponsePaginated(ViewAvailabilityDto)
  async create(
    @Body() reqBody: CreateAvailabilityDto,
  ): Promise<ViewAvailabilityDto> {
    return this.availabilityService.create(reqBody);
  }

  @Get('doctor/id/:id')
  @ApiOkResponsePaginated(ViewAvailabilityDto)
  async findAllByDoctor(
    @Param('id') reqId: number,
  ): Promise<ViewAvailabilityDto[]> {
    return await this.availabilityService.findAllByDoctor(reqId);
  }

  @Get('id/:id')
  @ApiOkResponsePaginated(ViewAvailabilityDto)
  async findById(@Param('id') reqId: number): Promise<ViewAvailabilityDto> {
    return this.availabilityService.findById(reqId);
  }

  @Put('id/:id')
  @ApiOkResponsePaginated(ViewAvailabilityDto)
  async update(
    @Param('id') reqId: number,
    @Body() reqBody: UpdateAvailabilityDto,
  ): Promise<ViewAvailabilityDto> {
    return this.availabilityService.update(reqId, reqBody);
  }

  @Delete('id/:id')
  async delete(@Param('id') reqId: number): Promise<DeleteResult> {
    return this.availabilityService.delete(reqId);
  }
}

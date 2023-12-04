import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { ViewAvailabilityDto } from './dto/view-availability.dto';
import { ApiOkResponsePaginated } from 'src/swagger/apiOkResponsePaginated';
import { DeleteResult } from 'typeorm';

@Controller('api/v1/availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Post()
  @ApiOkResponsePaginated(ViewAvailabilityDto)
  async create(
    @Body() createAvailabilityDto: CreateAvailabilityDto,
  ): Promise<ViewAvailabilityDto> {
    return this.availabilityService.create(createAvailabilityDto);
  }

  @Get(':id')
  @ApiOkResponsePaginated(ViewAvailabilityDto)
  async findAllByDoctor(
    @Param('id') reqId: number,
  ): Promise<ViewAvailabilityDto[]> {
    return this.availabilityService.findAllByDoctor(+reqId);
  }

  @Get(':id')
  @ApiOkResponsePaginated(ViewAvailabilityDto)
  async findById(@Param('id') reqId: number): Promise<ViewAvailabilityDto> {
    return this.availabilityService.findById(+reqId);
  }

  @Put(':id')
  @ApiOkResponsePaginated(ViewAvailabilityDto)
  async update(
    @Param('id') reqId: number,
    @Body() updateAvailabilityDto: UpdateAvailabilityDto,
  ): Promise<ViewAvailabilityDto> {
    return this.availabilityService.update(+reqId, updateAvailabilityDto);
  }

  @Delete(':id')
  async delete(@Param('id') reqId: number): Promise<DeleteResult> {
    return this.availabilityService.delete(+reqId);
  }
}

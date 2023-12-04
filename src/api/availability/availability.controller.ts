import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { ViewAvailabilityDto } from './dto/view-availability.dto';

@Controller('api/v1/availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Post()
  async create(
    @Body() createAvailabilityDto: CreateAvailabilityDto,
  ): Promise<ViewAvailabilityDto> {
    return this.availabilityService.create(createAvailabilityDto);
  }

  @Get(':id')
  async findAllByDoctor(
    @Param('id') reqId: number,
  ): Promise<ViewAvailabilityDto[]> {
    return this.availabilityService.findAllByDoctor(+reqId);
  }

  @Get(':id')
  async findById(@Param('id') reqId: number): Promise<ViewAvailabilityDto> {
    return this.availabilityService.findById(+reqId);
  }

  @Patch(':id')
  async update(
    @Param('id') reqId: number,
    @Body() updateAvailabilityDto: UpdateAvailabilityDto,
  ): Promise<ViewAvailabilityDto> {
    return this.availabilityService.update(+reqId, updateAvailabilityDto);
  }

  @Delete(':id')
  async delete(@Param('id') reqId: number) {
    return this.availabilityService.delete(+reqId);
  }
}

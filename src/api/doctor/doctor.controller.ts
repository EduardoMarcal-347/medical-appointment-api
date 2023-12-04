import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOkResponsePaginated } from 'src/swagger/apiOkResponsePaginated';
import { ViewDoctorDto } from './dto/view-doctor.dto';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { DeleteResult } from 'typeorm';
import { DoctorService } from './doctor.service';

@Controller('api/v1/doctor')
export class DoctorController {
  constructor(private doctorService: DoctorService) {}
  @Post()
  @ApiOkResponsePaginated(ViewDoctorDto)
  async save(@Body() reqBody: CreateDoctorDto): Promise<ViewDoctorDto> {
    return this.doctorService.create(reqBody);
  }

  @Get('id/:id')
  @ApiOkResponsePaginated(ViewDoctorDto)
  async findById(@Param('id') reqId: number): Promise<ViewDoctorDto> {
    return this.doctorService.findById(reqId);
  }

  @Get()
  @ApiOkResponsePaginated(ViewDoctorDto)
  async findAll(): Promise<ViewDoctorDto[]> {
    return this.doctorService.findAll();
  }

  @Put(':id')
  @ApiOkResponsePaginated(ViewDoctorDto)
  async updateOne(
    @Param('id') reqId: number,
    @Body() reqBody: UpdateDoctorDto,
  ): Promise<ViewDoctorDto> {
    return this.doctorService.updateOne(reqId, reqBody);
  }

  @Delete(':id')
  async deleteOne(@Param('id') reqId: number): Promise<DeleteResult> {
    return this.doctorService.deleteOne(reqId);
  }
}

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
import { DoctorViewDto } from './dto/doctorView.dto';
import { DoctorRequestDto } from './dto/doctorRequest.dto';
import { DoctorUpdateDto } from './dto/doctorUpdate.dto';
import { DeleteResult } from 'typeorm';
import { DoctorService } from './doctor.service';

@Controller('api/v1/doctor')
export class DoctorController {
  constructor(private doctorService: DoctorService) {}
  @Post()
  @ApiOkResponsePaginated(DoctorViewDto)
  async save(@Body() reqBody: DoctorRequestDto): Promise<DoctorViewDto> {
    return this.doctorService.create(reqBody);
  }

  @Get('id/:id')
  @ApiOkResponsePaginated(DoctorViewDto)
  async findById(@Param('id') reqId: number): Promise<DoctorViewDto> {
    return this.doctorService.findById(reqId);
  }

  @Get()
  @ApiOkResponsePaginated(DoctorViewDto)
  async findAll(): Promise<DoctorViewDto[]> {
    return this.doctorService.findAll();
  }

  @Put(':id')
  @ApiOkResponsePaginated(DoctorViewDto)
  async updateOne(
    @Param('id') reqId: number,
    @Body() reqBody: DoctorUpdateDto,
  ): Promise<DoctorViewDto> {
    return this.doctorService.updateOne(reqId, reqBody);
  }

  @Delete(':id')
  async deleteOne(@Param('id') reqId: number): Promise<DeleteResult> {
    return this.doctorService.deleteOne(reqId);
  }
}

import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ApiOkResponsePaginated } from 'src/swagger/apiOkResponsePaginated';
import { ViewAppointmentDto } from './dto/view-appointment.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  @ApiOkResponsePaginated(ViewAppointmentDto)
  async create(
    @Body() reqBody: CreateAppointmentDto,
  ): Promise<ViewAppointmentDto> {
    return this.appointmentService.create(reqBody);
  }

  @Get()
  @ApiOkResponsePaginated(ViewAppointmentDto)
  async findAll(): Promise<ViewAppointmentDto[]> {
    return this.appointmentService.findAll();
  }

  @Get('id/:id')
  @ApiOkResponsePaginated(ViewAppointmentDto)
  async findById(@Param('id') id: string): Promise<ViewAppointmentDto> {
    return this.appointmentService.findById(+id);
  }

  @Put('id/:id')
  @ApiOkResponsePaginated(ViewAppointmentDto)
  async update(
    @Param('id') id: string,
    @Body() reqBody: UpdateAppointmentDto,
  ): Promise<ViewAppointmentDto> {
    return this.appointmentService.update(+id, reqBody);
  }
}

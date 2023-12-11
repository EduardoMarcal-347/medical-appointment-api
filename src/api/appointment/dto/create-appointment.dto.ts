import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber } from 'class-validator';

export class CreateAppointmentDto {
  @IsDate()
  @ApiProperty()
  consultationDate!: Date;

  @IsNumber()
  @ApiProperty()
  patientId!: number;

  @IsNumber()
  @ApiProperty()
  doctorId!: number;
}

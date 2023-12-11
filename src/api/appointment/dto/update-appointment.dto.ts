import { PartialType } from '@nestjs/mapped-types';
import { AppointmentEntity } from '../appointment.entity';
import { OmitType } from '@nestjs/swagger';

export class UpdateAppointmentDto extends OmitType(
  PartialType(AppointmentEntity),
  ['id', 'price', 'patientId', 'doctorId', 'doctor', 'patient'],
) {}

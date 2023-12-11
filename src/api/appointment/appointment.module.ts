import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentEntity } from './appointment.entity';
import { DoctorEntity } from '../doctor/doctor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentEntity, DoctorEntity])],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}

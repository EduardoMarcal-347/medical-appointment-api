import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DoctorModule } from './doctor/doctor.module';
import { AvailabilityModule } from './availability/availability.module';
import { AppointmentModule } from './appointment/appointment.module';

@Module({
  imports: [UserModule, DoctorModule, AvailabilityModule, AppointmentModule],
})
export class ApiModule {}

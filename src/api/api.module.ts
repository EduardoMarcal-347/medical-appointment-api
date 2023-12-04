import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DoctorModule } from './doctor/doctor.module';
import { AvailabilityModule } from './availability/availability.module';

@Module({
  imports: [UserModule, DoctorModule, AvailabilityModule],
})
export class ApiModule {}

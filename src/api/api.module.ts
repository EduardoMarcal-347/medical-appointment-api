import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DoctorModule } from './doctor/doctor.module';

@Module({
  imports: [UserModule, DoctorModule],
})
export class ApiModule {}

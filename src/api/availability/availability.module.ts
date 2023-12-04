import { Module } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { AvailabilityController } from './availability.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvailabilityEntity } from './availability.entity';
import { DoctorEntity } from '../doctor/doctor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AvailabilityEntity, DoctorEntity])],
  controllers: [AvailabilityController],
  providers: [AvailabilityService],
})
export class AvailabilityModule {}

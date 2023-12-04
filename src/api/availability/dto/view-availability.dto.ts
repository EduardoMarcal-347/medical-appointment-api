import { OmitType } from '@nestjs/swagger';
import { CreateAvailabilityDto } from './create-availability.dto';
import { AvailabilityEntity } from '../availability.entity';

export class ViewAvailabilityDto extends OmitType(CreateAvailabilityDto, [
  'doctorId',
]) {
  constructor(entity: AvailabilityEntity) {
    super();
    this.dayOfWeek = entity.dayOfWeek;
    this.startTime = entity.startTime;
    this.endTime = entity.endTime;
  }
}

import { OmitType } from '@nestjs/swagger';
import { DoctorEntity } from '../doctor.entity';
import { DoctorRequestDto } from './doctorRequest.dto';

export class DoctorViewDto extends OmitType(DoctorRequestDto, [
  'crm',
  'address',
]) {
  constructor(entity: DoctorEntity) {
    super();
    this.name = entity.name;
    this.email = entity.email;
    this.specialty = entity.specialty;
  }
}

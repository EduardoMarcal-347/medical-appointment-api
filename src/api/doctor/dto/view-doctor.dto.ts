import { OmitType } from '@nestjs/swagger';
import { DoctorEntity } from '../doctor.entity';
import { CreateDoctorDto } from './create-doctor.dto';

export class ViewDoctorDto extends OmitType(CreateDoctorDto, [
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

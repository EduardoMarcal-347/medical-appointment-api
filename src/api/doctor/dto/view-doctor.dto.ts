import { OmitType } from '@nestjs/swagger';
import { DoctorEntity } from '../doctor.entity';
import { CreateDoctorDto } from './create-doctor.dto';

export class ViewDoctorDto extends OmitType(CreateDoctorDto, ['crm']) {
  constructor(entity: DoctorEntity) {
    super();
    this.name = entity.name;
    this.birthdate = entity.birthdate;
    this.email = entity.email;
    this.specialty = entity.specialty;
    this.phoneNumber = entity.phoneNumber;
    this.address = entity.address;
  }
}

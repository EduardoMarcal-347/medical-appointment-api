import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { UserEntity } from '../user.entity';

export class ViewUserDto extends OmitType(CreateUserDto, [
  'cpf',
  'phoneNumber',
  'address',
]) {
  constructor(entity: UserEntity) {
    super();
    this.name = entity.name;
    this.birthdate = entity.birthdate;
    this.healthInsurance = entity.healthInsurance;
    this.email = entity.email;
  }
}

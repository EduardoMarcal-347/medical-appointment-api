import { OmitType } from '@nestjs/swagger';
import { UserRequestDto } from './userRequest.dto';
import { UserEntity } from '../user.entity';

export class UserViewDto extends OmitType(UserRequestDto, [
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

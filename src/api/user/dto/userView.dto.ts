import { OmitType } from '@nestjs/swagger';
import { UserRequestDto } from './userRequest.dto';

export class UserViewDto extends OmitType(UserRequestDto, [
  'cpf',
  'phoneNumber',
  'address',
]) {}

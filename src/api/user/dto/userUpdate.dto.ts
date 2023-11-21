import { PartialType } from '@nestjs/swagger';
import { UserRequestDto } from './userRequest.dto';

export class UserUpdateDto extends PartialType(UserRequestDto) {}

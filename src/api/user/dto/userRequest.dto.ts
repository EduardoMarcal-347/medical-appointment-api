import {
  IsDate,
  IsEmail,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class UserRequestDto {
  @MaxLength(11, { message: 'Cpf inválido' })
  @IsNumber()
  cpf!: string;

  @IsString()
  name!: string;

  @IsDate()
  birthdate!: Date;

  // TODO: create healthInsurance enum
  healthInsurance?: string;

  @IsEmail()
  @IsString()
  email!: string;

  @IsString()
  phoneNumber!: string;

  @IsString()
  address!: string;
}

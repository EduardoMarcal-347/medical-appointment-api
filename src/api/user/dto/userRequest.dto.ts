import { IsDate, IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { HealthInsurance } from 'src/enums/healthInsurance.enum';

export class UserRequestDto {
  @Length(11)
  @IsString()
  cpf!: string;

  @IsString()
  name!: string;

  @IsDate()
  birthdate!: Date;

  @IsEnum(HealthInsurance, { message: 'invalid health insurance' })
  healthInsurance?: HealthInsurance;

  @IsEmail()
  @IsString()
  email!: string;

  @IsString()
  phoneNumber!: string;

  @IsString()
  address!: string;
}

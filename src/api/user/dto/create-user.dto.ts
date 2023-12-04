import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { HealthInsurance } from 'src/enums/healthInsurance.enum';

export class CreateUserDto {
  @Length(11)
  @IsString()
  @ApiProperty()
  cpf!: string;

  @IsString()
  @ApiProperty()
  name!: string;

  @IsDate()
  @ApiProperty()
  birthdate!: Date;

  @IsEnum(HealthInsurance, { message: 'invalid health insurance' })
  @ApiProperty()
  healthInsurance?: HealthInsurance;

  @IsEmail()
  @ApiProperty()
  email!: string;

  @IsString()
  @ApiProperty()
  phoneNumber!: string;

  @IsString()
  @ApiProperty()
  address!: string;
}

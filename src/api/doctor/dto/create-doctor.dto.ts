import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { DoctorSpecialty } from 'src/enums/doctor-specialty.enum';

export class CreateDoctorDto {
  @Length(13)
  @IsString()
  @ApiProperty()
  crm!: string;

  @IsString()
  @ApiProperty()
  name!: string;

  @IsDate()
  @ApiProperty()
  birthdate!: Date;

  @IsEnum(DoctorSpecialty, { message: 'invalid doctor specialty' })
  @ApiProperty()
  specialty!: DoctorSpecialty;

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

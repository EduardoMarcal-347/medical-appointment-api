import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, Length } from 'class-validator';
import { DoctorSpecialty } from 'src/enums/doctor-specialty.enum';

export class CreateDoctorDto {
  @Length(13)
  @IsString()
  @ApiProperty()
  crm!: string;

  @IsString()
  @ApiProperty()
  name!: string;

  @IsEmail()
  @ApiProperty()
  email!: string;

  @IsEnum(DoctorSpecialty, { message: 'invalid doctor specialty' })
  @ApiProperty()
  specialty!: DoctorSpecialty;

  @IsString()
  @ApiProperty()
  address!: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNumber } from 'class-validator';
import { DayOfWeek } from 'src/enums/day-of-week.enum';

export class CreateAvailabilityDto {
  @IsEnum(DayOfWeek, { message: 'invaild day of week' })
  @ApiProperty()
  dayOfWeek!: DayOfWeek;

  @IsDate()
  @ApiProperty()
  startTime!: Date;

  @IsDate()
  @ApiProperty()
  endTime!: Date;

  //to do: get doctorId through OAuth, and remove from createDTO
  @IsNumber()
  @ApiProperty()
  doctorId!: number;
}

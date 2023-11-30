import { PartialType } from '@nestjs/swagger';
import { DoctorRequestDto } from './doctorRequest.dto';

export class DoctorUpdateDto extends PartialType(DoctorRequestDto) {}

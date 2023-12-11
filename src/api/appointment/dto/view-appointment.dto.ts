import { OmitType } from '@nestjs/swagger';
import { AppointmentEntity } from '../appointment.entity';

export class ViewAppointmentDto extends OmitType(AppointmentEntity, [
  'id',
  'patientId',
  'doctorId',
  'doctor',
  'patient',
]) {
  constructor(entity: AppointmentEntity) {
    super();
    this.consultationDate = entity.consultationDate;
    this.status = entity.status;
    this.price = entity.price;
    this.medicalNotes = entity.medicalNotes || null;
  }
}

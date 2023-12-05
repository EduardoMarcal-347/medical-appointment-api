import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { DoctorEntity } from '../doctor/doctor.entity';

@Entity()
export class AppointmentEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: 'Primary key ID',
  })
  id: number;

  @Column({
    type: 'date',
    name: 'consultation_date',
    comment: 'Consultation date',
  })
  consultationDate: Date;

  @Column({
    type: 'int',
    name: 'price',
    comment: 'Appointment price',
  })
  price: number;

  @Column({
    type: 'int',
    name: 'patient_id',
    comment: 'FK User ID',
  })
  patientId: number;

  @Column({
    type: 'int',
    name: 'doctor_id',
    comment: 'FK Doctor ID',
  })
  doctorId: number;

  @ManyToOne(() => UserEntity, (user) => user.appointments)
  @JoinColumn({ name: 'patient_id' })
  patient: UserEntity;
  
  @ManyToOne(() => DoctorEntity, (doctor) => doctor.appointments)
  @JoinColumn({ name: 'doctor_id' })
  doctor: DoctorEntity;


}

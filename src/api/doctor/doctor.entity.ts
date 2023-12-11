import { DoctorSpecialty } from 'src/enums/doctor-specialty.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AvailabilityEntity } from '../availability/availability.entity';
import { AppointmentEntity } from '../appointment/appointment.entity';

@Entity()
export class DoctorEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: 'Primary key ID',
  })
  id: number;

  @Column({
    type: 'varchar',
    name: 'crm',
    length: 13,
    unique: true,
    comment: 'CRM (Conselho Regional de Medicina)',
  })
  crm: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'doctor_name',
    comment: 'Doctor name',
  })
  name: string;

  @Column({
    type: 'date',
    name: 'birthdate',
    comment: 'Birthdate',
  })
  birthdate: Date;

  @Column({
    type: 'enum',
    enum: DoctorSpecialty,
    name: 'specialty',
    nullable: true,
    comment: 'Doctor Specialty',
  })
  specialty: DoctorSpecialty;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'email',
    unique: true,
    comment: 'Doctor email',
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 20,
    name: 'phone_number',
    unique: true,
    comment: 'Doctor phone number',
  })
  phoneNumber: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'address',
    comment: 'Doctor address',
  })
  address: string;

  @Column({
    type: 'number',
    name: 'appointment_price',
    precision: 2,
    comment: 'Appointment price charged by doctor',
  })
  appointmentPrice: number;

  @OneToMany(
    () => AvailabilityEntity,
    (availabilitySchedules) => availabilitySchedules.doctor,
    { eager: true },
  )
  availabilitySchedules: AvailabilityEntity[];

  @OneToMany(() => AppointmentEntity, (appoitment) => appoitment.doctor)
  appointments: AppointmentEntity[];
}

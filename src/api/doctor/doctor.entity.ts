import { DoctorSpecialty } from 'src/enums/doctor-specialty.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Availability } from '../availability/availability.entity';

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
    type: 'varchar',
    length: 255,
    name: 'email',
    unique: true,
    comment: 'Doctor email',
  })
  email: string;

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
    name: 'address',
    comment: 'Doctor address',
  })
  address: string;

  @OneToMany(
    () => Availability,
    (availabilitySchedules) => availabilitySchedules.doctor,
    { eager: true },
  )
  availabilitySchedules: Availability[];
}

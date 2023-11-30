import { DoctorSpecialty } from 'src/enums/doctorSpecialty.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

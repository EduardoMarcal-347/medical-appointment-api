import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

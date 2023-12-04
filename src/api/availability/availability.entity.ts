import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DoctorEntity } from '../doctor/doctor.entity';
import { DayOfWeek } from 'src/enums/day-of-week.enum';

@Entity()
export class AvailabilityEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: 'Primary key ID',
  })
  id: number;

  @Column({
    type: 'int',
    enum: DayOfWeek,
    name: 'day_of_week',
    comment: 'Day of week',
  })
  dayOfWeek: DayOfWeek;

  @Column({
    type: 'date',
    name: 'start_time',
    comment: 'Business Start Time ',
  })
  startTime: Date;

  @Column({
    type: 'date',
    name: 'end_time',
    comment: 'Business End Time ',
  })
  endTime: Date;

  @ManyToOne(() => DoctorEntity, (doctor) => doctor.availabilitySchedules)
  @JoinColumn({ name: 'doctor_id' })
  doctor: DoctorEntity;
}

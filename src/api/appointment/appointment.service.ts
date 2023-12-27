import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ViewAppointmentDto } from './dto/view-appointment.dto';
import { AppointmentEntity } from './appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppointmentStatus } from 'src/enums/appointment-status.enum';
import { DoctorEntity } from '../doctor/doctor.entity';
import { dayOfWeekMapping } from 'src/enums/day-of-week.enum';
import { AvailabilityEntity } from '../availability/availability.entity';
import { parseTimeToUTC } from 'src/utils/date';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(AppointmentEntity)
    private readonly appointmentRepository: Repository<AppointmentEntity>,
    @InjectRepository(DoctorEntity)
    private readonly doctorRepository: Repository<DoctorEntity>,
  ) {}

  async create(reqBody: CreateAppointmentDto): Promise<ViewAppointmentDto> {
    if (!(await this.verifyDoctorExists(reqBody.doctorId)))
      throw new HttpException('doctor does not exist', HttpStatus.BAD_REQUEST);

    const doctor = await this.doctorRepository.findOneBy({
      id: reqBody.doctorId,
    });

    if (
      !(await this.verifyDateIsAvailable(
        reqBody.doctorId,
        new Date(reqBody.consultationDate),
      ))
    )
      throw new HttpException('date is not available', HttpStatus.BAD_REQUEST);

    const appointmentEntity: AppointmentEntity =
      this.appointmentRepository.create({
        ...reqBody,
        consultationDate: new Date(reqBody.consultationDate).toISOString(),
        status: AppointmentStatus.SCHEDULED,
        price: doctor.appointmentPrice,
      });

    return new ViewAppointmentDto(
      await this.appointmentRepository.save(appointmentEntity),
    );
  }

  async findById(reqId: number): Promise<ViewAppointmentDto> {
    const appointmentEntity: AppointmentEntity =
      await this.appointmentRepository.findOneBy({
        id: reqId,
      });
    if (!appointmentEntity)
      throw new HttpException(
        'Appointment does not exist',
        HttpStatus.NOT_FOUND,
      );
    return new ViewAppointmentDto(appointmentEntity);
  }

  async findAll(): Promise<ViewAppointmentDto[]> {
    const appointments: AppointmentEntity[] =
      await this.appointmentRepository.find();
    return appointments.map(
      (appointment) => new ViewAppointmentDto(appointment),
    );
  }

  async update(
    reqId: number,
    reqBody: UpdateAppointmentDto,
  ): Promise<ViewAppointmentDto> {
    if (!this.verifyAppointmentExists(reqId))
      throw new HttpException(
        'appointment does not exist',
        HttpStatus.NOT_FOUND,
      );
    const appointment = await this.appointmentRepository.findOneBy({
      id: reqId,
    });
    if (
      !this.verifyDateIsAvailable(
        appointment.doctorId,
        reqBody.consultationDate,
      )
    )
      throw new HttpException('date is not available', HttpStatus.BAD_REQUEST);
    return Object.assign(appointment, reqBody);
  }

  async verifyDoctorExists(reqId: number): Promise<boolean> {
    return !!(await this.doctorRepository.findOneBy({
      id: reqId,
    }));
  }

  async verifyAppointmentExists(reqId: number): Promise<boolean> {
    return !!(await this.appointmentRepository.findOneBy({
      id: reqId,
    }));
  }

  async verifyDateIsAvailable(docId: number, date: Date): Promise<boolean> {
    const doctor: DoctorEntity = await this.doctorRepository.findOneBy({
      id: docId,
    });
    const minimumInterval: number = 60 * 60 * 1000;
    const consultationDateTime: number = date.getTime();
    const consultationDayOfWeek: string = dayOfWeekMapping[date.getDay()];
    const consultationTime: Date = parseTimeToUTC(
      date.toISOString().slice(11, 19),
    );

    const doctorSchedule: AvailabilityEntity =
      doctor.availabilitySchedules.find(
        (schedule) => schedule.dayOfWeek == consultationDayOfWeek,
      );
    const doctorStartTime: Date = parseTimeToUTC(
      doctorSchedule.startTime.toString(),
    );
    const doctorEndTime: Date = parseTimeToUTC(
      doctorSchedule.endTime.toString(),
    );
    const isWithinAvailability =
      doctorStartTime <= consultationTime && doctorEndTime >= consultationTime;

    if (!doctorSchedule) return false;
    if (!isWithinAvailability) return false;
    if (!doctor.appointments) return true;

    return !doctor.appointments.some((appointment) => {
      const existingAppointment: number = new Date(
        appointment.consultationDate,
      ).getTime();
      const timeDifference: number = Math.abs(
        existingAppointment - consultationDateTime,
      );

      return timeDifference < minimumInterval;
    });
  }
}

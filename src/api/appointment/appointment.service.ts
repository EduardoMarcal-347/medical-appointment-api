import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ViewAppointmentDto } from './dto/view-appointment.dto';
import { AppointmentEntity } from './appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppointmentStatus } from 'src/enums/appointment-status.enum';
import { DoctorEntity } from '../doctor/doctor.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(AppointmentEntity)
    private readonly appointmentRepository: Repository<AppointmentEntity>,
    @InjectRepository(DoctorEntity)
    private readonly doctorRepository: Repository<DoctorEntity>,
  ) {}

  async create(reqBody: CreateAppointmentDto): Promise<ViewAppointmentDto> {
    if (!this.verifyEntityExists(reqBody.doctorId, this.doctorRepository))
      throw new HttpException('doctor does not exist', HttpStatus.BAD_REQUEST);
    const doctor = await this.doctorRepository.findOneBy({
      id: reqBody.doctorId,
    });
    if (!this.verifyDateIsAvailable(reqBody.doctorId, reqBody.consultationDate))
      throw new HttpException('date is not available', HttpStatus.BAD_REQUEST);
    const appointmentEntity: AppointmentEntity =
      this.appointmentRepository.create({
        ...reqBody,
        status: AppointmentStatus.SCHEDULED,
        price: doctor.appointmentPrice,
      });
    return new ViewAppointmentDto(appointmentEntity);
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
    if (!this.verifyEntityExists(reqId, this.appointmentRepository))
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

  async verifyEntityExists(
    reqId: number,
    repository: Repository<unknown>,
  ): Promise<boolean> {
    return !!(await repository.findOneBy({
      id: reqId,
    }));
  }

  async verifyDateIsAvailable(docId: number, date: Date): Promise<boolean> {
    const doctor: DoctorEntity = await this.doctorRepository.findOneBy({
      id: docId,
    });
    return doctor.appointments.some(
      (appointment) => (appointment.consultationDate = date),
    );
  }
}

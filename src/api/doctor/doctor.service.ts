import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { DoctorEntity } from './doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { ViewDoctorDto } from './dto/view-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(DoctorEntity)
    private readonly doctorRepository: Repository<DoctorEntity>,
  ) {}

  async create(reqBody: CreateDoctorDto): Promise<ViewDoctorDto> {
    const doctorEntity: DoctorEntity = this.doctorRepository.create({
      ...reqBody,
    });
    return new ViewDoctorDto(await this.doctorRepository.save(doctorEntity));
  }

  async findById(reqId: number): Promise<ViewDoctorDto> {
    const doctor: DoctorEntity = await this.verifyUserExist(reqId);
    return new ViewDoctorDto(doctor);
  }

  async findAll(): Promise<ViewDoctorDto[]> {
    const doctors: DoctorEntity[] = await this.doctorRepository.find();
    return doctors.map((doctor) => new ViewDoctorDto(doctor));
  }

  async update(
    reqId: number,
    reqBody: UpdateDoctorDto,
  ): Promise<ViewDoctorDto> {
    const doctor: DoctorEntity = await this.verifyUserExist(reqId);
    this.doctorRepository.save(Object.assign(doctor, reqBody));
    return new ViewDoctorDto(doctor);
  }

  async delete(reqId: number): Promise<DeleteResult> {
    const doctor: DoctorEntity = await this.verifyUserExist(reqId);
    return this.doctorRepository.delete({ ...doctor });
  }

  async verifyUserExist(reqId: number): Promise<DoctorEntity> {
    const doctor: DoctorEntity | null = await this.doctorRepository.findOneBy({
      id: reqId,
    });
    if (!doctor)
      throw new HttpException('Doctor does not exist', HttpStatus.NOT_FOUND);
    return doctor;
  }
}

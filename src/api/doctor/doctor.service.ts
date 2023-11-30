import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { DoctorEntity } from './doctor.entity';
import { DoctorRequestDto } from './dto/doctorRequest.dto';
import { DoctorViewDto } from './dto/doctorView.dto';
import { DoctorUpdateDto } from './dto/doctorUpdate.dto';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(DoctorEntity)
    private readonly doctorRepository: Repository<DoctorEntity>,
  ) {}

  async create(reqBody: DoctorRequestDto): Promise<DoctorViewDto> {
    const doctorEntity: DoctorEntity = this.doctorRepository.create({
      ...reqBody,
    });
    return new DoctorViewDto(await this.doctorRepository.save(doctorEntity));
  }

  async findById(reqId: number): Promise<DoctorViewDto> {
    const doctor: DoctorEntity = await this.verifyUserExist(reqId);
    return new DoctorViewDto(doctor);
  }

  async findAll(): Promise<DoctorViewDto[]> {
    const doctors: DoctorEntity[] = await this.doctorRepository.find();
    return doctors.map((doctor) => new DoctorViewDto(doctor));
  }

  async updateOne(
    reqId: number,
    reqBody: DoctorUpdateDto,
  ): Promise<DoctorViewDto> {
    const doctor: DoctorEntity = await this.verifyUserExist(reqId);
    this.doctorRepository.save(Object.assign(doctor, reqBody));
    return new DoctorViewDto(doctor);
  }

  async deleteOne(reqId: number): Promise<DeleteResult> {
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

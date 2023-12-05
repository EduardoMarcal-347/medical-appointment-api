import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { AvailabilityEntity } from './availability.entity';
import { ViewAvailabilityDto } from './dto/view-availability.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { DoctorEntity } from '../doctor/doctor.entity';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(AvailabilityEntity)
    private readonly availabilityRepository: Repository<AvailabilityEntity>,
    @InjectRepository(DoctorEntity)
    private readonly doctorRepository: Repository<DoctorEntity>,
  ) {}

  async create(reqBody: CreateAvailabilityDto): Promise<ViewAvailabilityDto> {
    if (!(await this.verifyDoctorExist(reqBody.doctorId)))
      throw new HttpException('Doctor does not exist', HttpStatus.BAD_REQUEST);
    const availabilityEntity: AvailabilityEntity =
      this.availabilityRepository.create({
        ...reqBody,
      });
    return new ViewAvailabilityDto(
      await this.availabilityRepository.save(availabilityEntity),
    );
  }

  async findAllByDoctor(reqId: number): Promise<ViewAvailabilityDto[]> {
    if (!(await this.verifyDoctorExist(reqId)))
      throw new HttpException('Doctor does not exist', HttpStatus.NOT_FOUND);
    const availabilities: AvailabilityEntity[] =
      await this.availabilityRepository.find({
        where: { doctorId: reqId },
      });
    return availabilities.map(
      (availability) => new ViewAvailabilityDto(availability),
    );
  }

  async findById(reqId: number): Promise<ViewAvailabilityDto> {
    const availability = await this.verifyAvailabilityExist(reqId);
    if (!availability)
      throw new HttpException(
        'Availability does not exist',
        HttpStatus.NOT_FOUND,
      );
    return new ViewAvailabilityDto(availability);
  }

  async update(
    reqId: number,
    reqBody: UpdateAvailabilityDto,
  ): Promise<ViewAvailabilityDto> {
    const availability = await this.verifyAvailabilityExist(reqId);
    if (!availability)
      throw new HttpException(
        'Availability does not exist',
        HttpStatus.NOT_FOUND,
      );
    if (!(await this.verifyDoctorExist(reqBody.doctorId)))
      throw new HttpException('Doctor does not exist', HttpStatus.BAD_REQUEST);
    return this.availabilityRepository.save(
      Object.assign(availability, reqBody),
    );
  }

  async delete(reqId: number): Promise<DeleteResult> {
    const availability = await this.verifyAvailabilityExist(reqId);
    if (!availability)
      throw new HttpException(
        'Availability does not exist',
        HttpStatus.NOT_FOUND,
      );
    return this.availabilityRepository.delete({
      ...availability,
    });
  }

  async verifyAvailabilityExist(reqId: number): Promise<AvailabilityEntity> {
    const availability = await this.availabilityRepository.findOneBy({
      id: reqId,
    });
    return availability;
  }

  async verifyDoctorExist(reqId: number): Promise<boolean> {
    return !!(await this.doctorRepository.findOneBy({
      id: reqId,
    }));
  }
}

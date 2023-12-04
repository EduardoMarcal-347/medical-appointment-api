import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';
import { AvailabilityEntity } from './availability.entity';
import { ViewAvailabilityDto } from './dto/view-availability.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    this.verifyDoctorExist(reqBody.doctorId);
    const availabilityEntity: AvailabilityEntity =
      this.availabilityRepository.create({
        ...reqBody,
      });
    return new ViewAvailabilityDto(
      await this.availabilityRepository.save(availabilityEntity),
    );
  }

  async findAllByDoctor(reqId: number): Promise<ViewAvailabilityDto[]> {
    this.verifyDoctorExist(reqId);
    const availabilities: AvailabilityEntity[] =
      await this.availabilityRepository.find({
        where: { doctor: { id: reqId } },
      });
    return availabilities.map(
      (availability) => new ViewAvailabilityDto(availability),
    );
  }

  async findById(reqId: number): Promise<ViewAvailabilityDto> {
    const availability: AvailabilityEntity =
      await this.availabilityRepository.findOneBy({ id: reqId });
    return new ViewAvailabilityDto(availability);
  }

  async update(
    reqId: number,
    reqBody: UpdateAvailabilityDto,
  ): Promise<ViewAvailabilityDto> {
    this.verifyDoctorExist(reqBody.doctorId);
    return this.availabilityRepository.save(
      Object.assign(await this.verifyAvailabilityExist(reqId), reqBody),
    );
  }

  async delete(reqId: number) {
    this.availabilityRepository.delete({
      ...(await this.verifyAvailabilityExist(reqId)),
    });
  }

  async verifyAvailabilityExist(reqId: number): Promise<AvailabilityEntity> {
    const availability = await this.availabilityRepository.findOneBy({
      id: reqId,
    });
    if (!availability)
      throw new HttpException('Doctor does not exist', HttpStatus.NOT_FOUND);
    return availability;
  }

  async verifyDoctorExist(reqId: number): Promise<boolean> {
    if (
      !(await this.doctorRepository.findOneBy({
        id: reqId,
      }))
    )
      throw new HttpException('Doctor does not exist', HttpStatus.NOT_FOUND);
    return true;
  }
}

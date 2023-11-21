import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRequestDto } from './dto/userRequest.dto';
import { UserViewDto } from './dto/userView.dto';
import { Repository } from 'typeorm';
import { UserUpdateDto } from './dto/userUpdate.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(reqBody: UserRequestDto): Promise<UserViewDto> {
    const userEntity: UserEntity = this.userRepository.create({ ...reqBody });
    return new UserViewDto(await this.userRepository.save(userEntity));
  }

  async findAll(): Promise<UserViewDto[]> {
    const users: UserEntity[] = await this.userRepository.find();
    return users.map((user) => new UserViewDto(user));
  }

  async updateOne(reqId: number, reqBody: UserUpdateDto): Promise<UserViewDto> {
    const user: UserEntity = await this.userRepository.findOneBy({ id: reqId });
    this.userRepository.save(Object.assign(user, reqBody));
    return new UserViewDto(user);
  }
}

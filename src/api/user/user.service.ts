import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRequestDto } from './dto/userRequest.dto';
import { UserViewDto } from './dto/userView.dto';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(userDto: UserRequestDto): Promise<UserViewDto> {
    const userEntity = this.userRepository.create({ ...userDto });
    const savedUser = await this.userRepository.save(userEntity);
    return plainToInstance(UserViewDto, savedUser);
  }
}

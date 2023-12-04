import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { ViewUserDto } from './dto/view-user.dto';
import { DeleteResult, Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(reqBody: CreateUserDto): Promise<ViewUserDto> {
    const userEntity: UserEntity = this.userRepository.create({ ...reqBody });
    return new ViewUserDto(await this.userRepository.save(userEntity));
  }

  async findById(reqId: number): Promise<ViewUserDto> {
    const user: UserEntity = await this.verifyUserExist(reqId);
    return new ViewUserDto(user);
  }

  async findAll(): Promise<ViewUserDto[]> {
    const users: UserEntity[] = await this.userRepository.find();
    return users.map((user) => new ViewUserDto(user));
  }

  async updateOne(reqId: number, reqBody: UpdateUserDto): Promise<ViewUserDto> {
    const user: UserEntity = await this.verifyUserExist(reqId);
    this.userRepository.save(Object.assign(user, reqBody));
    return new ViewUserDto(user);
  }

  async deleteOne(reqId: number): Promise<DeleteResult> {
    const user: UserEntity = await this.verifyUserExist(reqId);
    return this.userRepository.delete({ ...user });
  }

  async verifyUserExist(reqId: number): Promise<UserEntity> {
    const user: UserEntity | null = await this.userRepository.findOneBy({
      id: reqId,
    });
    if (!user)
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    return user;
  }
}

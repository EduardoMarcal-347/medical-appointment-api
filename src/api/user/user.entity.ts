import { HealthInsurance } from 'src/enums/health-insurance.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: 'Primary key ID',
  })
  id: number;

  @Column({
    type: 'varchar',
    name: 'cpf',
    unique: true,
    comment: 'CPF (Cadastro de Pessoa Física)',
  })
  cpf: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'user_name',
    comment: 'User name',
  })
  name: string;

  @Column({
    type: 'date',
    name: 'birthdate',
    comment: 'Birthdate',
  })
  birthdate: Date;

  @Column({
    type: 'enum',
    enum: HealthInsurance,
    name: 'health_insurance',
    nullable: true,
    comment: 'Health Insurance',
  })
  healthInsurance: HealthInsurance;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'email',
    unique: true,
    comment: 'User email',
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 20,
    name: 'phone_number',
    unique: true,
    comment: 'User phone number',
  })
  phoneNumber: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'address',
    comment: 'User address',
  })
  address: string;
}

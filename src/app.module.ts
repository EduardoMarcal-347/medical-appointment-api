import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ ignoreEnvFile: false, isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      url: process.env.DB_URL,
      entities: [process.env.ENTITY_PATH],
      synchronize: true,
    }),
    ApiModule,
  ],
})
export class AppModule {}

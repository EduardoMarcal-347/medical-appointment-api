import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Medical Appointment API')
    .setDescription(
      'The Medical Appointment Scheduling API facilitates seamless scheduling, management, and viewing of medical appointments. Users can create, retrieve, update, and cancel appointments. Additionally, the API allows checking appointment availability, obtaining details about medical professionals, and accessing information on scheduled appointments. It requires valid authentication headers in requests, returns responses in JSON format, and encourages developers to follow best practices for efficient and secure integration.',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();

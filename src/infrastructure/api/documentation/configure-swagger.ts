import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function configureSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Hexa Poll API')
    .setDescription('The API for Hexa Poll')
    .setVersion('1.0')
    .setContact(
      'Yannis Alouache',
      'https://github.com/Yannis-Alouache',
      'yannisalouache@gmail.com',
    )
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, documentFactory);
}

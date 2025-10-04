import { NestFactory } from '@nestjs/core';
import { AppModule } from './infrastructure/api/modules/app.module';
import { configureSwagger } from './infrastructure/api/documentation/configure-swagger';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  configureSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
  console.log("🚀 Hexa Poll is running on port : " + (process.env.PORT ?? 3000));
}

bootstrap();

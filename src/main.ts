import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as color from 'ansi-colors';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8000, () => {
    console.log(
      color.italic.yellowBright.bold('Servidor rodando na porta 8000 🚀'),
    );
  });
}
bootstrap();

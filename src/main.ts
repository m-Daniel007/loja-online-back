import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as color from 'ansi-colors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(8000, () => {
    console.log(
      color.italic.cyanBright.bold('Servidor rodando na porta 8000 🚀'),
    );
  });
}
bootstrap();

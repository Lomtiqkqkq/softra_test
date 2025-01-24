import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = configService.get<string>('PORT') || 3000;
  await app.listen(port, () => {
    console.log(`listen: ${port}`);
  });
}
bootstrap();

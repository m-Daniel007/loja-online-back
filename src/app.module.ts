import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MorganMiddleware } from '@nest-middlewares/morgan';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    MorganMiddleware.configure('dev');
    consumer.apply(MorganMiddleware).forRoutes('*');
  }
}

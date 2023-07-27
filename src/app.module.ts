import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MorganMiddleware } from '@nest-middlewares/morgan';

@Module({
  imports: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    MorganMiddleware.configure('dev');
    consumer.apply(MorganMiddleware).forRoutes('*');
  }
}

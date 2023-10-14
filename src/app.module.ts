import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MorganMiddleware } from '@nest-middlewares/morgan';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityModule } from './city/city.module';
import { AddressModule } from './address/address.module';
import { StateModule } from './state/state.module';
import { CacheModule } from './cache/cache.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'guards/roles.guard';
import { JwtModule } from '@nestjs/jwt';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { CartProductModule } from './cart-product/cart-product.module';
import { PaymentStatusModule } from './payment-status/payment-status.module';
import { PaymentService } from './payment/payment.service';
import { PaymentModule } from './payment/payment.module';
import { OrderModule } from './order/order.module';
import { OrderProductModule } from './order-product/order-product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      entities: [`${__dirname}/**/*.entity{.js,.ts}`],
      migrations: [`${__dirname}/config/migrations/{.ts,*.js}`],
      migrationsRun: true,
    }),
    UserModule,
    CityModule,
    AddressModule,
    StateModule,
    CacheModule,
    AuthModule,
    JwtModule,
    CategoryModule,
    ProductModule,
    CartModule,
    CartProductModule,
    PaymentStatusModule,
    PaymentModule,
    OrderModule,
    OrderProductModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    PaymentService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    MorganMiddleware.configure('dev');
    consumer.apply(MorganMiddleware).forRoutes('*');
  }
}

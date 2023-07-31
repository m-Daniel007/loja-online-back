import { CacheModule as cacheModuleNest } from '@nestjs/cache-manager';
import {  Module } from '@nestjs/common';
import { CacheService } from './cache.service';

@Module({
  imports: [
    cacheModuleNest.register({
      ttl: 9000000,
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
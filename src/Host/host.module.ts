import { Module } from '@nestjs/common';
import { HostController } from './host.controller';
import { HostService } from './host.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HostEntity } from './host.entity';

@Module({
  imports :[TypeOrmModule.forFeature([HostEntity])],
  controllers: [HostController],
  providers: [HostService],
})
export class HostModule {}

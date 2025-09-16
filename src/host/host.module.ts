import { Module } from '@nestjs/common';
import { HostService } from './host.service';
import { HostController } from './host.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exhibition } from './exhibition.entity';
import { Host } from './host.entity';
import { Users } from 'src/users/users.entity';
import { Booking } from 'src/customer/booking.entity';
import { Feedback } from 'src/customer/feedback.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exhibition, Host, Booking, Feedback])],
  controllers: [HostController],
  providers: [HostService],
})
export class HostModule {}

import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { AdminAction } from './adminAction.entity';
import { Exhibition } from 'src/host/exhibition.entity';
import { Booking } from 'src/customer/booking.entity';
import { Feedback } from 'src/customer/feedback.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, AdminAction, Exhibition, Booking, Feedback])],
  providers: [AdminService],
  controllers: [AdminController]
})
export class AdminModule {}

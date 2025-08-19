import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { Feedback } from './feedback.entity';
import { Users } from 'src/users/users.entity';
import { Exhibition } from 'src/host/exhibition.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking,Feedback,Exhibition,Users])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}

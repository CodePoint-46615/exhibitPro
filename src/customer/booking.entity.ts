import { Exhibition } from 'src/host/exhibition.entity';
import { Users } from 'src/users/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

export enum PaymentStatus {
  PAID = 'paid',
  UNPAID = 'unpaid',
  CANCELLED = 'cancelled',
}

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  bookingID: string;

  @ManyToOne(() => Exhibition, (exhibition) => exhibition.bookings)
  exhibition: Exhibition;

  @ManyToOne(() => Users, (user) => user.bookings)
  customer: Users;

  @Column()
  ticketsBooked: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.UNPAID,
  })
  paymentStatus: PaymentStatus;

  @CreateDateColumn()
  bookingDate: Date;
}

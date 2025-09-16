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
  booking_id: string;

  @ManyToOne(() => Exhibition, (exhibition) => exhibition.bookings, { onDelete: 'CASCADE' })
  exhibition: Exhibition;

  @ManyToOne(() => Users, (user) => user.bookings)
  customer: Users;

  @Column()
  tickets_booked: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_price: number;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.UNPAID,
  })
  payment_status: PaymentStatus;

  @CreateDateColumn()
  booking_date: Date;
}

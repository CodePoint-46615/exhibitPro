import { Booking } from 'src/customer/booking.entity';
import { Feedback } from 'src/customer/feedback.entity';
import { Users } from 'src/users/users.entity';
import {Entity,PrimaryGeneratedColumn,Column,ManyToOne,OneToMany,CreateDateColumn,} from 'typeorm';

export enum ExhibitionStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity('exhibitions')
export class Exhibition {
  @PrimaryGeneratedColumn('uuid')
  exhibition_id: string;

  @ManyToOne(() => Users, (user) => user.exhibitions)
  host: Users;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  location: string;

  @Column()
  category: string;

  @Column({ type: 'timestamp' })
  start_date: Date;

  @Column({ type: 'timestamp' })
  end_date: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  ticket_price: number;

  @Column()
  capacity: number;

  @Column({ nullable: true })
  cover_image: string;

  @Column({
    type: 'enum',
    enum: ExhibitionStatus,
    default: ExhibitionStatus.PENDING,
  })
  status: ExhibitionStatus;

  @CreateDateColumn()
  created_at: Date;

  // ---------------- Relations ----------------

  @OneToMany(() => Booking, (booking) => booking.exhibition)
  bookings: Booking[];

  @OneToMany(() => Feedback, (feedback) => feedback.exhibition)
  feedbacks: Feedback[];
}

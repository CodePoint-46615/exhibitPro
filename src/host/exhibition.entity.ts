import { Booking } from 'src/customer/booking.entity';
import { Feedback } from 'src/customer/feedback.entity';
import { Users } from 'src/users/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, } from 'typeorm';

export enum ExhibitionStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity('exhibitions')
export class Exhibition {
  @PrimaryGeneratedColumn('uuid')
  exhibitionID: string;

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
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  ticketPrice: number;

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
  createdAt: Date;

  @Column({ nullable: true }) // 👈 add this
  imageUrl?: string;

  // ---------------- Relations ----------------

  @OneToMany(() => Booking, (booking) => booking.exhibition)
  bookings: Booking[];

  @OneToMany(() => Feedback, (feedback) => feedback.exhibition)
  feedbacks: Feedback[];
}

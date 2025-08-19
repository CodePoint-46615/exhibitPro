import { AdminAction } from 'src/admin/adminAction.entity';
import { Booking } from 'src/customer/booking.entity';
import { Feedback } from 'src/customer/feedback.entity';
import { Exhibition } from 'src/host/exhibition.entity';
import {
  Admin,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

export enum UserRole {
  ADMIN = 'admin',
  HOST = 'host',
  CUSTOMER = 'customer',
}

@Entity('Users')
export class Users {
  @PrimaryGeneratedColumn('uuid')
  userID: string;
  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({type: 'bigint', nullable: true })
  phone: number;

  @Column({ nullable: true })
  profile_image: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Exhibition, (exhibition) => exhibition.host)
  exhibitions: Exhibition[];

  @OneToMany(() => Booking, (booking) => booking.customer)
  bookings: Booking[];

  @OneToMany(() => Feedback, (feedback) => feedback.customer)
  feedbacks: Feedback[];

  @OneToMany(() => AdminAction, (action) => action.admin)
  adminActions: AdminAction[];
}

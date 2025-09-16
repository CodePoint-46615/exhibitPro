import { Users } from 'src/users/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity('admin_actions')
export class AdminAction {
  @PrimaryGeneratedColumn('uuid')
  action_id: string;

  @ManyToOne(() => Users, (user) => user.adminActions)
  admin: Users;

  @Column()
  action_type: string; // e.g., "approve_host", "delete_booking", "ban_user"

  @Column({ nullable: true })
  target_type?: string; // e.g., "user", "exhibition", "booking", "feedback"

  @Column({ nullable: true })
  target_id: string; // affected user/exhibition/booking/etc.

  @Column('text')
  description: string; // More detail about the action

  @CreateDateColumn()
  action_time: Date;
}

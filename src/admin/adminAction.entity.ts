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
  actionID: string;

  @ManyToOne(() => Users, (user) => user.adminActions)
  admin: Users;

  @Column()
  actionType: string; // e.g., "approve_host", "delete_booking", "ban_user"

  @Column({ nullable: true })
  targetType?: string; // e.g., "user", "exhibition", "booking", "feedback"

  @Column({ nullable: true })
  targetID: string; // affected user/exhibition/booking/etc.

  @Column('text')
  description: string; // More detail about the action

  @CreateDateColumn()
  actionTime: Date;
}

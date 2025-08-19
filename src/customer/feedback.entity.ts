import { Exhibition } from 'src/host/exhibition.entity';
import { Users } from 'src/users/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity('feedbacks')
export class Feedback {
  @PrimaryGeneratedColumn('uuid')
  feedbackID: string;

  @ManyToOne(() => Users, (user) => user.feedbacks)
  customer: Users;

  @ManyToOne(() => Exhibition, (exhibition) => exhibition.feedbacks)
  exhibition: Exhibition;

  @Column({ type: 'int' })
  rating: number; // 1 to 5

  @Column('text')
  comment: string;

  @CreateDateColumn()
  submittedAt: Date;
}

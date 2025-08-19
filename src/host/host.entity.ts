import { Users } from 'src/users/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('hosts')
export class Host {
  @PrimaryGeneratedColumn('uuid')
  host_id: string;

  @OneToOne(() => Users)
  @JoinColumn({ name: 'host_id' })
  user: Users;

  @Column()
  organization: string;

  @Column('text')
  address: string;

  @Column({ nullable: true })
  website_url: string;

  @Column({ default: false })
  approved: boolean;
}

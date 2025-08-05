import { BeforeInsert } from "typeorm";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('customers')
export class CustomerEntity {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 150 })
  fullName: string;

  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @BeforeInsert()
  generateId() {
    // Custom logic before insert (if any)
    this.id = this.id || crypto.randomUUID(); // Optional if using UUID strategy
  }
}

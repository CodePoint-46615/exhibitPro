import { BeforeInsert, Column, Entity, PrimaryColumn} from "typeorm";

@Entity('admins')
export class AdminEntity {
    @PrimaryColumn()
    id: string;
    @BeforeInsert()
    generateId() {
        this.id = 'admin_' + Math.floor(Math.random() * 1000000);
    }

    @Column({type: 'boolean', default: true})
    isActive: boolean;
    @Column({type: 'varchar', nullable: true})
    fullname: string | null;
    @Column({type: 'bigint'})
    phone: number;

    @BeforeInsert()
    checkPhoneUnsigned() {
    if (BigInt(this.phone) < 0n) {
      throw new Error('Phone number must be unsigned (non-negative).');
        }
    }   
}
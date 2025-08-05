import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class HostEntity{

@PrimaryGeneratedColumn({unsigned:true})
id : number;

@Column({type:'varchar',length:100})
fullName: string;

@Column({type:'int', unsigned: true})
age:number;

@Column({type:'enum',enum:['active','inactive'],default:'active'})
status: 'active' | 'inactive';

}

import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity()
  export class Admin {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar' })
    fullname: string;
  
    @Column({ type: 'varchar', unique: true })
    phone: string;
  
    @Column({ type: 'varchar', unique: true })
    email: string;
  
    @Column({ type: 'varchar' })
    password: string;
  
    @Column({ type: 'varchar' })
    photo: string;
  
    @Column({ type: 'boolean', default: true })
    is_active: boolean;
  
    @Column({ type: 'boolean', default: true })
    is_admin: boolean;
  }
  

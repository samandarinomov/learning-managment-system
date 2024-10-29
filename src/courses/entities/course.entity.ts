import { User } from 'src/user/entities/user.entity';
import { Modules } from 'src/modules/entities/module.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Enrollment } from 'src/enrollment/entities/enrollment.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column({ type: 'varchar' })
  name: String;

  @Column({ type: 'varchar' })
  description: String;

  @Column({ type: 'float' })
  price: Number;

  @Column({ type: 'varchar' })
  teacher: String;

  @Column({ type: 'varchar' })
  category: String;

  @Column({ type: 'int' })
  level: Number;

  @ManyToOne(() => User, (user) => user.course)
  users: User[];

  @OneToMany(() => Modules, (module) => module.course)
  modules: Modules[];

  @OneToMany(() => Enrollment, enrollment => enrollment.course)
  enrollments: Enrollment[]

  @OneToMany(() => User, user => user.course)
  user: User[]
}

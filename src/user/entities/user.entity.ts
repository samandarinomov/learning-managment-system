import { Course } from "src/courses/entities/course.entity";
import { Enrollment } from "src/enrollment/entities/enrollment.entity";
import { Result } from "src/results/entities/result.entity";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar' })
  fullname: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @ManyToOne(()=> Course, (course) => course.users)
  course: Course 

  @Column({ type: 'varchar'})
  role: String;

  @ManyToOne(() => Enrollment, enrollment => enrollment.user)
  enrollments: Enrollment[]

  @OneToMany(() => Result, (result) => result.user)
    result: Result[];
}


import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Course } from 'src/courses/entities/course.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course, (course) => course.enrollments)
  course: Course;

  @ManyToOne(() => User, (user) => user.enrollments)
  user: User;
}


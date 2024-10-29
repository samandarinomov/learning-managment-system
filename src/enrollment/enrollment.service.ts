import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './entities/enrollment.entity';
import { Course } from 'src/courses/entities/course.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentsRepository: Repository<Enrollment>,
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async enroll(userId: any, courseId: any): Promise<Enrollment> {
    const course = await this.coursesRepository.findOneBy({ id: courseId });
    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }
  
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  
    const existingEnrollment = await this.enrollmentsRepository.findOne({
      where: { course: { id: courseId }, user: { id: userId } },
    });
    if (existingEnrollment) {
      throw new HttpException('Already enrolled in this course', HttpStatus.BAD_REQUEST);
    }
  
    const enrollment = this.enrollmentsRepository.create({
      course,
      user, 
    });
    return this.enrollmentsRepository.save(enrollment);
  }
  

  async getUserEnrollments(userId: any): Promise<Course[]> {
    const enrollments = await this.enrollmentsRepository.find({
      where: { user: { id: userId } },
      relations: ['course'],
    });
    return enrollments.map((enrollment) => enrollment.course);
  }
}

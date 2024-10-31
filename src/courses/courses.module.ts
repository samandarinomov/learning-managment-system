import { Module } from '@nestjs/common';
import { CourseService } from './courses.service';
import { CourseController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modules } from 'src/modules/entities/module.entity';
import { Course } from './entities/course.entity';
import { User } from 'src/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { Enrollment } from 'src/enrollment/entities/enrollment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Modules, Course, User, Enrollment]),
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CoursesModule {}

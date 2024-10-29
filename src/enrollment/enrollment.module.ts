import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentsService } from './enrollment.service';
import { EnrollmentsController } from './enrollment.controller';
import { Enrollment } from './entities/enrollment.entity';
import { Course } from 'src/courses/entities/course.entity';
import { User } from 'src/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { Modules } from 'src/modules/entities/module.entity';

@Module({
  imports: [
    JwtModule.register({
     secret: 'verySecret'
    }),
    TypeOrmModule.forFeature([Enrollment, Course, User, Lesson, Modules])],
  controllers: [EnrollmentsController],
  providers: [EnrollmentsService],
})
export class EnrollmentsModule {}

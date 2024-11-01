import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { ModulesModule } from './modules/modules.module';
import { LessonsModule } from './lessons/lessons.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { ResultsModule } from './results/results.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Assignment } from './assignments/entities/assignment.entity';
import { Course } from './courses/entities/course.entity';
import { Modules } from './modules/entities/module.entity';
import { Lesson } from './lessons/entities/lesson.entity';
import { Result } from './results/entities/result.entity';
import { UserModule } from './user/user.module';
import { Auth } from './auth/entities/auth.entity';
import { EnrollmentsModule } from './enrollment/enrollment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      password: 'Fede1519',
      username: 'postgres',
      entities: [User, Assignment, Auth, Course, Modules, Lesson, Result],
      database: 'postgres',
      synchronize: true,
      logging: false,
      autoLoadEntities: true
    }),
    AuthModule,
    CoursesModule,
    ModulesModule,
    LessonsModule,
    AssignmentsModule,
    ResultsModule,
    UserModule,
    EnrollmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

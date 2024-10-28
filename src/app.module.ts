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
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { Admin } from 'typeorm';
import { Auth } from './auth/entities/auth.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'avaz1514',
      username: 'postgres',
      entities: [User, Assignment, Admin, Auth, Course, Modules, Lesson, Result],
      database: 'samandar',
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
    AdminModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

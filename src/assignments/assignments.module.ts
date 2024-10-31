import { Module } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { AssignmentsController } from './assignments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment } from './entities/assignment.entity';
import { Result } from 'src/results/entities/result.entity';
import { JwtModule } from '@nestjs/jwt';
import { ModulesService } from 'src/modules/modules.service';
import { ModulesController } from 'src/modules/modules.controller';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { Modules } from 'src/modules/entities/module.entity';
import { Course } from 'src/courses/entities/course.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Assignment, Result, Lesson, Modules, Course]),
  ],
  controllers: [AssignmentsController, ModulesController],
  providers: [AssignmentsService, ModulesService],
})
export class AssignmentsModule {}

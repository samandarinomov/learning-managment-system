import { Module } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { Modules } from './entities/module.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Lesson } from 'src/lessons/entities/lesson.entity';

@Module({
  imports: [Modules, Course, Lesson],
  controllers: [ModulesController],
  providers: [ModulesService],
})
export class ModulesModule {}

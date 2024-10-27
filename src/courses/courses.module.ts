import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Modules } from 'src/modules/entities/module.entity';
import { Course } from './entities/course.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Modules, Course])
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}

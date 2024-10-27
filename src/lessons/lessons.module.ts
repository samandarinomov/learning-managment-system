import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { Lesson } from './entities/lesson.entity';
import { Modules } from 'src/modules/entities/module.entity';

@Module({
  imports: [Lesson, Modules],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}

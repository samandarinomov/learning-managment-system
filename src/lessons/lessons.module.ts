import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { Lesson } from './entities/lesson.entity';
import { Modules } from 'src/modules/entities/module.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Assignment } from 'src/assignments/entities/assignment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lesson, Modules])],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}

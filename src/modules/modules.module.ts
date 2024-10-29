import { Module } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { ModulesController } from './modules.controller';
import { Modules } from './entities/module.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule} from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
     secret: 'verySecret'
    }),
    TypeOrmModule.forFeature([Course, Modules, Lesson])],
  controllers: [ModulesController],
  providers: [ModulesService],
  exports: [ModulesService]
})
export class ModulesModule {}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Lesson } from './entities/lesson.entity';

@Controller('lesson')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Post()
  create(@Body() createLessonDto: CreateLessonDto): Promise<Lesson> {
    return this.lessonsService.create(createLessonDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(): Promise<Lesson[]> {
    return this.lessonsService.findAll();
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RoleGuard)
  update(@Param('id') id: number, @Body() updateLessonDto: UpdateLessonDto): Promise<string> {
    return this.lessonsService.update(id, updateLessonDto);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: number): Promise<string> {
    return this.lessonsService.remove(id);
  }
}

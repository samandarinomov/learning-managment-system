import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CourseService } from './courses.service';
import { Course } from './entities/course.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/admin/admin.guard';

@Controller('course')
export class CourseController {
  constructor(private readonly CourseService: CourseService) {}

  @Get()
  findAll() {
    return this.CourseService.findAll();
  }

  @UseGuards(AdminGuard, AuthGuard)
  @Post()
  create(@Body() course: Course) {
    return this.CourseService.create(course);
  }
}
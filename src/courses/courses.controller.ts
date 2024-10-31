import { Controller, Headers, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, UnauthorizedException } from '@nestjs/common';
import { CourseService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Course } from './entities/course.entity';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) { }

  @UseGuards(AuthGuard, RoleGuard)
  @Post()
  async create(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    return this.courseService.create(createCourseDto);
  }
  
  @UseGuards(AuthGuard)
  @Get()
  findAll(): Promise<Course[]> {
    return this.courseService.findAll();
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCourseDto: UpdateCourseDto): Promise<string> {
    return this.courseService.update(id, updateCourseDto);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: number): Promise<string> {
    return this.courseService.remove(id);
  }
}

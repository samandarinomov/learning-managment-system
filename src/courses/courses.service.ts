import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CourseService {
  jwtService: any;
  userRepository: any;
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = await this.courseRepository.create(createCourseDto);
    return this.courseRepository.save(course);
  }

  async findAll(): Promise<Course[]> {
    const course = await this.courseRepository.find({relations: [
      'modules',
      'modules.lessons',
      'modules.lessons.assignment',
      'modules.lessons.assignment.results'  
    ]})
    return course
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<string> {
    let coruse = await this.courseRepository.findOneBy({ id })
    if (!coruse) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }
    await this.courseRepository.update({ id }, { ...updateCourseDto });
    return `Course successfully updated`
  }

  async remove(id: number): Promise<string> {
    let course = await this.courseRepository.findOneBy({ id })
    if (!course) {
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    }
    await this.courseRepository.delete(id);
    return "Course successfully deleted"
  }

  }

import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';
import { IsString, IsNumber, IsNotEmpty, IsEnum } from 'class-validator';

enum level {
    beginner = 'beginner',
    junior = 'junior',
    middle = 'middle',
    senior = 'senior'
  }

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
    @IsString()
    @IsNotEmpty()
    name: String

    @IsString()
    @IsNotEmpty()
    description: String

    @IsNumber()
    @IsNotEmpty()
    price: Number

    @IsString()
    @IsNotEmpty()
    teacher: String

    @IsString()
    @IsNotEmpty()
    category: String

    @IsNotEmpty()
    @IsEnum(level)
    level: level
}

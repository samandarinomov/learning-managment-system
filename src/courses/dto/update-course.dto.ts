import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';
import { IsString, IsNumber } from 'class-validator';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
    @IsString()
    name: String

    @IsString()
    description: String

    @IsNumber()
    price: Number

    @IsString()
    teacher: String

    @IsString()
    category: String

    @IsNumber()
    level: Number
}

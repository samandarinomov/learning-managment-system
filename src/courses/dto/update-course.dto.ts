import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

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

    @IsNumber()
    @IsNotEmpty()
    level: Number
}

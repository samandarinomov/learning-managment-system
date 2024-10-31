import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

enum level {
    beginner = 'beginner',
    junior = 'junior',
    middle = 'middle',
    senior = 'senior'
  }

export class CreateCourseDto {
    @IsNotEmpty()
    @IsString()
    name: String

    @IsNotEmpty()
    @IsString()
    description: String

    @IsNotEmpty()
    @IsNumber()
    price: Number

    @IsNotEmpty()
    @IsString()
    teacher: String

    @IsNotEmpty()
    @IsString()
    category: String

    @IsNotEmpty()
    @IsEnum(level)
    level: level
}

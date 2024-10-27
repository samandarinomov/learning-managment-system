import { IsNotEmpty, IsNumber, IsString } from "class-validator";

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
    @IsNumber()
    level: Number
}

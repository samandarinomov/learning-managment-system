import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateLessonDto {
    @IsNotEmpty()
    @IsString()
    name: String

    @IsNotEmpty()
    @IsString()
    content: string

    @IsNotEmpty()
    @IsNumber()
    modulesId: number
}

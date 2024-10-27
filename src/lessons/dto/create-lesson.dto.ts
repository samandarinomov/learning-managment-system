import { IsNotEmpty, IsString } from "class-validator";

export class CreateLessonDto {
    @IsNotEmpty()
    @IsString()
    name: String
}

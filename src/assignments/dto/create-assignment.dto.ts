import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAssignmentDto {
    @IsNotEmpty()
    @IsString()
    task: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsString()
    deadline: string

    @IsNotEmpty()
    @IsNumber()
    lessonId: number
}

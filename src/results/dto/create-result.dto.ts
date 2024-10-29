import { IsNotEmpty, IsString, IsNumber, IsOptional } from "class-validator"

export class CreateResultDto {
    @IsNotEmpty()
    @IsString()
    AssignmentAnswer: string

    @IsNotEmpty()
    @IsNumber()
    assignmentId: number

    @IsOptional()
    @IsNumber()
    userId: number
}

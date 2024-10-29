import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateModuleDto {
    @IsNotEmpty()
    @IsString()
    name: String

    @IsNotEmpty()
    @IsNumber()
    courseId: number
}

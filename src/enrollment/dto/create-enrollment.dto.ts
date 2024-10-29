import { IsNotEmpty } from "class-validator";

export class CreateEnrollmentDto {
    @IsNotEmpty()
    userId: number
}

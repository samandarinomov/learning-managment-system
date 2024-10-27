import { IsNotEmpty, IsString } from "class-validator";

export class CreateModuleDto {
    @IsNotEmpty()
    @IsString()
    name: String
}

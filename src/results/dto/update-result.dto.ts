import { PartialType } from '@nestjs/mapped-types';
import { CreateResultDto } from './create-result.dto';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UpdateResultDto extends PartialType(CreateResultDto) {
    @IsNotEmpty()
    @IsString()
    teacherFeedBack: string

    @IsNotEmpty()
    @IsNumber()
    score: number
}

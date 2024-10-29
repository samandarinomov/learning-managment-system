import { PartialType } from '@nestjs/mapped-types';
import { CreateLessonDto } from './create-lesson.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateLessonDto extends PartialType(CreateLessonDto) {
    @IsString()
    @IsNotEmpty()
    name: String;

    @IsNotEmpty()
    @IsString()
    content: string;
}

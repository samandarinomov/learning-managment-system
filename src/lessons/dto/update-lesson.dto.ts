import { PartialType } from '@nestjs/mapped-types';
import { CreateLessonDto } from './create-lesson.dto';
import { IsString } from 'class-validator';

export class UpdateLessonDto extends PartialType(CreateLessonDto) {
    @IsString()
    name: String;
}

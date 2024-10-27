import { PartialType } from '@nestjs/mapped-types';
import { CreateModuleDto } from './create-module.dto';
import { IsString } from 'class-validator';

export class UpdateModuleDto extends PartialType(CreateModuleDto) {
    @IsString()
    name: String
}

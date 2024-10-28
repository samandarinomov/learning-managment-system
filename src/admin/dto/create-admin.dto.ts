import { IsNotEmpty, IsString, IsEnum, IsArray, IsPhoneNumber } from 'class-validator';

export class CreateAdminDto {
  
  @IsString()
  fullname: string;

  
  @IsString()
  @IsPhoneNumber('UZ')
  phone: string;

  
  @IsString()
  email: string;

 
  @IsString()
  password: string;
}


import {
    IsNotEmpty,
    IsString,
    IsEmail,
    IsEnum,
  } from 'class-validator';

  enum role {
    admin = 'admin',
    user = 'user',
  }
  
  export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    fullname: string;
  
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsEnum(role)
    role: role
  }
  

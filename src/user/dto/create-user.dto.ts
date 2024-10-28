import {
    IsNotEmpty,
    IsString,
    IsEnum,
    IsEmail,
  } from 'class-validator';
  
  export class CreateUserDto {
   
    @IsString()
    fullname: string;
  
   
    @IsEmail()
    email: string;
  
    
    @IsString()
    password: string;
  
    
    @IsString()
    birth_date: string;
  }
  

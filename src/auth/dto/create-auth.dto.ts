import {
    IsNotEmpty,
    IsString,
    IsEmail,
  } from 'class-validator';
  
  export class CreateAuthDto {
   
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
    @IsString()
    role: string
  }
  
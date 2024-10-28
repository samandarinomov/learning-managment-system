import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class LoginDto {
 
  @IsEmail()
  email: string;

  
  @IsString()
  password: string;
}

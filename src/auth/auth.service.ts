import { ConflictException, Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';
import { hash, compare } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    public jwtService: JwtService,
  ) {}

  async register({ fullname, email, password}: CreateAuthDto): Promise<User | any> {
    const findUserByEmail = await this.userRepository.findOneBy({ email });
    if (findUserByEmail) {
      throw new ConflictException('User with this email already exists');
    }

    let hashedPass = await hash(password, 12);
    let newUser = await this.userRepository.create({
      fullname,
      email,
      password: hashedPass,
    });
    await this.userRepository.save(newUser);
    let payload = {
      id: newUser.id,
      email: newUser.email,
      isAdmin: newUser.is_admin,
    };
    let refresh_token = await this.jwtService.sign(payload);
    let access_token = await this.jwtService.sign(payload, { expiresIn: '1h' });
    return { newUser, refresh_token, access_token };
  }

  async login(loginDto: LoginDto): Promise<any> {
    let { email, password } = loginDto;
    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new UnauthorizedException();

    let verify = await compare(password, user.password);
    if (!verify) throw new UnauthorizedException();
    
    let payload = { id: user.id, login: user.email, isAdmin: user.is_admin };
    let refresh_token = await this.jwtService.sign(payload, {expiresIn: '7d' });
    let access_token = await this.jwtService.sign(payload, { expiresIn: '1h' });
    return {user, refresh_token, access_token};
  }


  async getMyData(payload: any) {
    const user = await this.userRepository.findOneBy({ id: payload.id });
    return user;
  }
}

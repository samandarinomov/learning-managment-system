import { ConflictException, Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async register({ fullname, email, password, role}: CreateAuthDto): Promise<User | any> {
    const findUserByEmail = await this.userRepository.findOneBy({ email });
    if (findUserByEmail) {
      throw new ConflictException('User with this email already exists');
    }

    let hashedPass = await hash(password, 12);
    let newUser = await this.userRepository.create({
      fullname,
      email,
      role,
      password: hashedPass,
    });
    await this.userRepository.save(newUser);
    let payload = {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role
    };
    let refresh_token = await this.jwtService.sign(payload);
    let access_token = await this.jwtService.sign(payload, { expiresIn: '3h' });
    return 'Succesfully sign in';
  }

  async login(loginDto: LoginDto): Promise<any> {
    let { email, password } = loginDto;
    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new UnauthorizedException();

    let verify = await compare(password, user.password);
    if (!verify) throw new UnauthorizedException();
    
    let payload = { id: user.id, login: user.email, role: user.role };
    let refresh_token = await this.jwtService.sign(payload, {expiresIn: '7d' });
    let access_token = await this.jwtService.sign(payload, { expiresIn: '3h' });
    return { refresh_token, access_token};
  }

  async getMyData(request) {
    if (!request || !request.user || !request.user.id) {
        throw new Error('Foydalanuvchi identifikatori topilmadi');
    }

    const userId = request.user.id;
    const user = await this.userRepository.findOne({where: { id: userId} });
    return user;
}

}

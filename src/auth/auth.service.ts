import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}

    async register(name: string, email: string, password: string, role: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({ name, email, password: hashedPassword, role });
        await this.userRepository.save(user);
        
        return this.generateTokens(user.id);
    }

    async login(email: string, password: string) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException("Noto'g'ri email yoki parol");
        }

        return this.generateTokens(user.id);
    }

    async generateTokens(userId: number) {
        const accessToken = this.jwtService.sign({ userId }, { expiresIn: '15m' });
        const refreshToken = this.jwtService.sign({ userId }, { expiresIn: '7d' });

        return { accessToken, refreshToken };
    }


    async refreshToken(refreshToken: string) {
  try {
      const payload = this.jwtService.verify(refreshToken);
      return this.generateTokens(payload.userId);
  } catch (error) {
      throw new UnauthorizedException('Yaroqsiz token');
  }
}

}

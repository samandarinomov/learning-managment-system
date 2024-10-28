import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { Request } from 'express';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async create(
    @Body() createAuthDto: CreateAuthDto,
    @Res() res: Response,
  ) {
    let { newUser, refresh_token, access_token } = await this.authService.register(createAuthDto);
    res.cookie('refresh_token', refresh_token, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      sameSite: 'none',
      httpOnly: true,
    });
    return res.send({ newUser, access_token });
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    let { user, refresh_token, access_token } = await this.authService.login(loginDto);
    res.cookie('refresh_token', refresh_token, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      sameSite: 'none',
      httpOnly: true,
    });
    return res.send({ user, access_token });
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    res.clearCookie('refresh_token', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    return res.send({ message: 'Logged out successfully' });
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getMyData(@Req() req: Request) {
    return this.authService.getMyData(req['payload']);
  }

  @UseGuards(AuthGuard)
  @Post('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const refresh_token = req.cookies.refresh_token;
    if (!refresh_token) {
      throw new UnauthorizedException('Refresh token not found');
    }
    let payload = {
      id: req['payload'].id,
      email: req['payload'].email,
      isAdmin: req['payload'].is_admin,
    };
    let newAccessToken = await this.authService.jwtService.sign(payload);
    res.send({ newAccessToken });
  }
}

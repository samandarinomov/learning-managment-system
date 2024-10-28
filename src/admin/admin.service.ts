import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private jwtService: JwtService,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    let { fullname, phone, email, password } = createAdminDto;
    const checkAdmin = await this.adminRepository.findOneBy({ email });
    if (checkAdmin) return 'Admin with this login already exists';
    let hashedPass = await hash(password, 12);
    let newAdmin = await this.adminRepository.create({
      fullname,
      phone,
      email,
      password: hashedPass
    });
    await this.adminRepository.save(newAdmin);
    let payload = {
      id: newAdmin.id,
      login: newAdmin.email,
      isAdmin: newAdmin.is_admin,
    };
    let refresh_token = await this.jwtService.sign(payload);
    let access_token = await this.jwtService.sign(payload);
    let data = { newAdmin, refresh_token, access_token };
    return data;
  }

  async getMyData(payload: any) {
    const admin = await this.adminRepository.findOneBy({ id: payload.id });
    return admin;
  }
}

import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { Repository } from 'typeorm';
import { Assignment } from 'src/assignments/entities/assignment.entity';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Result)
    private resultRepository: Repository<Result>,
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) { }

  async create(accessToken: string, { AssignmentAnswer, assignmentId }: CreateResultDto) {
    try {
      const payload = this.jwtService.verify(accessToken);
      const user = await this.userRepository.findOne({ where: { id: payload.id } });
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      const assignment = await this.assignmentRepository.findOneBy({ id: assignmentId })
      if (!assignment)
        throw new HttpException('Assignment not found', HttpStatus.NOT_FOUND);
      const result = await this.resultRepository.create({ AssignmentAnswer, assignment, user });
      await this.resultRepository.save(result);
      return result
    } catch (error) {
      throw new UnauthorizedException('Invalid access token');
    }
  }

  async findAll(): Promise<Result[]> {
    const result = await this.resultRepository.find({ relations: ['assignment', 'user'] })
    return result
  }

  async update(id: number, {teacherFeedBack, score}: UpdateResultDto) {
    const result = await this.resultRepository.findOneBy({ id })
    if (!result)
      throw new HttpException('Result not found', HttpStatus.NOT_FOUND);
    await this.resultRepository.update({ id }, { teacherFeedBack, score });
    return `Succesfully updated result`
  }

  async remove(id: number): Promise<string> {
    let result = await this.resultRepository.findOneBy({ id })
    if (!result) {
      throw new HttpException('Result not found', HttpStatus.NOT_FOUND);
    }
    await this.resultRepository.delete(id);
    return "Deleted"
  }
}

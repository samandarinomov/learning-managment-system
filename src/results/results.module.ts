import { Module } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { Result } from './entities/result.entity';
import { Assignment } from 'src/assignments/entities/assignment.entity';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'verySecret'
    }),
    TypeOrmModule.forFeature([Result, Assignment, User])],
  controllers: [ResultsController],
  providers: [ResultsService],
})
export class ResultsModule {}

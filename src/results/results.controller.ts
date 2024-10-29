import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from '@nestjs/common';
import { ResultsService } from './results.service';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { Result } from './entities/result.entity';
import { RoleGuard } from 'src/auth/role.guard';
import { Auth } from 'src/auth/entities/auth.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('result')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Headers('authorization') authorizationHeader: string, @Body() createResultDto: CreateResultDto): Promise<Result> {
    const tokens = authorizationHeader.split(' ');
    const access_token = tokens[1]
    return this.resultsService.create(access_token, createResultDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(): Promise<Result[]> {
    return this.resultsService.findAll();
  }

  @Patch(':id')
  @UseGuards( AuthGuard, RoleGuard)
  update(@Param('id') id: number, @Body() updateResultDto: UpdateResultDto): Promise<string> {
    return this.resultsService.update(id, updateResultDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RoleGuard)
  remove(@Param('id') id: number): Promise<string> {
    return this.resultsService.remove(id);
  }
}

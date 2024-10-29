import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Assignment } from './entities/assignment.entity';

@Controller('assignment')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) { }

  @UseGuards(AuthGuard, RoleGuard)
  @Post()
  create(@Body() createAssignmentDto: CreateAssignmentDto): Promise<Assignment> {
    return this.assignmentsService.create(createAssignmentDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(): Promise<Assignment[]> {
    return this.assignmentsService.findAll();
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RoleGuard)
  update(@Param('id') id: number, @Body() updateAssignmentDto: UpdateAssignmentDto): Promise<string> {
    return this.assignmentsService.update(id, updateAssignmentDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard,  RoleGuard)
  remove(@Param('id') id: number): Promise<string> {
    return this.assignmentsService.remove(id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Modules } from './entities/module.entity';

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Post()
  create(@Body() createModuleDto: CreateModuleDto): Promise<Modules> {
    return this.modulesService.create(createModuleDto);
  }
  
  @Get()
  @UseGuards(AuthGuard)
  findAll(): Promise<Modules[]> {
    return this.modulesService.findAll();
  }
  
  @UseGuards(AuthGuard, RoleGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateModuleDto: UpdateModuleDto): Promise<string> {
    return this.modulesService.update(id, updateModuleDto);
  }
  
  @UseGuards(AuthGuard, RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: number): Promise<string> {
    return this.modulesService.remove(id);
  }
}

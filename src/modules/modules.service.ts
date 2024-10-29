import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Modules } from './entities/module.entity';
import { Repository } from 'typeorm';
import { Course } from 'src/courses/entities/course.entity';

@Injectable()
export class ModulesService {
  constructor(
    @InjectRepository(Modules)
    private modulesRepository: Repository<Modules>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) { }

  async create({ name, courseId }: CreateModuleDto): Promise<Modules> {
    const course = await this.courseRepository.findOneBy({ id: courseId })
    if (!course)
      throw new HttpException('Modules not found', HttpStatus.NOT_FOUND);
    const modules = await this.modulesRepository.create({ name, course });
    await this.modulesRepository.save(modules);
    return modules
  }

  async findAll(): Promise<Modules[]> {
    const modules = await this.modulesRepository.find({ relations: ['course'] })
    return modules
  }

  async update(id: number, { name, courseId }: UpdateModuleDto): Promise<string> {
    const course = await this.courseRepository.findOneBy({ id: courseId })
    if (!course)
      throw new HttpException('Course not found', HttpStatus.NOT_FOUND);
    let modules = await this.modulesRepository.findOneBy({ id })
    if (!modules) {
      throw new HttpException('Modules not found', HttpStatus.NOT_FOUND);
    }
    await this.modulesRepository.update({ id }, { name, course });
    return `Succesfully updated`
  }

  async remove(id: number): Promise<string> {
    let modules = await this.modulesRepository.findOneBy({ id })
    if (!modules) {
      throw new HttpException('Modules not found', HttpStatus.NOT_FOUND);
    }
    await this.modulesRepository.delete(id);
    return "Succesfully deleted"
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';
import { Modules } from 'src/modules/entities/module.entity';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
    @InjectRepository(Modules)
    private modulesRepository: Repository<Modules>,
  ) { }

  async create({ name, content, modulesId }: CreateLessonDto): Promise<Lesson> {
    const modules = await this.modulesRepository.findOneBy({ id: modulesId })
    if (!modules)
      throw new HttpException('Modules not found', HttpStatus.NOT_FOUND);
    const lesson = await this.lessonRepository.create({name, content, modules});
    await this.lessonRepository.save(lesson);
    return lesson
  }

  async findAll(): Promise<Lesson[]> {
    const lesson = await this.lessonRepository.find({ relations: ['modules'] })
    return lesson
  }

  async update(id: number, { name, content, modulesId }: UpdateLessonDto): Promise<string> {
    const modules = await this.modulesRepository.findOneBy({ id: modulesId })
    if (!modules)
      throw new HttpException('Modules not found', HttpStatus.NOT_FOUND);
    let lesson = await this.lessonRepository.findOneBy({ id })
    if (!lesson) {
      throw new HttpException('Lesson not found', HttpStatus.NOT_FOUND);
    }
    await this.lessonRepository.update({ id }, { name, content, modules });
    return `Lesson Successfully updated`
  }
    async remove(id: number): Promise<string> {
    let lesson = await this.lessonRepository.findOneBy({ id })
    if (!lesson) {
      throw new HttpException('Lesson not found', HttpStatus.NOT_FOUND);
    }
    await this.lessonRepository.delete(id);
    return "Succesfully deleted"
  }
}

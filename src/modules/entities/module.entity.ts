import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, } from "typeorm";
import { Course } from "src/courses/entities/course.entity";
import { Lesson } from "src/lessons/entities/lesson.entity";

@Entity()
export class Modules {
    @PrimaryGeneratedColumn()
    id:Number

    @Column({type: 'varchar'})
    name: String

    @ManyToOne(() => Course, (course) => course.modules)
    course: Course;

    @OneToMany(() => Lesson, (lesson) => lesson.module)
    lessons: Lesson[]
}

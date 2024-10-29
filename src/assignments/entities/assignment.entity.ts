import { Lesson } from "src/lessons/entities/lesson.entity";
import { Modules } from "src/modules/entities/module.entity";
import { Result } from "src/results/entities/result.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";

@Entity()
export class Assignment {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar'})
    task: string

    @Column({type: 'varchar'})
    description: string

    @Column({type: 'varchar'})
    deadline: string

    @OneToOne( () => Lesson, lesson => lesson.assignment)
    @JoinColumn({ name: 'lessonId' })
    lesson: Lesson;

    @OneToOne(() => Result, result => result.assignment)
    result: Result;
}

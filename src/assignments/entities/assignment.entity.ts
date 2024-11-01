import { Lesson } from "src/lessons/entities/lesson.entity";
import { Result } from "src/results/entities/result.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";

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

    @ManyToOne(() => Result, result => result.assignment)
    results: Result[];
}
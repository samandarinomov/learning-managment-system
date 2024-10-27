import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, } from "typeorm";
import { Course } from "src/courses/entities/course.entity";

@Entity()
export class Modules {
    @PrimaryGeneratedColumn()
    id:Number

    @Column({type: 'varchar'})
    name: String

    @ManyToOne(() => Course, (course) => course.modules)
    course: Course;
}

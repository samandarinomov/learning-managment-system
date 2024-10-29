import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Assignment } from "src/assignments/entities/assignment.entity";

@Entity()
export class Result {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'int'})
    score: number

    @OneToOne(() => Assignment, assignment => assignment.result)
    assignment: Assignment;
}

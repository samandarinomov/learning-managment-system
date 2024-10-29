import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Assignment } from "src/assignments/entities/assignment.entity";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Result {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar'})
    AssignmentAnswer: string

    @Column({type: 'varchar', default: "Kutilmoqda"})
    teacherFeedBack: string

    @Column({type: 'int', default: 0})
    score: number

    @OneToOne(() => Assignment, assignment => assignment.result)
    @JoinColumn()
    assignment: Assignment;

    @ManyToOne(() => User, user => user.result)
    @JoinColumn()
    user: User;
}

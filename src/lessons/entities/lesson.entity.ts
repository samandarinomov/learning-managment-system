import { Modules } from "src/modules/entities/module.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Lesson {
    @PrimaryGeneratedColumn()
    id: Number

    @Column({type: 'varchar'})
    name: String

    @Column({type: 'varchar'})
    content: String

    @ManyToOne(() => Modules, (module) => module.lessons)
    module: Modules
}

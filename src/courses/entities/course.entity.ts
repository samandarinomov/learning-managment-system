import { Modules } from "src/modules/entities/module.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: Number

    @Column({type: 'varchar'})
    name: String

    @Column({type: 'varchar'})
    description: String

    @Column({type: 'float'})
    price: Number

    @Column({type: 'varchar'})
    teacher: String

    @Column({type: 'varchar'})
    category: String

    @Column({type: 'int'})
    level: Number

    @OneToMany(() => Modules, (module) => module.course)
    modules: Modules[]
}

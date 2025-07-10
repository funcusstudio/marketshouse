import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserHouseProject } from '../user-house-projects/entities/user-house-project.entity';
import { Report } from '../report/entities/report.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({
    type: 'enum',
    enum: ['client', 'executor'],
    nullable: false
  })
  userType!: 'client' | 'executor';

  @Column({ default: false })
  isAdmin!: boolean;

  @Column({ nullable: true })
  phoneNumber!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ default: true })
  isActive!: boolean;

  @OneToMany(() => UserHouseProject, userProject => userProject.user)
  houseProjects!: UserHouseProject[];

  @OneToMany(() => Report, (report) => report.author)
  reports!: Report[] | undefined; // Связь с отчетами

  // Обратная связь для проектов, где пользователь — исполнитель
  @OneToMany(() => UserHouseProject, (userProject) => userProject.executor)
  executedProjects!: UserHouseProject[];
}
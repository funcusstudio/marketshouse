import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { UserHouseProject } from '../../user-house-projects/entities/user-house-project.entity';
import { User } from '../../user/user.entity';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  description!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.reports)
  author!: User; // Изменили с executor на author

  @ManyToOne(() => UserHouseProject, (project) => project.reports)
  project!: UserHouseProject;
}
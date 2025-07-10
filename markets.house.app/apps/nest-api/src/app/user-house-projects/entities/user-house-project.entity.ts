import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../user/user.entity';
import { HouseProject } from '../../house-projects/entities/house-project.entity';
import { Report } from '../../report/entities/report.entity';

@Entity('user_house_projects')
export class UserHouseProject {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.houseProjects)
  user!: User;

  @Column()
  userId!: number;

  @ManyToOne(() => HouseProject, (project) => project.userProjects)
  houseProject!: HouseProject;

  @Column()
  houseProjectId!: number;

  @ManyToOne(() => User, { nullable: true }) // Связь с исполнителем
  executor!: User | null;

  @Column({ type: 'integer', nullable: true })
  executorId!: number | null;

  @Column({ default: false })
  isConfirmed!: boolean;

  @Column({ type: 'text', nullable: true })
  notes!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Report, (report) => report.project)
  reports: Report[] | undefined;
}
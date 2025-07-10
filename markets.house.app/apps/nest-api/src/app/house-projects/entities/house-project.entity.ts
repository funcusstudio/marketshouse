import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { UserHouseProject } from '../../user-house-projects/entities/user-house-project.entity';

@Entity('house_projects')
export class HouseProject {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, nullable: true })
  externalId!: string;

  @Column()
  name!: string;

  @Column('text')
  description!: string;

  @Column('text')
  shortDescription!: string;

  @Column()
  permalink!: string;

  @Column({ type: 'timestamp' })
  dateCreated!: Date;

  @Column({ type: 'timestamp' })
  dateModified!: Date;

  @Column('decimal', { precision: 12, scale: 2 })
  price!: number;

  @Column('decimal', { precision: 12, scale: 2, nullable: true })
  salePrice!: number;

  @Column({ default: false })
  onSale!: boolean;

  @Column({ type: 'simple-json', nullable: true })
  dimensions!: {
    length: string;
    width: string;
    height: string;
  };

  @Column({ type: 'simple-json' })
  categories!: {
    id: number;
    name: string;
    slug: string;
  }[];

  @Column({ type: 'simple-json' })
  images!: {
    id: number;
    src: string;
    name: string;
    alt: string;
  }[];

  @Column({ type: 'simple-json' })
  attributes!: {
    id: number;
    name: string;
    options: string[];
  }[];

  @Column({ default: true })
  isActive!: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  syncedAt!: Date;

  @OneToMany(() => UserHouseProject, userProject => userProject.houseProject)
  userProjects!: UserHouseProject[];
} 
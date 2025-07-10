import { IsNumber, IsString, IsOptional } from 'class-validator';

export class SelectProjectDto {
  @IsNumber()
  houseProjectId!: number;

  @IsString()
  @IsOptional()
  notes?: string;
} 
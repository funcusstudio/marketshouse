import { IsString, IsInt, Min, IsDateString } from 'class-validator';

export class CreateReportDto {
  @IsString()
  description!: string;


  @IsDateString()
  date?: string; // Опциональная дата, по умолчанию текущая

  @IsInt()
  @Min(1)
  projectId!: number; // ID проекта для привязки
}
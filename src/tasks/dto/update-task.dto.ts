import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TaskStatus } from '../enums/task-status.enum';

export class UpdateTaskDto {
  @ApiPropertyOptional({
    description: 'Title of the task',
    example: 'Updated task title'
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'Description of the task',
    example: 'Updated task description'
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Status of the task',
    enum: TaskStatus,
    example: TaskStatus.IN_PROGRESS
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}

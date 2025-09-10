import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TaskStatus } from '../enums/task-status.enum';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Title of the task',
    example: 'Complete project documentation'
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Detailed description of the task',
    example: 'Write comprehensive documentation for the API endpoints'
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({
    description: 'Initial status of the task',
    enum: TaskStatus,
    example: TaskStatus.TODO
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}

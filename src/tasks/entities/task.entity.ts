import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { TaskStatus } from '../enums/task-status.enum';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Task {
  @ApiProperty({
    description: 'Unique identifier for the task',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Title of the task',
    example: 'Complete project documentation'
  })
  @Column()
  title: string;

  @ApiProperty({
    description: 'Detailed description of the task',
    example: 'Write comprehensive documentation for the API endpoints'
  })
  @Column()
  description: string;

  @ApiProperty({
    description: 'Current status of the task',
    enum: TaskStatus,
    example: TaskStatus.TODO
  })
  @Column({
    type: 'simple-enum',
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  status: TaskStatus;

  @ApiProperty({
    description: 'Date and time when the task was created',
    example: '2023-12-07T10:00:00.000Z'
  })
  @CreateDateColumn()
  createdAt: Date;
}

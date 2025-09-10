import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({
    status: 201,
    description: 'Task created successfully',
    type: Task,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({
    status: 200,
    description: 'List of all tasks',
    type: [Task],
  })
  async findAll(): Promise<Task[]> {
    return await this.tasksService.findAll();
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Get task statistics' })
  @ApiResponse({
    status: 200,
    description: 'Task statistics',
    schema: {
      type: 'object',
      properties: {
        total: { type: 'number', example: 10 },
        todo: { type: 'number', example: 3 },
        inProgress: { type: 'number', example: 4 },
        done: { type: 'number', example: 3 },
      },
    },
  })
  async getStatistics() {
    return await this.tasksService.getStatistics();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiParam({ name: 'id', description: 'Task UUID' })
  @ApiResponse({
    status: 200,
    description: 'Task found',
    type: Task,
  })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Task> {
    return await this.tasksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiParam({ name: 'id', description: 'Task UUID' })
  @ApiBody({ type: UpdateTaskDto })
  @ApiResponse({
    status: 200,
    description: 'Task updated successfully',
    type: Task,
  })
  @ApiResponse({ status: 404, description: 'Task not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return await this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a task' })
  @ApiParam({ name: 'id', description: 'Task UUID' })
  @ApiResponse({ status: 204, description: 'Task deleted successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.tasksService.remove(id);
  }
}

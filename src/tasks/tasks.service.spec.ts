import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { TaskStatus } from './enums/task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

describe('TasksService', () => {
  let service: TasksService;
  let repository: Repository<Task>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
    count: jest.fn(),
  };

  const mockTask: Task = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    title: 'Test Task',
    description: 'Test Description',
    status: TaskStatus.TODO,
    createdAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new task', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
      };

      mockRepository.create.mockReturnValue(mockTask);
      mockRepository.save.mockResolvedValue(mockTask);

      const result = await service.create(createTaskDto);

      expect(mockRepository.create).toHaveBeenCalledWith({
        ...createTaskDto,
        status: TaskStatus.TODO,
      });
      expect(mockRepository.save).toHaveBeenCalledWith(mockTask);
      expect(result).toEqual(mockTask);
    });

    it('should create a task with specified status', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
        status: TaskStatus.IN_PROGRESS,
      };

      const taskWithStatus = { ...mockTask, status: TaskStatus.IN_PROGRESS };
      mockRepository.create.mockReturnValue(taskWithStatus);
      mockRepository.save.mockResolvedValue(taskWithStatus);

      const result = await service.create(createTaskDto);

      expect(mockRepository.create).toHaveBeenCalledWith(createTaskDto);
      expect(result.status).toBe(TaskStatus.IN_PROGRESS);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const tasks = [mockTask];
      mockRepository.find.mockResolvedValue(tasks);

      const result = await service.findAll();

      expect(mockRepository.find).toHaveBeenCalledWith({
        order: { createdAt: 'DESC' },
      });
      expect(result).toEqual(tasks);
    });
  });

  describe('findOne', () => {
    it('should return a task when found', async () => {
      mockRepository.findOne.mockResolvedValue(mockTask);

      const result = await service.findOne(mockTask.id);

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: mockTask.id },
      });
      expect(result).toEqual(mockTask);
    });

    it('should throw NotFoundException when task not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update and return the task', async () => {
      const updateTaskDto: UpdateTaskDto = {
        title: 'Updated Title',
        status: TaskStatus.DONE,
      };

      const updatedTask = { ...mockTask, ...updateTaskDto };

      mockRepository.findOne.mockResolvedValue(mockTask);
      mockRepository.save.mockResolvedValue(updatedTask);

      const result = await service.update(mockTask.id, updateTaskDto);

      expect(mockRepository.save).toHaveBeenCalled();
      expect(result.title).toBe(updateTaskDto.title);
      expect(result.status).toBe(updateTaskDto.status);
    });

    it('should throw NotFoundException when task not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(
        service.update('non-existent-id', { title: 'New Title' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove the task', async () => {
      mockRepository.findOne.mockResolvedValue(mockTask);
      mockRepository.remove.mockResolvedValue(mockTask);

      await service.remove(mockTask.id);

      expect(mockRepository.remove).toHaveBeenCalledWith(mockTask);
    });

    it('should throw NotFoundException when task not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.remove('non-existent-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getStatistics', () => {
    it('should return task statistics', async () => {
      mockRepository.count
        .mockResolvedValueOnce(10) // total
        .mockResolvedValueOnce(3) // todo
        .mockResolvedValueOnce(4) // inProgress
        .mockResolvedValueOnce(3); // done

      const result = await service.getStatistics();

      expect(result).toEqual({
        total: 10,
        todo: 3,
        inProgress: 4,
        done: 3,
      });
    });
  });
});

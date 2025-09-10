import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { TaskStatus } from './enums/task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  const mockTask: Task = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    title: 'Test Task',
    description: 'Test Description',
    status: TaskStatus.TODO,
    createdAt: new Date(),
  };

  const mockTasksService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    getStatistics: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new task', async () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
      };

      mockTasksService.create.mockResolvedValue(mockTask);

      const result = await controller.create(createTaskDto);

      expect(service.create).toHaveBeenCalledWith(createTaskDto);
      expect(result).toEqual(mockTask);
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      const tasks = [mockTask];
      mockTasksService.findAll.mockResolvedValue(tasks);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(tasks);
    });
  });

  describe('findOne', () => {
    it('should return a single task', async () => {
      mockTasksService.findOne.mockResolvedValue(mockTask);

      const result = await controller.findOne(mockTask.id);

      expect(service.findOne).toHaveBeenCalledWith(mockTask.id);
      expect(result).toEqual(mockTask);
    });
  });

  describe('update', () => {
    it('should update and return the task', async () => {
      const updateTaskDto: UpdateTaskDto = {
        title: 'Updated Title',
        status: TaskStatus.DONE,
      };

      const updatedTask = { ...mockTask, ...updateTaskDto };
      mockTasksService.update.mockResolvedValue(updatedTask);

      const result = await controller.update(mockTask.id, updateTaskDto);

      expect(service.update).toHaveBeenCalledWith(mockTask.id, updateTaskDto);
      expect(result).toEqual(updatedTask);
    });
  });

  describe('remove', () => {
    it('should remove the task', async () => {
      mockTasksService.remove.mockResolvedValue(undefined);

      await controller.remove(mockTask.id);

      expect(service.remove).toHaveBeenCalledWith(mockTask.id);
    });
  });

  describe('getStatistics', () => {
    it('should return task statistics', async () => {
      const mockStats = {
        total: 10,
        todo: 3,
        inProgress: 4,
        done: 3,
      };

      mockTasksService.getStatistics.mockResolvedValue(mockStats);

      const result = await controller.getStatistics();

      expect(service.getStatistics).toHaveBeenCalled();
      expect(result).toEqual(mockStats);
    });
  });
});

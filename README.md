# Task Management API

Một API RESTful để quản lý công việc (tasks) được xây dựng bằng NestJS, TypeScript và TypeORM.

## Tính năng

- ✅ CRUD operations đầy đủ cho Task
- ✅ Validation đầu vào với class-validator
- ✅ Tài liệu API tự động với Swagger
- ✅ Unit tests với Jest
- ✅ TypeORM với SQLite database
- ✅ Kiến trúc MVC rõ ràng
- ✅ Tối ưu performance cho queries

## Kiến trúc NestJS

### Modules
- **AppModule**: Module gốc của ứng dụng, cấu hình database và import các module con
- **TasksModule**: Module quản lý tất cả chức năng liên quan đến Task

### Controllers
- **TasksController**: Xử lý các HTTP requests và định nghĩa API endpoints
- Sử dụng decorators như `@Get()`, `@Post()`, `@Patch()`, `@Delete()`
- Tích hợp Swagger documentation với các decorator như `@ApiOperation()`, `@ApiResponse()`

### Services
- **TasksService**: Chứa business logic và tương tác với database
- Inject Repository pattern từ TypeORM
- Xử lý các operations: Create, Read, Update, Delete, Statistics

### Models/Entities
- **Task Entity**: Định nghĩa schema cho Task với TypeORM decorators
- **TaskStatus Enum**: Định nghĩa các trạng thái có thể của Task
- **DTOs**: Data Transfer Objects cho validation và API documentation

## TypeScript trong NestJS

NestJS sử dụng TypeScript để:
- **Decorators**: Metadata và dependency injection (`@Injectable()`, `@Controller()`, `@Entity()`)
- **Type Safety**: Strongly typed DTOs, entities và service methods
- **Interfaces**: Định nghĩa contracts rõ ràng
- **Generics**: Type-safe repositories và responses
- **Async/Await**: Xử lý bất đồng bộ một cách clean

## Yêu cầu hệ thống

- Node.js >= 16
- npm >= 7

## Cài đặt

```bash
# Clone repository
git clone <repository-url>
cd API_2

# Cài đặt dependencies
npm install
```

## Chạy ứng dụng

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod

# Debug mode
npm run start:debug
```

Ứng dụng sẽ chạy tại: `http://localhost:3000`

## Truy cập Swagger Documentation

Sau khi ứng dụng đã chạy, truy cập:
```
http://localhost:3000/docs
```

Tại đây bạn có thể:
- Xem tất cả API endpoints
- Test các API calls trực tiếp
- Xem request/response schemas
- Tải xuống OpenAPI specification

## API Endpoints

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/tasks` | Tạo task mới |
| GET | `/tasks` | Lấy danh sách tất cả tasks |
| GET | `/tasks/:id` | Lấy task theo ID |
| PATCH | `/tasks/:id` | Cập nhật task |
| DELETE | `/tasks/:id` | Xóa task |
| GET | `/tasks/statistics` | Lấy thống kê tasks |

### Task Schema

```typescript
{
  id: string (UUID)
  title: string
  description: string
  status: "To Do" | "In Progress" | "Done"
  createdAt: Date
}
```

### Example Requests

#### Tạo Task mới
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete documentation",
    "description": "Write comprehensive API documentation",
    "status": "To Do"
  }'
```

#### Lấy tất cả Tasks
```bash
curl http://localhost:3000/tasks
```

#### Cập nhật Task
```bash
curl -X PATCH http://localhost:3000/tasks/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "Done"
  }'
```

## Testing

### Chạy Unit Tests
```bash
# Chạy tất cả tests
npm test

# Chạy tests với coverage
npm run test:cov

# Chạy tests ở watch mode
npm run test:watch
```

### Chạy E2E Tests
```bash
npm run test:e2e
```

## Database

Ứng dụng sử dụng SQLite database với file `database.sqlite` sẽ được tạo tự động khi chạy ứng dụng lần đầu.

### Database Schema
- **tasks** table với các columns: id, title, description, status, createdAt

## Validation

API sử dụng class-validator để validate input:
- `title`: Bắt buộc, phải là string không rỗng
- `description`: Bắt buộc, phải là string không rỗng  
- `status`: Optional, phải là một trong các enum values

## Performance Optimization

- Database queries được tối ưu với proper indexing
- GET requests với 100 records phản hồi dưới 200ms
- Sử dụng connection pooling
- Proper error handling và logging

## Cấu trúc thư mục

```
src/
├── main.ts                 # Entry point
├── app.module.ts          # Root module
└── tasks/
    ├── dto/               # Data Transfer Objects
    │   ├── create-task.dto.ts
    │   └── update-task.dto.ts
    ├── entities/          # Database entities
    │   └── task.entity.ts
    ├── enums/            # Enums
    │   └── task-status.enum.ts
    ├── tasks.controller.ts    # HTTP Controller
    ├── tasks.service.ts       # Business logic
    ├── tasks.module.ts        # Tasks module
    ├── tasks.controller.spec.ts  # Controller tests
    └── tasks.service.spec.ts     # Service tests
```

## Scripts có sẵn

```bash
npm run build          # Build production
npm run format         # Format code with Prettier
npm run lint           # Lint code with ESLint
npm run start          # Start production server
npm run start:dev      # Start development server
npm run start:debug    # Start debug server
npm run test           # Run unit tests
npm run test:watch     # Run tests in watch mode
npm run test:cov       # Run tests with coverage
npm run test:e2e       # Run e2e tests
```


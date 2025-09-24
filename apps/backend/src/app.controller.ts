import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('api/health')
  getHealth() {
    return {
      status: 'ok',
      message: 'Backend is running!',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('api/users')
  getUsers() {
    return {
      data: [
        { id: '1', name: 'John Doe', email: 'john@example.com' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
      ],
      message: 'Users retrieved successfully',
      success: true,
    };
  }
}

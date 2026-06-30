import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminGuard } from 'src/authGuards/admin.guard';

@Controller('api/admin')
export class AdminAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: any) {
    try {
      const response = await this.authService.login(body);
      return {
        status: true,
        message: 'Login successful',
        token: response?.token ?? null,
        data: response?.data ?? response,
      };
    } catch (error: any) {
      return {
        status: false,
        message: error.message,
      };
    }
  }

  @Get('profile')
  @UseGuards(AdminGuard)
  async profile(@Req() request: any) {
    try {
      const response = await this.authService.profile({ userId: request.user.userId });
      return {
        status: true,
        message: 'Profile fetched successfully',
        data: response,
      };
    } catch (error: any) {
      return {
        status: false,
        message: error.message,
      };
    }
  }
}

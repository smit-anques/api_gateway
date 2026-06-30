import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserGuard } from 'src/authGuards/user.guard';

@Controller('api/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('signup')
    signup(@Body() body: any) 
    { return this.authService.signup(body)}

    @Post('login') 
    async login(@Body() body: any) { 
        try {
            const response = await this.authService.login(body);
            const data = response?.data ?? response;

            return {
                status: true,
                message: 'Login successful',
                token: response?.token ?? data?.token ?? null,
                data: {
                    id: data?.id ?? null,
                    first_name: data?.first_name ?? data?.firstName ?? null,
                    last_name: data?.last_name ?? data?.lastName ?? null,
                    role_id: data?.role_id ?? data?.roleId ?? null,
                    email: data?.email ?? null,
                    phone: data?.phone ?? null,
                    dial_code: data?.dial_code != null ? String(data.dial_code) : data?.dialCode != null ? String(data.dialCode) : '',
                    image: data?.image ?? null,
                    is_active: data?.is_active ?? data?.isActive ?? null,
                    createdAt: data?.createdAt ? String(data.createdAt) : null,
                    updatedAt: data?.updatedAt ? String(data.updatedAt) : null,
                },
            };
        } catch (error:any) {
            return {
                status: false,
                message: error.message,
            };
        }
    }

    @Get('profile') 
    @UseGuards(UserGuard) 
    profile(@Req() req: any) 
    { return this.authService.profile({ userId: req.user.userId}) }

    
}

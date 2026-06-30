import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AdminAuthController } from './admin.controller';
import { AuthService } from './auth.service';
import { AuthGuardsModule } from 'src/authGuards/auth.module';
import { AuthGrpcClient } from './grpc/auth.grpc.client';

@Module({
  imports: [ AuthGuardsModule],
  controllers: [AuthController, AdminAuthController],
  providers: [AuthService,AuthGrpcClient]
})
export class AuthModule {}

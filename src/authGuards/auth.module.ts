import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthGrpcClient } from '../grpc/auth.client';
import { ProductGrpcClient } from '../grpc/product.client';

import { JwtTokenService } from './jwt.service';
import { AdminGuard } from './admin.guard';
import { UserGuard } from './user.guard';
import { StringValue } from 'ms';

@Module({
    imports: [
        ConfigModule,

        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: configService.get<StringValue>('JWT_EXPIRES_IN'),
                },
            }),
        }),

        ClientsModule.register([
            {
                name: 'AUTH_PACKAGE',
                ...AuthGrpcClient,
            },
            {
                name: 'PRODUCT_PACKAGE',
                ...ProductGrpcClient,
            },
        ]),
    ],

    providers: [
        JwtTokenService,
        AdminGuard,
        UserGuard,
    ],

    exports: [
        JwtModule,
        ClientsModule,

        JwtTokenService,
        AdminGuard,
        UserGuard,
    ],
})
export class AuthGuardsModule { }
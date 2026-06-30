import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { AuthGrpcClient } from './grpc/auth.grpc.client';

@Injectable()
export class AuthService {
    constructor(
        private readonly authGrpc: AuthGrpcClient,
    ) { }
    async signup(body: any) { return await firstValueFrom(this.authGrpc.signup(body),); }

    async login(body: any) { return await firstValueFrom(this.authGrpc.login(body),); }

    async profile(body: any) {
        return await firstValueFrom(this.authGrpc.profile(body));
    }
}

import { Injectable, OnModuleInit, Inject, } from '@nestjs/common'; 
import * as microservices from '@nestjs/microservices'; 
import { Observable } from 'rxjs'; 
interface AuthGrpcService { 
    signup(data: any): Observable<any>; 
    login(data: any): Observable<any>; 
    profile(data: any): Observable<any>; 
} 
@Injectable() 
export class AuthGrpcClient implements OnModuleInit { 
    private authService!: AuthGrpcService; 
    constructor(@Inject('AUTH_PACKAGE') 
    private readonly client: microservices.ClientGrpc,) 
    { } 
    
    onModuleInit() { 
        this.authService = this.client.getService<AuthGrpcService>('AuthService'); 
    } 

    
    signup(data: any) { return this.authService.signup(data); } 
    login(data: any) { return this.authService.login(data); } 
    profile(data: any) { return this.authService.profile(data); } }
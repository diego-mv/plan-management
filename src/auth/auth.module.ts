import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/modules/users/users.module';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions:  { expiresIn: '60m' },
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthGuard]
})
export class AuthModule { }

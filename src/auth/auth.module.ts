import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/modules/users/users.module';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { UsersService } from 'src/modules/users/services/users.service';
import { UsersRepository } from 'src/modules/users/repositories/users.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/modules/users/schemas/user.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }]),
        UsersModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60m' },
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthGuard, UsersRepository]
})
export class AuthModule { }

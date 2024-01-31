import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserDto } from "src/modules/users/dto/user.dto";
import { UsersService } from "src/modules/users/services/users.service";
import { LoggedDto } from "../dto/logged.dto";
import { IAuthService } from "./auth.service.interface";
import { createUserDto } from "src/modules/users/dto/createUser.dto";

@Injectable()
export class AuthService implements IAuthService {

    constructor(
        private jwtService: JwtService,
        private userService: UsersService
    ) { }

    async login(user: string, password: string): Promise<LoggedDto | null> {
        try {
            const findUser: UserDto | null = await this.userService.login(user, password);

            if (!findUser || findUser === null) {
                return null;
            }
            const expiresIn = 36000;
            const payload = { sub: user, username: user };
            return {
                user: findUser,
                access_token: await this.jwtService.signAsync(payload, { expiresIn: expiresIn }),
                expiresIn: expiresIn
            };
        }
        catch (error) {
            console.error("Error on login " + user)
            throw new Error("Error on login " + user)
        }
    }

    async create(user: createUserDto): Promise<UserDto> {
        return await this.userService.create(user);
    }
}
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoggedDto } from "../dto/logged.dto";
import { IAuthService } from "./auth.service.interface";

@Injectable()
export class AuthService implements IAuthService {

    constructor(private jwtService: JwtService) { }

    async login(user: string, password: string): Promise<LoggedDto> {

        const payload = { sub: user, username: user };
        return {
            user: user,
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
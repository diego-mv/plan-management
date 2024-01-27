import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./services/auth.service";
import { ApiTags } from "@nestjs/swagger";

@Controller('auth')
@ApiTags('Authenticate')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() login: LoginDto) {
        return this.authService.login(login.user, login.password);
    }
}
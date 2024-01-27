import { Body, Controller, ForbiddenException, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./services/auth.service";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { createUserDto } from "src/modules/users/dto/createUserDto.dto";
import { UserDto } from "src/modules/users/dto/userDto.dto";

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Login with credentials' })
    @Post('login')
    async login(@Body() login: LoginDto) {
        const user = await this.authService.login(login.user, login.password);
        if (!user) {
            throw new ForbiddenException("Incorrect data")
        }

        return user;
    }

    @Post('register')
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 200, description: 'OK', isArray: true })
    @ApiResponse({ status: 403, description: 'Forbidden' })
    @ApiBody({ type: createUserDto, description: 'Data for creating a new user' })
    async register(@Body() user: createUserDto): Promise<UserDto> {
        return await this.authService.create(user);
    }
}
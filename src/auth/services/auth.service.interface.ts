import { createUserDto } from "src/modules/users/dto/createUserDto.dto";
import { LoggedDto } from "../dto/logged.dto";
import { UserDto } from "src/modules/users/dto/userDto.dto";

export interface IAuthService {
    login(user: string, password: string): Promise<LoggedDto | null>;
    create(user: createUserDto): Promise<UserDto>;
}
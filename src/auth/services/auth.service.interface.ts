import { LoggedDto } from "../dto/logged.dto";

export interface IAuthService {
    login(user: string, password: string): Promise<LoggedDto>;
}
import { UserDto } from "src/modules/users/dto/user.dto";

export class LoggedDto {
    public user: UserDto;
    public access_token: string;
    public expiresIn: number
}
import { createUserDto } from "../dto/createUserDto.dto";
import { updateUserDto } from "../dto/updateUser.dto";
import { UserDto } from "../dto/userDto.dto";

export interface IUsersService {
    login(user: string, password: string): Promise<UserDto | null>;
    getAll(): Promise<UserDto[]>;
    getById(id: number): Promise<UserDto | null>;
    create(user: createUserDto): Promise<UserDto>
    update(id: number, skill: updateUserDto): Promise<UserDto | null>
    delete(id: number): Promise<boolean>;
    addSkill(userId: number, skillId: number): Promise<UserDto>;
    deleteSkill(userId: number, skillId: number): Promise<UserDto>;
}
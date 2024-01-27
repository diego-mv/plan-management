import { UserDto } from "../dto/userDto.dto";

export interface IUsersService {
    getAll(): Promise<UserDto[]>;
    getById(id: number): Promise<UserDto | null>;
    create(user: UserDto): Promise<UserDto>
    update(id: number, skill: UserDto): Promise<UserDto | null>
    delete(id: number): Promise<boolean>;
    addSkill(userId: number, skillId: number): Promise<UserDto>;
    deleteSkill(userId: number, skillId: number): Promise<UserDto>;
}
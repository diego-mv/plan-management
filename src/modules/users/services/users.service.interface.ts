import { ResultPage } from "src/dto/resultPage.dto";
import { createUserDto } from "../dto/createUser.dto";
import { updateUserDto } from "../dto/updateUser.dto";
import { UserDto } from "../dto/user.dto";
import { userSkillsDto } from "../dto/userSkills.dto";

export interface IUsersService {
    login(user: string, password: string): Promise<UserDto | null>;
    searchUsers(userData: string, skillId: string, level: string): UserDto[] | PromiseLike<UserDto[]>;
    getUserWithSkills(id: number): Promise<UserDto | null>;
    getAll(page: number, size: number): Promise<ResultPage<UserDto>>;
    getById(id: number): Promise<UserDto | null>;
    create(user: createUserDto): Promise<UserDto>
    update(id: number, skill: updateUserDto): Promise<UserDto | null>
    delete(id: number): Promise<boolean>;
    addSkill(userSkill: userSkillsDto): Promise<boolean>;
    deleteSkill(userId: number, skillId: number): Promise<boolean>;
}
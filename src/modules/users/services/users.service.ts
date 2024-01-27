import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { HttpException, Injectable } from "@nestjs/common";
import { compare, hash } from 'bcrypt';
import { createUserDto } from "../dto/createUser.dto";
import { updateUserDto } from "../dto/updateUser.dto";
import { User } from "../schemas/user.entity";
import { UserDto } from "../dto/user.dto";
import { UsersRepository } from "../repositories/users.repository";
import { IUsersService } from "./users.service.interface";
import { userSkillsDto } from "../dto/userSkills.dto";

@Injectable()
export class UsersService implements IUsersService {

    constructor(
        private usersRepository: UsersRepository,
        @InjectMapper() private readonly autoMapper: Mapper
    ) { }

    async login(user: string, password: string): Promise<UserDto | null> {
        const findUser = await this.usersRepository.getByEmail(user);
        if (!findUser) {
            new HttpException('User not found', 404);
            return null;
        }

        const checkPass = await compare(password, findUser.password);

        if (!checkPass) {
            new HttpException('Incorrect password', 403);
            return null;
        }

        return findUser;
    }

    async getAll(): Promise<UserDto[]> {
        return await this.usersRepository.getAll();
    }

    async getById(id: number): Promise<UserDto> {
        return await this.usersRepository.getById(id);
    }

    async create(user: createUserDto): Promise<UserDto> {
        const passHash = await hash(user.password, 10);

        const newUser: User = {
            id: null,
            name: user.name,
            surname: user.surname,
            email: user.email,
            password: passHash
        };

        return await this.usersRepository.create(newUser);
    }

    async update(id: number, user: updateUserDto): Promise<UserDto> {
        const userEntity: User = {
            id: user.id,
            email: user.email,
            name: user.name,
            surname: user.surname,
            password: null
        };
        const userUpdated = await this.usersRepository.update(id, userEntity);

        const userDto: UserDto = {
            id: userUpdated.id,
            email: userUpdated.email,
            name: userUpdated.name,
            surname: userUpdated.surname
        }
        return userDto;
    }

    async delete(id: number): Promise<boolean> {
        return await this.usersRepository.delete(id);
    }

    async updateSkills(userSkills: userSkillsDto): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async addSkill(userId: number, skillId: number): Promise<UserDto> {
        throw new Error("Method not implemented.");
    }

    async deleteSkill(userId: number, skillId: number): Promise<UserDto> {
        throw new Error("Method not implemented.");
    }
}
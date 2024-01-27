import { Injectable } from "@nestjs/common";
import { IUsersService } from "./users.service.interface";
import { UserDto } from "../dto/userDto.dto";
import { Mapper } from "@automapper/core";
import { UsersRepository } from "../repositories/users.repository";
import { InjectMapper } from "@automapper/nestjs";
import { User } from "../dto/user.entity";

@Injectable()
export class UsersService implements IUsersService {

    constructor(
        private usersRepository: UsersRepository,
        @InjectMapper() private readonly autoMapper: Mapper
    ) { }

    async getAll(): Promise<UserDto[]> {
        return await this.usersRepository.getAll();
    }
    async getById(id: number): Promise<UserDto> {
        return await this.usersRepository.getById(id);
    }
    async create(user: UserDto): Promise<UserDto> {
        const newUser: User = new User(1)
        return await this.usersRepository.create(newUser);
    }
    async update(id: number, skill: UserDto): Promise<UserDto> {
        const newUser: User = new User(1)
        return await this.usersRepository.update(1, newUser);
    }
    async delete(id: number): Promise<boolean> {
        return await this.usersRepository.delete(id);
    }
    async addSkill(userId: number, skillId: number): Promise<UserDto> {
        throw new Error("Method not implemented.");
    }
    async deleteSkill(userId: number, skillId: number): Promise<UserDto> {
        throw new Error("Method not implemented.");
    }
}
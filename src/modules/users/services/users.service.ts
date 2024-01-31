import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { HttpException, Injectable } from "@nestjs/common";
import { compare, hash } from 'bcrypt';
import { SkillDto } from "src/modules/skills/dto/skill.dto";
import { SkillsService } from "src/modules/skills/services/skills.service";
import { createUserDto } from "../dto/createUser.dto";
import { LevelUserSkillDto } from "../dto/levelUserSkill.dto";
import { updateUserDto } from "../dto/updateUser.dto";
import { UserDto } from "../dto/user.dto";
import { userSkillsDto } from "../dto/userSkills.dto";
import { UsersRepository } from "../repositories/users.repository";
import { User } from "../schemas/user.entity";
import { UserSkill } from "../schemas/userSkill.entity";
import { IUsersService } from "./users.service.interface";
import { ResultPage } from "src/dto/resultPage.dto";

@Injectable()
export class UsersService implements IUsersService {
    constructor(
        private usersRepository: UsersRepository,
        private skillsService: SkillsService,
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

        const userDto: UserDto = {
            id: findUser.id,
            email: findUser.email,
            name: findUser.name,
            surname: findUser.surname,
        };

        return userDto;
    }

    async searchUsers(userData: string, skillId: string, level: string): Promise<UserDto[]> {
        const users = await this.usersRepository.searchUsers(userData, skillId, level);

        const usersDto: UserDto[] = [];

        users.map(u => {
            usersDto.push({
                id: u.id,
                email: u.email,
                name: u.name,
                surname: u.surname,
            });
        });
        
        return usersDto;
    }

    async getAll(page: number = 0, size: number = 3): Promise<ResultPage<UserDto>> {
        const users = await this.usersRepository.getAll(page, size);
        const totalRows = await this.usersRepository.countAll();
        const usersDto: UserDto[] = [];

        users.map(u => {
            usersDto.push({
                id: u.id,
                email: u.email,
                name: u.name,
                surname: u.surname,
            });
        })

        const result: ResultPage<UserDto> = {
            data: usersDto,
            page: page,
            size: size,
            total: totalRows
        }

        return result;
    }

    async getUserWithSkills(id: number): Promise<UserDto | null> {
        const user: User | null = await this.usersRepository.getUserWithSkills(id);
        const skills: SkillDto[] = await this.skillsService.getAll();

        const userSkills: LevelUserSkillDto[] = [];
        user.skills.map(skill => {
            const foundSkill = skills.find(s => s.id === skill.skillId);
            if (foundSkill) {
                userSkills.push({
                    id: foundSkill.id,
                    active: foundSkill.active,
                    description: foundSkill.description,
                    url: foundSkill.url,
                    level: skill.level,
                    learningDate: skill.learningDate
                });
            }
        })

        const userDto: UserDto = {
            id: user.id,
            email: user.email,
            name: user.name,
            surname: user.surname,
            skills: userSkills
        };

        return userDto;
    }

    async getById(id: number): Promise<UserDto> {
        const user = await this.usersRepository.getById(id);
        const userDto: UserDto = {
            id: user.id,
            email: user.email,
            name: user.name,
            surname: user.surname
        };
        return userDto;
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

        const created = await this.usersRepository.create(newUser);

        const userDto: UserDto = {
            id: created.id,
            email: created.email,
            name: created.name,
            surname: created.surname
        }

        return userDto;
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

    async addSkill(userSkill: userSkillsDto): Promise<boolean> {
        const user: User = await this.usersRepository.getUserWithSkills(userSkill.userId);

        if (!user) {
            throw new Error('User not found');
        }

        let skillExist = user.skills.find(skill => skill.skillId === userSkill.skillId);
        if (skillExist) {
            if (skillExist.level === userSkill.skillLevel) {
                throw new Error("Skill with this level already exist");
            }
            else {
                const updatedSkill: UserSkill = {
                    skillId: userSkill.skillId,
                    level: userSkill.skillLevel,
                    learningDate: userSkill.learningDate ?? new Date(),
                }

                return await this.usersRepository.updateUserSkill(userSkill.userId, updatedSkill);
            }
        }
        else {
            const newUserSkill: UserSkill = {
                skillId: userSkill.skillId,
                level: userSkill.skillLevel,
                learningDate: userSkill.learningDate ?? new Date()
            };

            return await this.usersRepository.addUserSkill(userSkill.userId, newUserSkill);
        }



    }

    async deleteSkill(userId: number, skillId: number): Promise<boolean> {
        const userSkill: UserSkill = await this.usersRepository.getUserSkill(userId, skillId);

        if (!userSkill) {
            throw new Error('The user does not have this skill')
        }
        const deleted = await this.usersRepository.DeleteUserSkill(userId, skillId);

        return deleted;
    }
}
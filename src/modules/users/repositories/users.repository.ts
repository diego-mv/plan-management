import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../schemas/user.entity";
import { UserSkill } from "../schemas/userSkill.entity";
import { IUsersRepository } from "./users.repository.interface";

@Injectable()
export class UsersRepository implements IUsersRepository {

    constructor(@InjectModel('Users') private userModel: Model<User>) { }

    async getByEmail(email: string): Promise<User> {
        try {
            return await this.userModel.findOne({ email: email });
        }
        catch (error) {
            console.error('Error on find user by email: ' + email, error.message);
            throw new Error('Error on find user by email: ' + email);
        }
    }

    async getUserWithSkills(userId: number): Promise<User> {
        try {
            const user = await this.userModel.findOne({ id: userId })

            return user;
        }
        catch (error) {
            console.error('Error on find user with skills: ' + userId, error.message);
            throw new Error('Error on find user  with skills: ' + userId);
        }
    }

    async countAll(): Promise<number> {
        try {
            return await this.userModel.countDocuments();
        }
        catch (error) {
            console.error('Error on count users', error.message);
            throw new Error('Error on count users');
        }
    }

    async getAll(page?: number, size?: number): Promise<User[]> {
        try {
            let users: User[] = [];

            if (page && size) {
                users = await this.userModel.find()
                    .skip(page * size)
                    .limit(size);;
            } else {
                users = await this.userModel.find();
            }

            return users;
        }
        catch (error) {
            console.error('Error on get all users ', error.message);
            throw new Error('Error on get all users ' + error.message);
        }
    }

    async getById(id: number): Promise<User | null> {
        try {
            const user: User = await this.userModel.findOne({ id: id });

            return user;
        }
        catch (error) {
            console.error('Error on get user by id: ' + id, error.message);
            throw new Error('Error on get user by id: ' + id + error.message);
        }
    }

    async create(user: User): Promise<User> {
        try {
            const lastUser = await this.userModel.findOne({}, { id: 1 }).sort({ id: -1 });
            const newId = (lastUser?.id || 0) + 1;
            user.id = newId;

            const newUser: User = await this.userModel.create(user);

            return newUser;
        } catch (error) {
            console.error('Error creating user ' + JSON.stringify(user), error.message);
            throw new Error('Error creating user ' + JSON.stringify(user));
        }

    }

    async update(id: number, user: User): Promise<User> {
        try {
            const currentUser = await this.userModel.findOne({ id: id });

            if (!currentUser) {
                throw new NotFoundException('User not found');
            }

            delete user.password;
            const updatedUser = await this.userModel.findOneAndUpdate({ id: id }, user, { new: true });

            if (!updatedUser) {
                throw new NotFoundException(`User with id ${id} not found`);
            }
            return updatedUser;
        } catch (error) {
            console.error('error updating user by id ' + id, error.message);
            throw new Error('error updating user by id ' + id);
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const deletedUser = await this.userModel.findOneAndDelete({ id: id });

            if (!deletedUser) {
                throw new NotFoundException(`not found user ${id}`);
            }

            return true;
        } catch (error) {
            console.error('error on delete user by id ' + id, error.message);
            throw new Error('error on delete user by id ' + id);
        }
    }

    async addUserSkill(userId: number, newUserSkill: UserSkill): Promise<boolean> {
        try {

            const updatedUser = await this.userModel.findOneAndUpdate(
                {
                    id: userId
                },
                {
                    $push: { skills: newUserSkill }
                },
                {
                    new: true
                }
            )
            return updatedUser !== null;

        } catch (error) {
            console.error('error on add user skill', error.message);
            throw new Error('error on add user skill');
        }
    }

    async updateUserSkill(userId: number, updatedUserSkill: UserSkill): Promise<boolean> {
        try {
            const updatedUser = await this.userModel.findOneAndUpdate(
                { id: userId, 'skills.skillId': updatedUserSkill.skillId },
                {
                    $set: {
                        'skills.$.level': updatedUserSkill.level,
                        'skills.$.learningDate': updatedUserSkill.learningDate
                    }
                },
                { new: true }
            );

            return updatedUser !== null;
        } catch (error) {
            console.error('Error al actualizar habilidad del usuario:', error.message);
            throw new Error('Error al actualizar habilidad del usuario');
        }
    }

    async getUserSkill(userId: number, skillId: number): Promise<UserSkill | null> {
        try {
            const user = await this.userModel.findOne(
                { id: userId }
            )

            return user?.skills.find(s => s.skillId === skillId) ?? null;
        } catch (error) {
            console.error('Error on get userSkill', error.message);
            throw new Error('Error on get userSkill');
        }
    }

    async DeleteUserSkill(userId: number, skillId: number): Promise<boolean> {
        try {
            const updatedUser = await this.userModel.findOneAndUpdate(
                { id: userId },
                {
                    $pull: {
                        skills: { skillId: skillId }
                    }
                },
                { new: true }
            );

            return updatedUser !== null;
        }
        catch (error) {
            console.error('Error on delete user skill:', error.message);
            throw new Error('Error on delete user skill');
        }

    }
}
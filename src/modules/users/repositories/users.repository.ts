import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../dto/user.entity";
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

    async getAll(): Promise<User[]> {
        try {
            const users: User[] = await this.userModel.find();

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
}
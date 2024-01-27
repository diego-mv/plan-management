import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../dto/user.entity";
import { IUsersRepository } from "./users.repository.interface";

@Injectable()
export class UsersRepository implements IUsersRepository {

    constructor(@InjectModel('Users') private userModel: Model<User>) { }

    getAll(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    getById(id: number): Promise<User> {
        throw new Error("Method not implemented.");
    }
    create(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    update(id: number, user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
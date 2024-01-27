import { User } from "../dto/user.entity";

export interface IUsersRepository {
    getAll(): Promise<User[]>;
    getByEmail(email: string): Promise<User | null>;
    getById(id: number): Promise<User | null>;
    create(user: User): Promise<User>
    update(id: number, user: User): Promise<User | null>
    delete(id: number): Promise<boolean>;
}
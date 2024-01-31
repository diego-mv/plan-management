import { User } from "../schemas/user.entity";
import { UserSkill } from "../schemas/userSkill.entity";

export interface IUsersRepository {
    getUserWithSkills(userId: number): Promise<User>;
    getAll(page?: number, size?: number): Promise<User[]>;
    getByEmail(email: string): Promise<User | null>;
    getById(id: number): Promise<User | null>;
    create(user: User): Promise<User>
    update(id: number, user: User): Promise<User | null>
    delete(id: number): Promise<boolean>;
    addUserSkill(userId: number, newUserSkill: UserSkill): Promise<boolean>;
    updateUserSkill(userId: number, updatedUserSkill: UserSkill): Promise<boolean>;
}
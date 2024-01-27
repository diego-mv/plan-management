import { Skill } from "../dto/skill.entity";

export interface ISkillsRepository {
    getAll(): Promise<Skill[]>;
    getById(id: number): Promise<Skill | null>;
    create(skill: Skill): Promise<Skill>
    update(id: number, skill: Skill): Promise<Skill | null>
    delete(id: number): Promise<boolean>;
}
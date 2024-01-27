import { SkillDto } from "../dto/skilldto.dto";

export interface ISkillsService {
    getAll(): Promise<SkillDto[]>;
    getById(id: number): Promise<SkillDto | null>;
    create(skill: SkillDto): Promise<SkillDto>
    update(id: number, skill: SkillDto): Promise<SkillDto | null>
    delete(id: number): Promise<boolean>;
}
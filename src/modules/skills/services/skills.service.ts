import { Injectable } from '@nestjs/common';
import { ISkillsService } from './skills.service.interface';
import { Skill } from '../schemas/skill.entity';
import { SkillsRepository } from '../repositories/skills.repository';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { SkillDto } from '../dto/skill.dto';
import { createSkillDto } from '../dto/createSkill.dto';

@Injectable()
export class SkillsService implements ISkillsService {

    constructor(
        private skillsRepository: SkillsRepository,
        @InjectMapper() private readonly autoMapper: Mapper
    ) { }

    async getAll(): Promise<SkillDto[]> {
        return await this.skillsRepository.getAll();
    }

    async getById(id: number): Promise<SkillDto> {
        const skill = await this.skillsRepository.getById(id);
        const skillsDto: SkillDto = {
            id: skill.id,
            active: skill.active,
            description: skill.description,
            url: skill.url
        }

        return skillsDto;
    }

    async create(newSkill: createSkillDto): Promise<SkillDto> {
        const skill: Skill = {
            id: null,
            active: true,
            description: newSkill.description,
            url: newSkill.url
        };

        const exist = await this.skillsRepository.getByDescription(newSkill.description);

        if (exist) {
            throw new Error("Ya existe una habilidad con este nombre")
        }

        return await this.skillsRepository.create(skill);

    }

    async update(id: number, skill: SkillDto): Promise<SkillDto> {
        const skillEntity: Skill = {
            id: skill.id,
            active: skill.active,
            description: skill.description,
            url: skill.url
        };
        const skillUpdated = await this.skillsRepository.update(id, skillEntity);

        const skillDto = this.autoMapper.map(skillUpdated, Skill, SkillDto);
        return skillDto;
    }

    async delete(id: number): Promise<boolean> {
        return await this.skillsRepository.delete(id);
    }


}

import { Injectable, NotFoundException } from "@nestjs/common";
import { ISkillsRepository } from "./skills.repository.interface";
import { Skill } from "../schemas/skill.entity";
import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class SkillsRepository implements ISkillsRepository {

    constructor(@InjectModel('Skill') private skillModel: Model<Skill>) { }


    async getAll(): Promise<Skill[]> {
        try {
            const skills: Skill[] = await this.skillModel.find();
            return skills;
        } catch (error) {
            console.error('Error on get all skills:', error.message);
            throw new Error('Error on get all skills');
        }
    }

    async getById(id: number): Promise<Skill | null> {
        try {
            const skill: Skill | null = await this.skillModel.findOne({id: id});
            
            if (!skill) {
                console.error('error on getById: skill with id ' + id + ' not found');
            }

            return skill;
        } catch (error) {
            console.error('Error on get skill by id ´' + id + '´:', error.message);
            throw new Error('Error on get skill by id ´' + id + '´:');
        }

    }

    async create(skill: Skill): Promise<Skill> {
        try {
            const lastSkill = await this.skillModel.findOne({}, { id: 1 }).sort({ id: -1 });
            const newId = (lastSkill?.id || 0) + 1;
            skill.id = newId;

            const newSkill: Skill = await this.skillModel.create(skill);

            return newSkill;
        } catch (error) {
            console.error('Error creating skill ' + JSON.stringify(skill), error.message);
            throw new Error('Error creating skill ' + JSON.stringify(skill));
        }
    }

    async update(id: number, skill: Skill): Promise<Skill | null> {
        try {
            const updatedSkill = await this.skillModel.findByIdAndUpdate(id, skill, { new: true });

            if (!updatedSkill) {
                throw new NotFoundException(`Skill with ID ${id} not found`);
            }

            return updatedSkill;
        } catch (error) {
            console.error('error updating skill by id ' + id, error.message);
            throw new Error('error updating skill by id ' + id);
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const deletedSkill = await this.skillModel.findOneAndDelete({id: id});

            if (!deletedSkill) {
                throw new NotFoundException(`not found skill ${id}`);
            }

            return true;
        } catch (error) {
            console.error('error on delete skill by id ' + id, error.message);
            throw new Error('error on delete skill by id ' + id);
        }
    }
}
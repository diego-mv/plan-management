import { Mapper, MappingProfile, createMap } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { createSkillDto } from "src/modules/skills/dto/createSkillDto.dto";
import { Skill } from "src/modules/skills/dto/skill.entity";
import { SkillDto } from "src/modules/skills/dto/skilldto.dto";

@Injectable()
export class AutoMapperCustomProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile(): MappingProfile {
        return (mapper) => {
            createMap(mapper, Skill, SkillDto);
            createMap(mapper, createSkillDto, Skill);
            createMap(mapper, Skill, createSkillDto);
        };
    }
}
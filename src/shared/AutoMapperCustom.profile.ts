import { Mapper, MappingProfile, createMap } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { createSkillDto } from "src/modules/skills/dto/createSkill.dto";
import { Skill } from "src/modules/skills/schemas/skill.entity";
import { SkillDto } from "src/modules/skills/dto/skill.dto";
import { User } from "src/modules/users/schemas/user.entity";
import { UserDto } from "src/modules/users/dto/user.dto";

@Injectable()
export class AutoMapperCustomProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile(): MappingProfile {
        return (mapper) => {
            //Skill
            createMap(mapper, Skill, SkillDto);
            createMap(mapper, createSkillDto, Skill);

            //User
            createMap(mapper, User, UserDto);
            createMap(mapper, UserDto, User);
            createMap(mapper, User, createSkillDto);
            createMap(mapper, createSkillDto, User);
            createMap(mapper, UserDto, createSkillDto);
            createMap(mapper, createSkillDto, UserDto);
        };
    }
}
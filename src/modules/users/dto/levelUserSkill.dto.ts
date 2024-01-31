import { ApiProperty } from "@nestjs/swagger";
import { SkillDto } from "src/modules/skills/dto/skill.dto";

export class LevelUserSkillDto extends SkillDto {
    @ApiProperty()
    public level: number;
    @ApiProperty()
    public learningDate: Date;

    constructor() {
        super()
    }
}
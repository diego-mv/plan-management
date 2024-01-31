import { ApiProperty } from "@nestjs/swagger";
import { LevelUserSkillDto } from "./levelUserSkill.dto";

export class UserDto {
    @ApiProperty()
    public id: number;
    @ApiProperty()
    public name: string;
    @ApiProperty()
    public surname: string;
    @ApiProperty()
    public email: string;
    @ApiProperty()
    public skills?: LevelUserSkillDto[]
}
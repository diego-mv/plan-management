import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

class SkillLevel {
    @AutoMap()
    @ApiProperty()
    skillId: number;
    @AutoMap()
    @ApiProperty()
    level: number;
}

export class userSkillsDto {
    @AutoMap()
    @ApiProperty()
    public userId: string;
    @ApiProperty({ type: [SkillLevel] , description: 'Lista de habilidades con niveles' })
    public skills: SkillLevel[]
}


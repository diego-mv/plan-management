import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class userSkillsDto {
    @AutoMap()
    @ApiProperty()
    public userId: number;
    @ApiProperty()
    public skillId: number;
    @ApiProperty()
    public skillLevel: number;
    @ApiProperty()
    public learningDate: Date
}


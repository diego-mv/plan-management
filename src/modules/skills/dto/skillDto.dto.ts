import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class SkillDto {
    @AutoMap()
    @ApiProperty()
    id: number;
    @AutoMap()
    @ApiProperty()
    description: string;
    @AutoMap()
    @ApiProperty()
    active: boolean;
}
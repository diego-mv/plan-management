import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class createSkillDto {
    @AutoMap()
    @ApiProperty()
    description: string;
    @AutoMap()
    @ApiProperty()
    url: string;
}
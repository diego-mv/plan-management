import { AutoMap } from "@automapper/classes";

export class SkillDto {
    @AutoMap()
    id: number;
    @AutoMap()
    description: string;
    @AutoMap()
    active: boolean;
}
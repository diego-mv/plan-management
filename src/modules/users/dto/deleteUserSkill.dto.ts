import { ApiProperty } from "@nestjs/swagger";

export class DeleteUserSkill {

    @ApiProperty()
    public userId: number;
    @ApiProperty()
    public skillId: number;
}
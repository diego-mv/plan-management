import { ApiProperty } from "@nestjs/swagger";

export class SearchUser {
    @ApiProperty()
    public userDate: string;
    @ApiProperty()
    public skillId: number;
    @ApiProperty()
    public level: number;
}
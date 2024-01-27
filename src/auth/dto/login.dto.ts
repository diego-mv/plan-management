import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty()
    public user: string;
    @ApiProperty()
    public password: string;
}
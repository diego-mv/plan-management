import { ApiProperty } from "@nestjs/swagger";

export class createUserDto{
    @ApiProperty()
    public name: string;    
    @ApiProperty()
    public surname: string;    
    @ApiProperty()
    public email: string;    
    @ApiProperty()
    public password: string;
}
import { ApiParam, ApiProperty } from "@nestjs/swagger";

export class updateUserDto{
    @ApiProperty()
    public id: number;
    @ApiProperty()
    public name: string;    
    @ApiProperty()
    public surname: string;    
    @ApiProperty()
    public email: string; 
}
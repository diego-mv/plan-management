import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    @ApiProperty()
    public id: number;
    @ApiProperty()
    public name: string;    
    @ApiProperty()
    public surname: string; 
    @ApiProperty()   
    public email: string;    
}
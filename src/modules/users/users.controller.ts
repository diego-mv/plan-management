import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createUserDto } from './dto/createUserDto.dto';
import { UsersService } from './services/users.service';
import { UserDto } from './dto/userDto.dto';
import { User } from './dto/user.entity';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('users')
@ApiTags('Users')
export class UsersController {

  constructor(private usersService: UsersService) { }
  
  @Get('getAll')
  @ApiResponse({ status: 200, description: 'OK', isArray: true })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getAll(): Promise<UserDto[]> {
    return await this.usersService.getAll();
  }

  @Get('getById')
  @ApiResponse({ status: 200, description: 'OK', isArray: true })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getById(@Param('id') id: number): Promise<UserDto> {
    return await this.usersService.getById(id);
  }

  @Post('create')
  @ApiResponse({ status: 200, description: 'OK', isArray: true })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBody({
    type: createUserDto, description: 'new User', required: true,
    examples: {
      example: {
        description: 'createUserDto',
        value: {

        }
      }
    }
  })
  async create(@Body() user: createUserDto): Promise<UserDto> {
    return await this.usersService.create(user);
  }

  @Delete('deleteById/:id')
  @ApiResponse({ status: 200, description: 'OK', isArray: true })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiParam({ name: 'id', allowEmptyValue: false, description: 'User Id', required: true, type: 'number' })
  async deleteById(@Param('id') id: number): Promise<boolean> {
    return await this.usersService.delete(id);
  }
}

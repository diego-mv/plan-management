import { Body, Controller, Delete, Get, HttpCode, Param, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { updateUserDto } from './dto/updateUser.dto';
import { UserDto } from './dto/user.dto';
import { userSkillsDto } from './dto/userSkills.dto';
import { UsersService } from './services/users.service';
import { createSkillDto } from '../skills/dto/createSkill.dto';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
export class UsersController {

  constructor(private usersService: UsersService) { }

  @Get('getAll')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'OK', isArray: true })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getAll(): Promise<UserDto[]> {
    return await this.usersService.getAll();
  }

  @Get('getById')
  @ApiOperation({ summary: 'Get an user by Id' })
  @ApiResponse({ status: 200, description: 'OK', isArray: true })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getById(@Param('id') id: number): Promise<UserDto> {
    return await this.usersService.getById(id);
  }

  @Put('update')
  @ApiOperation({ summary: 'Update a user by userId and new data' })
  @ApiResponse({ status: 200, description: 'OK', isArray: true })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async update(@Body() user: updateUserDto): Promise<UserDto> {
    return await this.usersService.update(user.id, user);
  }

  @Delete('deleteById/:id')
  @ApiOperation({ summary: 'Delete a user by userId' })
  @ApiResponse({ status: 200, description: 'OK', isArray: true })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiParam({ name: 'id', allowEmptyValue: false, description: 'User Id', required: true, type: 'number' })
  async deleteById(@Param('id') id: number): Promise<boolean> {
    return await this.usersService.delete(id);
  }

  @Put('updateSkillsOfUser')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update list of skills of user' })
  @ApiBody({
    type: userSkillsDto, required: true
  })
  @ApiResponse({ status: 200, description: 'OK', isArray: true })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async updateSkillsOfUser(@Body() userSkills: userSkillsDto) {
    await this.usersService.updateSkills(userSkills);
    return 'OK';
  }
}

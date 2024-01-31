import { Body, Controller, Delete, Get, HttpCode, Param, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResultPage } from 'src/dto/resultPage.dto';
import { DeleteUserSkill } from './dto/deleteUserSkill.dto';
import { updateUserDto } from './dto/updateUser.dto';
import { UserDto } from './dto/user.dto';
import { userSkillsDto } from './dto/userSkills.dto';
import { UsersService } from './services/users.service';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
export class UsersController {

  constructor(private usersService: UsersService) { }

  @Get('getAll')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'OK', isArray: true })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getAll(@Query('page') page: number = 0, @Query('size') size: number = 3): Promise<ResultPage<UserDto>> {
    return await this.usersService.getAll(page, size);
  }

  @Get('getById/:id')
  @ApiOperation({ summary: 'Get an user by Id' })
  @ApiResponse({ status: 200, description: 'OK', isArray: true })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiParam({ name: 'id', allowEmptyValue: false, description: 'User Id', required: true, type: 'number' })
  async getById(@Param('id') id: number): Promise<UserDto> {
    return await this.usersService.getById(id);
  }

  @Get('getUserWithSkills/:id')
  @ApiOperation({ summary: 'Get an user with skills by userId' })
  @ApiResponse({ status: 200, description: 'OK', isArray: true })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiParam({ name: 'id', allowEmptyValue: false, description: 'User Id', required: true, type: 'number' })
  async getUserWithSkills(@Param('id') id: number): Promise<UserDto | null> {
    return await this.usersService.getUserWithSkills(id);
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

  @Put('addSkillUser')
  @HttpCode(200)
  @ApiOperation({ summary: 'Add item to list of skills user' })
  @ApiBody({
    type: userSkillsDto, required: true
  })
  @ApiResponse({ status: 200, description: 'OK', isArray: true })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async addSkillUser(@Body() userSkills: userSkillsDto) {
    await this.usersService.addSkill(userSkills);
    return 'OK';
  }


  @Put('deleteUserSkill')
  @ApiOperation({ summary: 'Delete a user skill' })
  @ApiResponse({ status: 200, description: 'OK', isArray: true })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async deleteUserSkill(@Body() userSkill: DeleteUserSkill): Promise<boolean> {
    return await this.usersService.deleteSkill(userSkill.userId, userSkill.skillId);
  }
}

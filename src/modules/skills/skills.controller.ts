import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { createSkillDto } from "./dto/createSkill.dto";
import { Skill } from "./schemas/skill.entity";
import { SkillsService } from "./services/skills.service";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { errorController } from "src/shared/ErrorController.utility";

@Controller('skills')
@ApiTags('Skills')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class SkillsController {

  constructor(private skillsService: SkillsService) { }

  @Get('getAll')
  @ApiOperation({ summary: 'Get all active skills' })
  @ApiResponse({ status: 200, description: 'OK', isArray: true })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getAll(): Promise<Skill[]> {
    return await this.skillsService.getAll();
  }

  @Get('getById/:id')
  @ApiOperation({ summary: 'Get a skill by Id' })
  @ApiResponse({ status: 200, description: 'OK', isArray: true })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiParam({ name: 'id', allowEmptyValue: false, description: 'Skill Id', required: true, type: 'number' })
  async getById(@Param('id') id: number): Promise<Skill> {
    return await this.skillsService.getById(id);
  }

  @Post('create')
  @ApiOperation({ summary: 'Create an skill' })
  @ApiResponse({ status: 200, description: 'OK', isArray: true })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBody({
    type: createSkillDto, description: 'Skill Id', required: true,
    examples: {
      example: {
        description: 'createSkillDto',
        value: {
          description: '',
        }
      }
    }
  })
  async create(@Body() skill: createSkillDto): Promise<Skill> {
    try {
      return await this.skillsService.create(skill);
    }
    catch (error) {
      errorController(error);
    }
  }

  @Delete('deleteById/:id')
  @ApiOperation({ summary: 'Delete a skill by skillId' })
  @ApiResponse({ status: 200, description: 'OK', isArray: true })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiParam({ name: 'id', allowEmptyValue: false, description: 'Skill Id', required: true, type: 'number' })
  async deleteById(@Param('id') id: number): Promise<boolean> {
    return await this.skillsService.delete(id);
  }
}
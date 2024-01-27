import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { createSkillDto } from "./dto/createSkillDto.dto";
import { Skill } from "./dto/skill.entity";
import { SkillsService } from "./services/skills.service";
import { AuthGuard } from "src/auth/guards/auth.guard";

@Controller('skills')
@ApiTags('Skills')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class SkillsController {

  constructor(private skillsService: SkillsService) { }

  @Get('getAll')
  @ApiResponse({ status: 200, description: 'OK', isArray: true })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getAll(): Promise<Skill[]> {
    return await this.skillsService.getAll();
  }

  @Get('getById/:id')
  @ApiResponse({ status: 200, description: 'OK', isArray: true })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiParam({ name: 'id', allowEmptyValue: false, description: 'Skill Id', required: true, type: 'number' })
  async getById(@Param('id') id: number): Promise<Skill> {
    return await this.skillsService.getById(id);
  }

  @Post('create')
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
    return await this.skillsService.create(skill);
  }

  @Delete('deleteById/:id')
  @ApiResponse({ status: 200, description: 'OK', isArray: true })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiParam({ name: 'id', allowEmptyValue: false, description: 'Skill Id', required: true, type: 'number' })
  async deleteById(@Param('id') id: number): Promise<boolean> {
    return await this.skillsService.delete(id);
  }
}
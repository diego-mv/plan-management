import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AutoMapperCustomProfile } from 'src/shared/AutoMapperCustom.profile';
import { SkillsRepository } from './repositories/skills.repository';
import { SkillSchema } from './schemas/skill.schema';
import { SkillsService } from './services/skills.service';
import { SkillsController } from './skills.controller';
@Module({
    imports: [MongooseModule.forFeature([{ name: 'Skill', schema: SkillSchema }])],
    controllers: [SkillsController],
    providers: [SkillsRepository, SkillsService, AutoMapperCustomProfile],
    exports: [SkillsService]
})
export class SkillsModule { }

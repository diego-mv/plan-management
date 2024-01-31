import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SkillsModule } from '../skills/skills.module';
import { UsersRepository } from './repositories/users.repository';
import { UserSchema } from './schemas/user.schema';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }]), SkillsModule],
  providers: [UsersService, UsersRepository,],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule { }

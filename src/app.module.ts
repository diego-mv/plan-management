import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { SkillsModule } from './modules/skills/skills.module';
import { UsersModule } from './modules/users/users.module';


@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.BD_URI,
        dbName: process.env.BD_NAME,
        user: process.env.BD_USER,
        pass: process.env.BD_PASS,

      }),
      inject: []
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    SkillsModule, UsersModule, AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { 
  
}


import { Schema } from 'mongoose';
import { SkillSchema } from 'src/modules/skills/schemas/skill.schema';

export const UserSchema = new Schema({
  id: { type: Number, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  password: { type: String, required: true },
  skills: [
    {
      skillId: { type: Number, ref: 'Skill' },
      level: { type: Number, default: 1 },
      learningDate: { type: Date, default: new Date() }
    },
  ],
});

SkillSchema.set('autoIndex', true);

// Configura un índice único en el campo id
SkillSchema.index({ id: 1 }, { unique: true });

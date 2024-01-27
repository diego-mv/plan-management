import { Schema } from 'mongoose';
import { SkillSchema } from 'src/modules/skills/schemas/skill.schema';

export const UserSchema = new Schema({
  name: { type: String, required: true },
  skills: [
    {
      skillId: { type: Number, ref: 'Skill' },
      level: { type: Number, default: 1 },
    },
  ],
});

SkillSchema.set('autoIndex', true);

// Configura un índice único en el campo id
SkillSchema.index({ id: 1 }, { unique: true });

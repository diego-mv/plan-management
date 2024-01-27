import { Schema } from 'mongoose'


export const SkillSchema = new Schema({
    id: { type: Number, unique: true },
    description: { type: String, required: true },
    active: { type: Boolean, required: true, default: true },
});

SkillSchema.set('autoIndex', true);

SkillSchema.index({ id: 1 }, { unique: true });

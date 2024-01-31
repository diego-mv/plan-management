import { UserSkill } from "./userSkill.entity";

export class User {
    constructor(
        public id: number,
        public email: string,
        public name: string,
        public surname: string,
        public password: string,
        public skills?: UserSkill[] 
    ) { }
}
import { AutoMap } from "@automapper/classes";

export class Skill {
    constructor(
        public id: number,
        public description: string,
        public active: boolean,
        public url: string) { }
}